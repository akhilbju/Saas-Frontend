export interface UpdateTaskRequest {
  taskId: number;
  taskName: string;
  status: any;
  description: string;
  assignees: number[];
  duration: any
}