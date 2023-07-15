export interface Board {
  name: string;
  totalNumberOfTasks: number;
  columns: Column[];
  id: string;
  order: number;
  dateOfCreation: string;
  dateOfModification: string;
}

export interface Column {
  name: string;
  tasks: Task[];
  id: string;
  order: number;
  dateOfCreation: string;
  dateOfModification: string;
}

export interface Task {
  userAttached: string;
  title: string;
  description: string;
  subtasks?: Task[];
  parents?: Task[];
  status?: string;
  id?: string;
  order: number;
  dateOfCreation?: string;
  dateOfModification?: string;
  columnId?: string;
}
