import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";

export const AllowedFeatureFlags = ["Nikola", 'Mladen'] as const;

export type FeatureFlag = typeof AllowedFeatureFlags[number];

const first: FeatureFlag = 'Nikola';
console.log(first)

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

function write(id: number) {
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

type ResultsFromDb = { [userId: number]: User };

type User = {
  email: string;
  key: string;
};

function Results() {
  const [results, setResults] = useState<ResultsFromDb>({});
  function read() {
    const usersRef = ref(database, "users");
    console.log("init read from db");

    return onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setResults(data);
    });
  }
  useEffect(read, []);

  return (
    <div>
      Results
      {Object.entries(results).map(([id, user]) => (
        <div key={id}>
          {id} {user.email} {user.key}
        </div>
      ))}
    </div>
  );
}

// testing how react tracks component ids
function TestBase() {
  const [renderFirst, setRenderFirst] = useState(true);

  let c;
  if (renderFirst) {
    c= <TestChild key={1} />;
  } else {
    c= <TestChild key={2} />;
  }

  return <>
    <button onClick={() => setRenderFirst(!renderFirst)}>Set render first, currently {`${renderFirst}`}</button>
    {c}
  </>
}

function TestChild() {
  const [count, setCount] = useState(0);
  useEffect(() => console.log('init component'), []);
  return <div onClick={() => setCount(count + 1)}>I'm Child {count}</div>;
}

function App() {
  const [count, setCount] = useState(0);

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
      <TestBase></TestBase>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR - wow!
        </p>
        <WriteButton />
        <Results />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
