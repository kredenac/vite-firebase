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
  const database = useDatabase();
  const databasePath = path.join("/");

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
  }, [databasePath]);

  useEffect(() => {
    const unsubscribe = onValue(locationRef, (snapshot) => {
      const newValue = snapshot.val();
      // if (JSON.stringify(newValue) === JSON.stringify(state)) return;
      setState(newValue);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [databasePath]);

  return { write, state: state!, isLoading, error: undefined, remove };
};
