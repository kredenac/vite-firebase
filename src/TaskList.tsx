import { TaskListDb, useTodoList } from "./DatabaseHooksApi";

export const TaskList = () => {
  const { state, isLoading } = useTodoList();

  if (isLoading || !state) {
    return null;
  }

  const tmpFix = Object.entries(state);

  return (
    <ol>
      {tmpFix.map(([key, value]) => (
        <li key={key}>
          <div style={{ whiteSpace: "pre-line" }}>{value.text}</div>
        </li>
      ))}
    </ol>
  );
};
