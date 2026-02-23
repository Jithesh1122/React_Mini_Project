import { ListTodo, Clock, CheckCircle2, LayoutDashboard, TrendingUp } from "lucide-react";

interface Props {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
}

const cards = [
  {
    key: "total",
    label: "Total Tasks",
    icon: LayoutDashboard,
    gradient: "bg-gradient-to-br from-[hsl(250_80%_62%/0.18)] to-[hsl(280_85%_55%/0.06)]",
    iconColor: "text-[hsl(250_80%_72%)]",
    borderColor: "border-[hsl(250_80%_62%/0.2)]",
  },
  {
    key: "todo",
    label: "To Do",
    icon: ListTodo,
    gradient: "bg-gradient-to-br from-[hsl(218_12%_55%/0.12)] to-transparent",
    iconColor: "text-[hsl(var(--status-todo))]",
    borderColor: "border-[hsl(218_12%_55%/0.15)]",
  },
  {
    key: "inProgress",
    label: "In Progress",
    icon: Clock,
    gradient: "bg-gradient-to-br from-[hsl(38_95%_60%/0.12)] to-transparent",
    iconColor: "text-[hsl(var(--status-in-progress))]",
    borderColor: "border-[hsl(38_95%_60%/0.15)]",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    gradient: "bg-gradient-to-br from-[hsl(152_70%_48%/0.12)] to-transparent",
    iconColor: "text-[hsl(var(--status-completed))]",
    borderColor: "border-[hsl(152_70%_48%/0.15)]",
  },
] as const;

export default function DashboardSummary({ total, todo, inProgress, completed }: Props) {
  const values = { total, todo, inProgress, completed };
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ key, label, icon: Icon, gradient, iconColor, borderColor }) => (
          <div
            key={key}
            className={`relative overflow-hidden rounded-2xl border ${borderColor} ${gradient} p-5 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {label}
              </span>
              <div className={`h-8 w-8 rounded-lg bg-card/50 flex items-center justify-center ${iconColor}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <span className="text-4xl font-bold tracking-tight">{values[key]}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="glass-card p-4 flex items-center gap-4">
          <TrendingUp className="h-4 w-4 text-[hsl(var(--status-completed))] shrink-0" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Overall Progress</span>
              <span className="text-xs font-bold text-[hsl(var(--status-completed))]">{completionRate}%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[hsl(250_80%_62%)] to-[hsl(152_70%_48%)] transition-all duration-700 ease-out"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
