import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoy_UUlzjhy5yovqItHcafXJY2BDrl5Ao",
  authDomain: "app-house-c38f2.firebaseapp.com",
  databaseURL: "https://app-house-c38f2-default-rtdb.firebaseio.com",
  projectId: "app-house-c38f2",
  storageBucket: "app-house-c38f2.appspot.com",
  messagingSenderId: "450199761331",
  appId: "1:450199761331:web:01586ff1ac8aeedecd5bc6",
  measurementId: "G-5T4RW19GFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)