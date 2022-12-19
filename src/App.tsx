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
            <img src="/vite.svg" className="logo" alt="Vite logo" />
            <p style={{ color: "gray" }}>
              Get the most out of your day with productive.ly
            </p>
          </div>
        </DatabaseProvider>
      </AppStateProvider>
    </div>
  );
}

export default App;
