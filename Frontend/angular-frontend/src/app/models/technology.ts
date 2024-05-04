import { User } from "./user";

export interface Technology {
    technology_id: number;
    name: string;
    users?: User[]; // Assuming User is another model/interface
  }
  