// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8O86AbCT8-eLKojCj07ipq6vS4m9iXNs",
  authDomain: "sp-books.firebaseapp.com",
  projectId: "sp-books",
  storageBucket: "sp-books.appspot.com",
  messagingSenderId: "781968798951",
  appId: "1:781968798951:web:dce3706ac712a6da2bde42",
  measurementId: "G-GXS7CFN0KY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
