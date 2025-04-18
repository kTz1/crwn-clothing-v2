/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../../store/categories/categories.types";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC97G0BzYvZbfuR5Qzt6rCiBUhJ2FIsGXo",
  authDomain: "crwn-clothing-db-5059b.firebaseapp.com",
  projectId: "crwn-clothing-db-5059b",
  storageBucket: "crwn-clothing-db-5059b.firebasestorage.app",
  messagingSenderId: "383290135136",
  appId: "1:383290135136:web:0538d26e8d51a887eda905",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Authentication
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// Database
export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
};

// Add collection and documents to firestore
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  // Create a reference to the collection
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    // Add a new document with a generated id
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  // Commit the batch
  await batch.commit();
  console.log("done");
};

// Get categories and documents from firestore
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  // generate a query
  const q = query(collectionRef);
  // get the data from the query as Category[]
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

export type AdditionalInfo = {
  displayName?: string;
};

export type UserData = {
  createAt: Date;
  displayName: string;
  email: string;
};

// Create a user document from auth
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInfo = {} as AdditionalInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  // Check if user exists and access data
  const userSnapshot = await getDoc(userDocRef);
  // If user data does not exist
  // create/set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating the user", error);
    }
  }

  // If user exists return user data
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// Create a user
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in a user
export const signInAuthWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out a user
export const signOutUser = async () => await signOut(auth);

// Listen for changes in auth - sign in/sign out
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

// check if an active user that is authenticated
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
