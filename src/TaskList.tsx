import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { useAppState } from "./ContextProviders";
import { useTodoList } from "./DatabaseHooksApi";
import { IconButton } from "@mui/material";
import { IoTrashOutline } from "react-icons/io5";

export const TaskList = () => {
  const { state, isLoading, remove } = useTodoList();

  if (isLoading || !state) {
    return null;
  }

  const sortedTasks = Object.entries(state).sort(
    (a, b) => a[1].lastModified - b[1].lastModified
  );

  return (
    <List disablePadding sx={{ display: "flex", flexDirection: "column" }}>
      {sortedTasks.map(([key, value]) => (
        <ListItem key={key} sx={{ px: 0, py: 0.5 }}>
          <TaskItem
            onRemove={() => remove(key)}
            text={value.text}
            taskId={key}
          />
        </ListItem>
      ))}
    </List>
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
        // display: "flex",
        // maxWidth: "100%",
        flex: 1,
        alignItems: "center ",
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
          overflow: "hidden",
        }}
      >
        {text.trim()}
      </div>
      <IconButton
        onClick={onRemove}
        sx={{
          position: "absolute",
          right: "4px",
          bottom: "0px",
        }}
        size="small"
      >
        <IoTrashOutline />
      </IconButton>
    </section>
  );
};
