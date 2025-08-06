export interface Task {
  id: number;
  title: string;
  description: string;
  duedate: Date;
  status: 'Have To Do' | 'In Progress' | 'Completed';
}
