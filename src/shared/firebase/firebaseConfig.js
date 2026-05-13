import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWr2oAgvFcZ4CDBFegvIEks_CUSHZcn5s",
  authDomain: "real-eastate-project-275bb.firebaseapp.com",
  projectId: "real-eastate-project-275bb",
  storageBucket: "real-eastate-project-275bb.firebasestorage.app",
  messagingSenderId: "667231329223",
  appId: "1:667231329223:web:b207bc69f9bd56ce9b17e2",
  measurementId: "G-DKJRSW1D7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Dynamic check for analytics (since it only works in browser)
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { analytics };

export default app;