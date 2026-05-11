import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  type User as FirebaseUser
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { UserProfile } from '../types/auth';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<UserProfile>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginWithGoogle: async () => { throw new Error('AuthProvider not mounted'); },
  logout: async () => {},
});

const googleProvider = new GoogleAuthProvider();

const toUserProfile = async (firebaseUser: FirebaseUser): Promise<UserProfile> => {
  const ref = doc(db, 'users', firebaseUser.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return { uid: firebaseUser.uid, ...snap.data() } as UserProfile;
  }

  // First-time login — create Firestore doc
  const profile: UserProfile = {
    uid: firebaseUser.uid,
    email: firebaseUser.email ?? '',
    displayName: firebaseUser.displayName ?? 'Student',
    role: 'student',
    createdAt: Date.now(),
  };
  await setDoc(ref, profile);
  return profile;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const profile = await toUserProfile(firebaseUser);
          setUser(profile);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth state error:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<UserProfile> => {
    const result = await signInWithPopup(auth, googleProvider);
    const profile = await toUserProfile(result.user);
    setUser(profile);
    return profile;
  };

  const logout = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
