import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  update,
  runTransaction,
  type DatabaseReference,
} from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyDXOR8sYBdXYWcb1nFktWJ-mxgc9-NDbPk",
  authDomain: "rememberforme-fc18b.firebaseapp.com",
  databaseURL: "https://rememberforme-fc18b-default-rtdb.firebaseio.com",
  projectId: "rememberforme-fc18b",
  storageBucket: "rememberforme-fc18b.firebasestorage.app",
  messagingSenderId: "453928856195",
  appId: "1:453928856195:web:b074f1099dea94dc30c9b6",
};

export const familyId = "family_001";
export const familyPath = `families/${familyId}`;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

/**
 * Returns a DatabaseReference pointing to the family's root or a specific child path.
 */
export function familyRef(childPath = ""): DatabaseReference {
  return ref(database, childPath ? `${familyPath}/${childPath}` : familyPath);
}

/**
 * Subscribes to changes at a child path relative to the family node.
 * Returns an unsubscribe function.
 */
export function subscribeToPath(childPath: string, callback: (snapshot: any) => void) {
  return onValue(familyRef(childPath), callback);
}

/**
 * Updates properties at a child path relative to the family node.
 */
export function updatePath(childPath: string, payload: Record<string, any>) {
  return update(familyRef(childPath), payload);
}

/**
 * Runs a transaction on a specific task node.
 */
export async function transactTask(taskId: string, mutateTask: (currentTask: any) => any) {
  const taskReference = familyRef(`tasks/${taskId}`);
  const result = await runTransaction(taskReference, (currentTask) => {
    const nextTask = mutateTask(currentTask);
    return nextTask === undefined ? currentTask : nextTask;
  });

  return {
    committed: result.committed,
    snapshot: result.snapshot,
  };
}
