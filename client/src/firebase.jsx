import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB3NxEBzoouwaQBgGWE-d-6pna4jgwjWTw",
  authDomain: "penta-online.firebaseapp.com",
  projectId: "penta-online",
  storageBucket: "penta-online.appspot.com",
  messagingSenderId: "60946568274",
  appId: "1:60946568274:web:df5e989c496ab8d2f93b8b",
  measurementId: "G-TSRBPXJGLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);