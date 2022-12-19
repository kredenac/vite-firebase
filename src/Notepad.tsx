import { useState, useEffect, useRef } from "react";

import "./Notepad.css";
import { useEditTask } from "./DatabaseHooksApi";
import { TaskList } from "./TaskList";
import { useAppState } from "./ContextProviders";
import { uuidv4 } from "@firebase/util";

export const NotepadIntro = () => {
  return (
    <div id="intro">
      <Notepad />
      <NewTaskButton />
      <TaskList />
    </div>
  );
};

const NewTaskButton = () => {
  const { setTaskId } = useAppState();

  return <button onClick={() => setTaskId(uuidv4())}>🆕 Task</button>;
};

const useCtrlEnter = () => {
  const ref = useRef({} as HTMLInputElement);
  const [isCtrlEnter, setIsCtrlEnter] = useState(false);
  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        return setIsCtrlEnter(true);
      }
      setIsCtrlEnter(false);
    };
    ref.current.addEventListener("keydown", keyDown);
    return () => {
      ref.current.removeEventListener("keydown", keyDown);
    };
  }, []);

  return { ref, isCtrlEnter };
};

export const Notepad = () => {
  const { setTaskId } = useAppState();
  const { write, state, isLoading } = useEditTask();

  const { text } = state || { text: "" };

  const { isCtrlEnter, ref } = useCtrlEnter();

  useEffect(() => {
    if (isCtrlEnter) {
      const newTaskId = uuidv4();
      setTaskId(newTaskId);
    }
  }, [isCtrlEnter]);

  if (isLoading) {
    return null;
  }

  return (
    <textarea
      ref={ref as any}
      id="notepad"
      value={text}
      onChange={(e) => {
        write({ text: e.target.value, lastModified: Date.now() });
      }}
      placeholder={"Start your productive life here!"}
    />
  );
};
