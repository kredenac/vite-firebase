import { useState, useEffect, useRef } from "react";

import "./Notepad.css";
import { useEditTask } from "./DatabaseHooksApi";
import { TaskList } from "./TaskList";
import { useAppState } from "./ContextProviders";
import { uuidv4 } from "@firebase/util";

export const NotepadIntro = () => {
  return (
    <div>
      <Notepad />
      <NewTaskButton />
      <TaskList />
    </div>
  );
};

const NewTaskButton = () => {
  const { setTaskId } = useAppState();

  return (
    <button
      onClick={() => setTaskId(uuidv4())}
      style={{
        margin: "0 auto",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        padding: "8px",
      }}
    >
      🆕 Task
    </button>
  );
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
  const { setTaskId, taskId } = useAppState();
  const { write, state, isLoading, remove } = useEditTask();

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
      onChange={async (e) => {
        await write({ text: e.target.value, lastModified: Date.now() });
        // if (!e.target.value) {
        //   await remove(taskId);
        // }
      }}
      placeholder={"New todo..."}
    />
  );
};
