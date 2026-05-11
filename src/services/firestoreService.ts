import {
  collection, doc, getDocs, getDoc, setDoc,
  updateDoc, deleteDoc, query, orderBy,
  writeBatch, getCountFromServer,
} from 'firebase/firestore';
import { db } from './firebase';
import type { SlideContent, Category } from '../types/learning';
import type { QuizQuestion } from '../types/quiz';
import type { UserProfile } from '../types/auth';
import type { UserProgress } from '../types/progress';

// ─── SLIDES ──────────────────────────────────────────────────────────────────

export const getSlides = async (): Promise<SlideContent[]> => {
  const snap = await getDocs(query(collection(db, 'slides'), orderBy('categoryId')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as SlideContent));
};

export const saveSlide = async (slide: SlideContent): Promise<void> => {
  await setDoc(doc(db, 'slides', slide.id), slide);
};

export const updateSlide = async (id: string, data: Partial<SlideContent>): Promise<void> => {
  await updateDoc(doc(db, 'slides', id), data as Record<string, unknown>);
};

export const deleteSlide = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'slides', id));
};

// ─── QUESTIONS ───────────────────────────────────────────────────────────────

export const getQuestions = async (): Promise<QuizQuestion[]> => {
  const snap = await getDocs(query(collection(db, 'questions'), orderBy('categoryId')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as QuizQuestion));
};

export const saveQuestion = async (question: QuizQuestion): Promise<void> => {
  await setDoc(doc(db, 'questions', question.id), question);
};

export const updateQuestion = async (id: string, data: Partial<QuizQuestion>): Promise<void> => {
  await updateDoc(doc(db, 'questions', id), data as Record<string, unknown>);
};

export const deleteQuestion = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'questions', id));
};

// ─── CATEGORIES ──────────────────────────────────────────────────────────────

export const getCategories = async (): Promise<Category[]> => {
  const snap = await getDocs(collection(db, 'categories'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Category));
};

export const saveCategory = async (cat: Category): Promise<void> => {
  await setDoc(doc(db, 'categories', cat.id), cat);
};

// ─── USERS ───────────────────────────────────────────────────────────────────

export const getAllUsers = async (): Promise<UserProfile[]> => {
  const snap = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc')));
  return snap.docs.map(d => d.data() as UserProfile);
};

export const getUserProgress = async (uid: string): Promise<UserProgress | null> => {
  const snap = await getDoc(doc(db, 'users', uid, 'progress', 'data'));
  return snap.exists() ? (snap.data() as UserProgress) : null;
};

export const getUserCount = async (): Promise<number> => {
  const snap = await getCountFromServer(collection(db, 'users'));
  return snap.data().count;
};

export const setUserRole = async (uid: string, role: 'student' | 'admin'): Promise<void> => {
  await updateDoc(doc(db, 'users', uid), { role });
};

// ─── PROGRESS ────────────────────────────────────────────────────────────────

export const loadProgressFromFirestore = async (uid: string): Promise<UserProgress | null> => {
  const snap = await getDoc(doc(db, 'users', uid, 'progress', 'data'));
  return snap.exists() ? (snap.data() as UserProgress) : null;
};

export const saveProgressToFirestore = async (progress: UserProgress): Promise<void> => {
  await setDoc(doc(db, 'users', progress.userId, 'progress', 'data'), progress);
};

// ─── SEED ─────────────────────────────────────────────────────────────────────

export const seedCollection = async <T extends { id: string }>(
  collectionName: string,
  items: T[]
): Promise<void> => {
  const batch = writeBatch(db);
  items.forEach(item => {
    batch.set(doc(db, collectionName, item.id), item);
  });
  await batch.commit();
};
