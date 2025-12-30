export interface GetProjectDetails {
  id : number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  teamMembers: GetUsers[];
  isCompleted : boolean

}

export interface GetUsers{
  id :number;
  username :string;
  email : string
}