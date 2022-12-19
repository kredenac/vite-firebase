import { createContext, useContext, useState } from "react";
import { v4 as getId } from "uuid";

const AppStateContext = createContext<{
  taskId: string;
  setTaskId: (taskId: string) => void;
}>({
  taskId: "uninitialized",
  setTaskId: () => {},
});

export const AppStateProvider = (props: { children: JSX.Element }) => {
  const [taskId, setTaskId] = useState(getId());
  return (
    <AppStateContext.Provider
      value={{
        taskId,
        setTaskId: (newTaskId: string) => {
          setTaskId(newTaskId);
        },
      }}
    >
      {props.children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
