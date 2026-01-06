export interface CreateTask {
  name: string;
  description: string;
  duration: number;
  type : string;
  assignedTo:number[];
  projectId:number
}