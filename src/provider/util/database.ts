import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDqlJwo_T-vcd-5PPbANyKgkZ3aXo1S-ZI",
    authDomain: "poker-83b43.firebaseapp.com",
    projectId: "poker-83b43",
    storageBucket: "poker-83b43.appspot.com",
    messagingSenderId: "308548339943",
    appId: "1:308548339943:web:1acd906352b98effa4fa42",
    databaseURL: "https://poker-83b43-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);