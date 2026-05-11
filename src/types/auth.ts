export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  role: 'student' | 'lecturer' | 'admin';
  createdAt: number;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}
