export interface GetProjectResponse {
  count: number;
  projects: ProjectApiModel[];
}

export interface ProjectApiModel {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  teamMembers: TeamMemberApiModel[];
}

export interface TeamMemberApiModel {
  id: number;
  username: string;
  email: string;
}
