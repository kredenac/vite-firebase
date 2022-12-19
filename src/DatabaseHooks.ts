import { onValue, ref, set } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import { useDatabase } from "./FirebaseProvider";

export type DatabaseApi<T> =
  | {
      state: undefined;
      write: (value: T) => void;
      error: string;
      isLoading: false;
    }
  | {
      state: T;
      write: (value: T) => void;
      error: undefined;
      isLoading: boolean;
    };

export const useDatabaseValue = <T>(path: string[]): DatabaseApi<T> => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<T | null>(null);
  const database = useDatabase();

  const { write, userRef } = useMemo(() => {
    const userRef = ref(database, `${path.join("/")}`);

    const write = async (value: T) => {
      await set(userRef, value);
      setState(value);
    };

    return { write, userRef };
  }, []);

  useEffect(() => {
    const unsubscribe = onValue(userRef, (snapshot) => {
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
      state: undefined,
      error: "No data",
      isLoading: false,
    };
  }

  return { write, state: state!, isLoading, error: undefined };
};
