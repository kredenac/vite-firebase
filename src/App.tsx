import "./App.css";
import { AppStateProvider } from "./ContextProviders";
import { DatabaseProvider, firebaseDefaultDatabase } from "./FirebaseProvider";
import { NotepadIntro } from "./Notepad";

import { Grid } from "@mui/material";
import { AppThemeProvider, ThemeSwitcher } from "./Theme";

function App() {
  return (
    <AppStateProvider>
      <DatabaseProvider value={firebaseDefaultDatabase}>
        <AppThemeProvider>
          <Grid
            item
            px={4}
            pt={4}
            pb={2}
            alignItems="center"
            justifyItems="center"
            textAlign="center"
          >
            <NotepadIntro />
            <img src="/vite.svg" className="logo" alt="Vite logo" width={50} />
            <p style={{ color: "gray" }}>
              Get the most out of your day with productive.ly
            </p>
            <ThemeSwitcher />
          </Grid>
          <div></div>
        </AppThemeProvider>
      </DatabaseProvider>
    </AppStateProvider>
  );
}

export default App;
