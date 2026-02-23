import { useState } from "react";
import { Task } from "@/lib/tasks";
import { useTasks } from "@/hooks/useTasks";
import DashboardSummary from "@/components/DashboardSummary";
import TaskFilters from "@/components/TaskFilters";
import TaskCard from "@/components/TaskCard";
import TaskFormDialog from "@/components/TaskFormDialog";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList, Sparkles } from "lucide-react";

const Index = () => {
  const {
    tasks,
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
  } = useTasks();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSubmit = (data: Omit<Task, "id" | "createdAt">) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      setEditingTask(null);
    } else {
      addTask(data);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient glows */}
      <div className="ambient-glow" />
      <div className="ambient-glow-2" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[hsl(250_80%_62%)] to-[hsl(280_85%_55%)] flex items-center justify-center shadow-lg glow-primary">
              <ClipboardList className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Task <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">Organize, prioritize, and conquer your day</p>
            </div>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="gap-2 bg-gradient-to-r from-[hsl(250_80%_62%)] to-[hsl(280_85%_55%)] hover:from-[hsl(250_80%_55%)] hover:to-[hsl(280_85%_48%)] text-primary-foreground shadow-lg glow-primary border-0 rounded-xl px-5"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>

        {/* Summary */}
        <DashboardSummary {...summary} />

        {/* Filters */}
        <TaskFilters
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          sortByDate={sortByDate}
          setSortByDate={setSortByDate}
        />

        {/* Task Grid */}
        {tasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[hsl(250_80%_62%/0.1)] to-[hsl(280_85%_55%/0.05)] border border-[hsl(250_80%_62%/0.15)] mb-6">
              <Sparkles className="h-9 w-9 text-[hsl(250_80%_72%)]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
            <p className="text-muted-foreground mb-6">Create your first task and start being productive!</p>
            <Button
              onClick={() => setDialogOpen(true)}
              variant="outline"
              className="gap-2 rounded-xl border-[hsl(228_15%_24%)] hover:bg-secondary"
            >
              <Plus className="h-4 w-4" />
              Create Task
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={deleteTask}
                onStatusChange={(id, status) => updateTask(id, { status })}
              />
            ))}
          </div>
        )}

        {/* Dialog */}
        <TaskFormDialog
          open={dialogOpen}
          onOpenChange={handleOpenChange}
          task={editingTask}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Index;
