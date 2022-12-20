import { useState, useEffect, useRef } from "react";
import { useEditTask } from "./DatabaseHooksApi";
import { TaskList } from "./TaskList";
import { useAppState } from "./ContextProviders";
import { uuidv4 } from "@firebase/util";
import { Button, TextField } from "@mui/material";

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
    <Button
      variant="contained"
      sx={{ m: 2 }}
      onClick={() => setTaskId(uuidv4())}
    >
      🆕 Task
    </Button>
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
    ref.current?.addEventListener?.("keydown", keyDown);
    return () => {
      ref.current?.removeEventListener?.("keydown", keyDown);
    };
  }, []);

  return { ref, isCtrlEnter };
};

export const Notepad = () => {
  const { setTaskId, taskId } = useAppState();
  const { write, isLoading, state } = useEditTask();
  const [text, setText] = useState("");
  useEffect(() => {
    if (isLoading) return;
    setText(state?.text ?? "");
  }, [taskId, isLoading]);

  const { isCtrlEnter, ref } = useCtrlEnter();

  useEffect(() => {
    if (isCtrlEnter) {
      const newTaskId = uuidv4();
      setTaskId(newTaskId);
    }
  }, [isCtrlEnter]);

  return (
    <TextField
      value={text}
      onChange={async (e) => {
        setText(e.target.value);
        await write({ text: e.target.value, lastModified: Date.now() });
        // TODO remove element from tasklist when empty
        // if (!e.target.value) {
        //   await remove(taskId);
        // }
      }}
      fullWidth={true}
      ref={ref as any}
      label="New todo"
      multiline
      rows={Math.max(5, text.split("\n").length)}
      placeholder={"Press Ctrl+Enter to create a new task..."}
      variant="outlined"
    />
  );
};
