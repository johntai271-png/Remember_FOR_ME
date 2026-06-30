import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import {
  getDatabase,
  get,
  onValue,
  ref,
  runTransaction,
  set,
  update,
  type DatabaseReference,
} from "firebase/database";

import type { CaregiverProfile } from "./types";

export const firebaseConfig = {
  apiKey: "AIzaSyDXOR8sYBdXYWcb1nFktWJ-mxgc9-NDbPk",
  authDomain: "rememberforme-fc18b.firebaseapp.com",
  databaseURL: "https://rememberforme-fc18b-default-rtdb.firebaseio.com",
  projectId: "rememberforme-fc18b",
  storageBucket: "rememberforme-fc18b.firebasestorage.app",
  messagingSenderId: "453928856195",
  appId: "1:453928856195:web:b074f1099dea94dc30c9b6",
};

export const demoFamilyId = "family_001";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export function buildFamilyPath(familyId: string) {
  return `families/${familyId}`;
}

export function familyRef(familyId: string, childPath = ""): DatabaseReference {
  const root = buildFamilyPath(familyId);
  return ref(database, childPath ? `${root}/${childPath}` : root);
}

export function subscribeToFamilyPath(
  familyId: string,
  childPath: string,
  callback: (snapshot: any) => void,
) {
  return onValue(familyRef(familyId, childPath), callback);
}

export function updateFamilyPath(
  familyId: string,
  childPath: string,
  payload: Record<string, any>,
) {
  return update(familyRef(familyId, childPath), payload);
}

export async function transactFamilyTask(
  familyId: string,
  taskId: string,
  mutateTask: (currentTask: any) => any,
) {
  const taskReference = familyRef(familyId, `tasks/${taskId}`);
  const result = await runTransaction(taskReference, (currentTask) => {
    const nextTask = mutateTask(currentTask);
    return nextTask === undefined ? currentTask : nextTask;
  });

  return {
    committed: result.committed,
    snapshot: result.snapshot,
  };
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function signInCaregiver(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpCaregiver(
  email: string,
  password: string,
  displayName: string,
  familyId = demoFamilyId,
) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  if (displayName.trim()) {
    await updateProfile(credential.user, {
      displayName: displayName.trim(),
    });
  }

  const userProfileRef = ref(database, `users/${credential.user.uid}`);
  const snapshot = await get(userProfileRef);

  if (!snapshot.exists()) {
    await set(userProfileRef, {
      name: displayName.trim() || credential.user.email?.split("@")[0] || "Caregiver",
      email: credential.user.email,
      role: "Family caregiver",
      familyId,
      linkedFamilyMembers: ["Hy Nguyen", "Minh Nguyen", "Lan Tran"],
      preferences: {
        language: "English",
        appearance: "Light",
        timeFormat: "24-hour",
        notifications: {
          medicationReminders: true,
          routineReminders: true,
          trackerAlerts: true,
          emergencyAlerts: true,
          weeklySummary: false,
        },
      },
      createdAt: Date.now(),
    } satisfies CaregiverProfile);
  }

  return credential;
}

export async function signOutCaregiver() {
  return signOut(auth);
}

export async function getUserProfile(uid: string) {
  const snapshot = await get(ref(database, `users/${uid}`));
  return snapshot.exists() ? (snapshot.val() as CaregiverProfile) : null;
}

export function subscribeToUserProfile(
  uid: string,
  callback: (profile: CaregiverProfile | null) => void,
) {
  return onValue(ref(database, `users/${uid}`), (snapshot) => {
    callback(snapshot.exists() ? (snapshot.val() as CaregiverProfile) : null);
  });
}

export async function updateUserProfile(uid: string, payload: Record<string, any>) {
  return update(ref(database, `users/${uid}`), payload);
}
