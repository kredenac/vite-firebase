import "./App.css";
import { AppStateProvider } from "./ContextProviders";
import { DatabaseProvider, firebaseDefaultDatabase } from "./FirebaseProvider";
import { NotepadIntro } from "./Notepad";

function App() {
  return (
    <div className="App">
      <AppStateProvider>
        <DatabaseProvider value={firebaseDefaultDatabase}>
          <NotepadIntro />
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
          </div>
        </DatabaseProvider>
      </AppStateProvider>
    </div>
  );
}

export default App;
