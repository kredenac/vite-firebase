import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

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
const database = getDatabase(app);

console.log(database);




function write(id: number ) {
  const user = ref(database, "users/" + id);
  set(user, {
    key: "value",
    email: "lmao@gmail.com",
  });
  console.log("written", id);
}

function WriteButton() {
  const [id, setId] = useState(0);
  return (
    <div>
      <button onClick={() => write(id)}>Write</button>
      <input value={id} onChange={(e) => setId(Number(e.target.value))} />
    </div>
  );
}

function read() {
  const usersRef = ref(database, "users");
  console.log('init read');

  return onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    console.log("read data", data);
  });
}

function App() {
  const [count, setCount] = useState(0);

  useEffect(read, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR - wow!
        </p>
          <WriteButton />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
