import "./App.css";
import { DatabaseProvider, firebaseDefaultDatabase } from "./FirebaseProvider";
import { NotepadIntro } from "./Notepad";

function App() {
  return (
    <div className="App">
      <DatabaseProvider value={firebaseDefaultDatabase}>
        <NotepadIntro />
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
        </div>
      </DatabaseProvider>
    </div>
  );
}

export default App;
