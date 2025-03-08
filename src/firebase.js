import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: 'AIzaSyBWZVSe6u1J3WM8WXZ-s3ibRIJEkHhBMQk',
  // authDomain: 'dreamelevenclone.firebaseapp.com',
  // projectId: 'dreamelevenclone',
  // storageBucket: 'dreamelevenclone.appspot.com',
  // messagingSenderId: '438326678548',
  // appId: '1:438326678548:web:df3d8f83998c66c3ef4301',
  // measurementId: 'G-SC62SMG6E5',




  apiKey: "AIzaSyDc-dai0h08lMMgrgk3qk2UAItZG71tUZE",
  authDomain: "wonderwin-c9486.firebaseapp.com",
  projectId: "wonderwin-c9486",
  storageBucket: "wonderwin-c9486.firebasestorage.app",
  messagingSenderId: "1096266987046",
  appId: "1:1096266987046:web:999d88940127a0e3ef58e7",
  measurementId: "G-HVCPCG77VL"
};
export const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });
export const storage = getStorage(app);
export default db;
