import { onValue, ref, remove as firebaseRemove, set } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import { useDatabase } from "./FirebaseProvider";

export type DatabaseApi<T> = {
  state: T | null;
  write: (value: T) => Promise<void>;
  error?: string;
  isLoading: boolean;
  remove: (id: string) => Promise<void>;
};

export const useDatabaseValue = <T>(path: string[]): DatabaseApi<T> => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<T | null>(null);
  const [hmr, setHmr] = useState(0);
  const database = useDatabase();
  const databasePath = path.join("/");

  const reconnectionId = databasePath + hmr;

  // reconnect to database on Vite HTM
  if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
      console.log("Received new module", newModule);
      setHmr((prev) => prev + 1);
    });

    import.meta.hot.on("vite:beforeUpdate", () => {
      console.log("Running before update!!");
      setHmr((prev) => prev + 1);
    });
  }

  const { write, locationRef, remove } = useMemo(() => {
    setState(null);
    setIsLoading(true);
    const locationRef = ref(database, databasePath);

    const write = async (value: T) => {
      await set(locationRef, value);
      setState(value);
    };

    const remove = async (id: string) => {
      let elementToRemoveRef = locationRef;
      if (id) {
        elementToRemoveRef = ref(database, [databasePath, id].join("/"));
      }
      await firebaseRemove(elementToRemoveRef);
    };

    return { write, locationRef, remove };
  }, [reconnectionId]);

  useEffect(() => {
    const unsubscribe = onValue(locationRef, (snapshot) => {
      const newValue = snapshot.val();
      setState(newValue);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [reconnectionId]);

  return { write, state: state!, isLoading, error: undefined, remove };
};
