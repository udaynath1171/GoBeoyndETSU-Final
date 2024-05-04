export interface ProjectApplication {
  id: number | null;
  userId: number;
  email: string;
  projectId: number;
  status: string;
  comments: string;
}
