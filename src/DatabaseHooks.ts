import { onValue, ref, remove as firebaseRemove, set } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import { useDatabase } from "./FirebaseProvider";

export type DatabaseApi<T> =
  | {
      state: null;
      write: (value: T) => Promise<void>;
      error: string;
      isLoading: false;
      remove: (id: string) => Promise<void>;
    }
  | {
      state: T | null;
      write: (value: T) => Promise<void>;
      error: undefined;
      isLoading: boolean;
      remove: (id: string) => Promise<void>;
    };

export const useDatabaseValue = <T>(path: string[]): DatabaseApi<T> => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<T | null>(null);
  const database = useDatabase();
  const databasePath = path.join("/");

  const { write, locationRef, remove } = useMemo(() => {
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
  }, [databasePath]);

  useEffect(() => {
    const unsubscribe = onValue(locationRef, (snapshot) => {
      setIsLoading(false);
      const newValue = snapshot.val();
      if (JSON.stringify(newValue) === JSON.stringify(state)) return;
      setState(newValue);
    });

    return unsubscribe;
  }, []);

  if (!state) {
    return {
      write,
      state: null,
      error: "No data",
      isLoading: false,
      remove,
    };
  }

  return { write, state: state!, isLoading, error: undefined, remove };
};
