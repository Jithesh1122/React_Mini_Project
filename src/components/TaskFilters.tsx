import { TaskStatus, TaskPriority, STATUS_LABELS, PRIORITY_LABELS } from "@/lib/tasks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  filterStatus: TaskStatus | "all";
  setFilterStatus: (v: TaskStatus | "all") => void;
  filterPriority: TaskPriority | "all";
  setFilterPriority: (v: TaskPriority | "all") => void;
  sortByDate: "asc" | "desc";
  setSortByDate: (v: "asc" | "desc") => void;
}

export default function TaskFilters({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  sortByDate,
  setSortByDate,
}: Props) {
  return (
    <div className="glass-card p-4 flex flex-wrap items-center gap-3">
      <Filter className="h-4 w-4 text-muted-foreground shrink-0" />

      <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as TaskStatus | "all")}>
        <SelectTrigger className="w-[140px] bg-secondary/50 border-[hsl(228_15%_24%)] rounded-lg text-sm">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {(Object.entries(STATUS_LABELS) as [TaskStatus, string][]).map(([k, v]) => (
            <SelectItem key={k} value={k}>{v}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filterPriority} onValueChange={(v) => setFilterPriority(v as TaskPriority | "all")}>
        <SelectTrigger className="w-[140px] bg-secondary/50 border-[hsl(228_15%_24%)] rounded-lg text-sm">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          {(Object.entries(PRIORITY_LABELS) as [TaskPriority, string][]).map(([k, v]) => (
            <SelectItem key={k} value={k}>{v}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setSortByDate(sortByDate === "asc" ? "desc" : "asc")}
        className="gap-1.5 bg-secondary/50 border-[hsl(228_15%_24%)] rounded-lg text-sm hover:bg-secondary"
      >
        <ArrowUpDown className="h-3.5 w-3.5" />
        Due {sortByDate === "asc" ? "Earliest" : "Latest"}
      </Button>
    </div>
  );
}
