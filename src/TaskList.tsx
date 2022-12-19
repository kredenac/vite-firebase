import { calculateBackoffMillis } from "@firebase/util";
import { useAppState } from "./ContextProviders";
import { TaskListDb, useTodoList } from "./DatabaseHooksApi";

export const TaskList = () => {
  const { state, isLoading, remove } = useTodoList();

  if (isLoading || !state) {
    return null;
  }

  const sortedTasks = Object.entries(state).sort(
    (a, b) => a[1].lastModified - b[1].lastModified
  );

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {sortedTasks.map(([key, value]) => (
        <li key={key} style={{ marginTop: "8px" }}>
          <TaskItem
            onRemove={() => remove(key)}
            text={value.text}
            taskId={key}
          />
        </li>
      ))}
    </ul>
  );
};

interface TaskItemProps {
  onRemove: () => void;
  text: string;
  taskId: string;
}

const TaskItem = (props: TaskItemProps) => {
  const { setTaskId } = useAppState();
  const { onRemove, text, taskId } = props;
  return (
    <section
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        onClick={() => setTaskId(taskId)}
        style={{
          border: "1px gray solid",
          borderRadius: "4px",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          padding: "8px",
          textAlign: "left",
          whiteSpace: "pre-wrap",
          cursor: "pointer",
          maxWidth: "90vw",
          width: "90vw",
        }}
      >
        {text.trim()}
      </div>
      <button
        onClick={onRemove}
        style={{
          height: "28px",
          width: "32px",
          padding: "4px",
          position: "absolute",
          bottom: "4px",
          right: "4px",
        }}
      >
        🗑
      </button>
    </section>
  );
};
