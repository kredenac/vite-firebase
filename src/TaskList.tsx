import { TaskListDb, useTodoList } from "./DatabaseHooksApi";

export const TaskList = () => {
  const { state, isLoading, remove } = useTodoList();

  if (isLoading || !state) {
    return null;
  }

  const tmpFix = Object.entries(state);

  return (
    <ul style={{ listStyleType: "none" }}>
      {tmpFix.map(([key, value]) => (
        <li key={key}>
          <TaskItem onRemove={() => remove(key)} text={value.text} />
        </li>
      ))}
    </ul>
  );
};

interface TaskItemProps {
  onRemove: () => void;
  text: string;
}

const TaskItem = (props: TaskItemProps) => {
  const { onRemove, text } = props;
  return (
    <section
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div
        style={{
          whiteSpace: "pre-line",
          border: "1px gray solid",
          borderRadius: "4px",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          padding: "8px",
        }}
      >
        {text}
      </div>
      <button onClick={onRemove} style={{ maxHeight: "40px" }}>
        🗑
      </button>
    </section>
  );
};
