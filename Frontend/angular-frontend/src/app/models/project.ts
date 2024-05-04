// import { Technology } from "./technology.model";
import { Technology } from "./technology.js";
import { User } from "./user.js";

export interface Project {
  id: number | null;
  title: string;
  description: string;
  expectedStartDate: Date;
  expectedCompletionDate: Date;
  additionalDocumentation: Blob | null;
  technologies: string[];
  status: string;
  owner: string | null;
}
