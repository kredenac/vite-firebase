import React, { createContext, useContext } from "react";

import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBvkOf56RKKmYXYDPMaTNQ4Bi8cle3SQ30",
  authDomain: "fir-5bbb4.firebaseapp.com",
  projectId: "fir-5bbb4",

  databaseURL:
    "https://fir-5bbb4-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "fir-5bbb4.appspot.com",

  messagingSenderId: "690725925630",
  appId: "1:690725925630:web:30e06846f57198e3f76baf",
  measurementId: "G-C2KZVYRDKJ",
};

const app = initializeApp(firebaseConfig);
export const firebaseDefaultDatabase = getDatabase(app);

const FirebaseContext = createContext(firebaseDefaultDatabase);

export const DatabaseProvider = FirebaseContext.Provider;

export const useDatabase = () => {
  return useContext(FirebaseContext);
};
