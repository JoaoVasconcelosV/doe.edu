import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCuD7CSwx8lHbLXQePBPolHXM1DdRyjRpE",
  authDomain: "doeedu-65ce9.firebaseapp.com",
  projectId: "doeedu-65ce9",
  storageBucket: "doeedu-65ce9.appspot.com",
  messagingSenderId: "410770825436",
  appId: "1:410770825436:web:232f8bf7590b3dd9501419"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;