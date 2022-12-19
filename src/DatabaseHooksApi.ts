import { DatabaseApi, useDatabaseValue } from "./DatabaseHooks";
import { useAppState } from "./ContextProviders";

const userId = "dimi";

export type Task = {
  text: string;
  lastModified: number;
};

export const useEditTask = (): DatabaseApi<Task> => {
  const { taskId } = useAppState();
  return useDatabaseValue<Task>(["users", userId, taskId]);
};

export type TaskListDb = Task[];

export const useTodoList = () => {
  return useDatabaseValue<TaskListDb>(["users", userId]);
};
