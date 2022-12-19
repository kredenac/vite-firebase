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
    <ul style={{ listStyleType: "none" }}>
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
          whiteSpace: "pre",
          cursor: "pointer",
        }}
      >
        {text.trim()}
      </div>
      <button onClick={onRemove} style={{ maxHeight: "40px" }}>
        🗑
      </button>
    </section>
  );
};
