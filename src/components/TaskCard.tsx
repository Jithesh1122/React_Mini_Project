import { Task, STATUS_LABELS, PRIORITY_LABELS, TaskStatus } from "@/lib/tasks";
import { format } from "date-fns";
import { CalendarDays, Pencil, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const statusClass: Record<TaskStatus, string> = {
  todo: "status-todo",
  "in-progress": "status-in-progress",
  completed: "status-completed",
};

const priorityClass: Record<string, string> = {
  high: "priority-high",
  medium: "priority-medium",
  low: "priority-low",
};

const statusAccent: Record<TaskStatus, string> = {
  todo: "from-[hsl(218_12%_55%/0.2)]",
  "in-progress": "from-[hsl(38_95%_60%/0.2)]",
  completed: "from-[hsl(152_70%_48%/0.2)]",
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }: Props) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "completed";

  return (
    <div className={`group relative overflow-hidden glass-card p-5 flex flex-col gap-3.5 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-[hsl(250_80%_62%/0.05)]`}>
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${statusAccent[task.status]} to-transparent`} />

      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-[15px] leading-snug ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{task.description}</p>
          )}
        </div>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-secondary" onClick={() => onEdit(task)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onDelete(task.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${statusClass[task.status]}`}>
          {STATUS_LABELS[task.status]}
        </span>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${priorityClass[task.priority]}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[hsl(228_15%_22%)]">
        <div className={`flex items-center gap-1.5 text-xs ${isOverdue ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
          <CalendarDays className="h-3.5 w-3.5" />
          {isOverdue && "Overdue · "}
          {format(new Date(task.dueDate), "MMM d, yyyy")}
        </div>
        <Select value={task.status} onValueChange={(v) => onStatusChange(task.id, v as TaskStatus)}>
          <SelectTrigger className="h-7 w-[120px] text-xs bg-secondary/50 border-[hsl(228_15%_24%)] rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.entries(STATUS_LABELS) as [TaskStatus, string][]).map(([k, v]) => (
              <SelectItem key={k} value={k} className="text-xs">{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
