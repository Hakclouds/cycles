import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    User,
    onAuthStateChanged
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    getDoc,
    deleteDoc
} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgfC7AF3ej0n4qCZNNtQQCs6E3RTJLjGA",
    authDomain: "ui-food-delivery-project.firebaseapp.com",
    projectId: "ui-food-delivery-project",
    storageBucket: "ui-food-delivery-project.firebasestorage.app",
    messagingSenderId: "951129613545",
    appId: "1:951129613545:web:f7b28d9111dba699013c78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Authentication Functions
export const signUp = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
    await signOut(auth);
};

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => resolve(user));
    });
};

// Firestore Functions
export const addData = async (collectionName: string, data: Record<string, any>) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
};

export const setData = async (collectionName: string, docId: string, data: Record<string, any>) => {
    await setDoc(doc(db, collectionName, docId), data);
};

export const getData = async (collectionName: string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getSingleDocument = async (collectionName: string, docId: string) => {
    const docSnap = await getDoc(doc(db, collectionName, docId));
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const deleteDocument = async (collectionName: string, docId: string) => {
    await deleteDoc(doc(db, collectionName, docId));
};

// Storage Functions
export const uploadFile = async (fileUri: string, path: string) => {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);
    return getDownloadURL(storageRef);
};

export const getDownloadUrl = async (path: string) => {
    return await getDownloadURL(ref(storage, path));
};

// Export Firebase instance (optional)
export { auth, db, storage };
