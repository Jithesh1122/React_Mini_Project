import { useState, useCallback, useEffect } from "react";
import { Task, TaskStatus, TaskPriority, loadTasks, saveTasks, createTask } from "@/lib/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "all">("all");
  const [filterPriority, setFilterPriority] = useState<TaskPriority | "all">("all");
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((data: Omit<Task, "id" | "createdAt">) => {
    setTasks((prev) => [createTask(data), ...prev]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const filteredTasks = tasks
    .filter((t) => (filterStatus === "all" ? true : t.status === filterStatus))
    .filter((t) => (filterPriority === "all" ? true : t.priority === filterPriority))
    .sort((a, b) => {
      const da = new Date(a.dueDate).getTime();
      const db = new Date(b.dueDate).getTime();
      return sortByDate === "asc" ? da - db : db - da;
    });

  const summary = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return {
    tasks: filteredTasks,
    summary,
    addTask,
    updateTask,
    deleteTask,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortByDate,
    setSortByDate,
  };
}
