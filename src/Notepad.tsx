import { useState, useEffect, useRef } from "react";

import "./Notepad.css";
import { useNewTodo } from "./DatabaseHooksApi";
import { TaskList } from "./TaskList";

export const NotepadIntro = () => {
  // const { isLoading } = useDatabaseValue();

  return (
    <div id="intro">
      {/* {isLoading && "Waiting for database to load..."} */}
      <Notepad />
      <TaskList />
    </div>
  );
};

export const Notepad = () => {
  const [cursorPosition, setCursorPosition] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { write, state, isLoading } = useNewTodo();

  const { text } = state || {};

  useEffect(() => {
    textAreaRef.current?.setSelectionRange(cursorPosition, cursorPosition);
  }, [cursorPosition, text]);

  if (isLoading) {
    return null;
  }

  return (
    <textarea
      ref={textAreaRef}
      id="notepad"
      value={text}
      onChange={(e) => {
        setCursorPosition(e.target.selectionStart);
        write({ text: e.target.value });
      }}
      placeholder={"Start your productive life here!"}
    />
  );
};
