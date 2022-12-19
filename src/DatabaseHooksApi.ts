import { DatabaseApi, useDatabaseValue } from "./DatabaseHooks";
import { v4 as getId } from "uuid";
import { useMemo } from "react";

const userId = "dimi";

export type Task = {
  text: string;
};

export const useNewTodo = (): DatabaseApi<Task> => {
  const todoId = useMemo(() => getId(), []);
  return useDatabaseValue<Task>(["users", userId, todoId]);
};

export type TaskListDb = Task[];

export const useTodoList = () => {
  return useDatabaseValue<TaskListDb>(["users", userId]);
};
