import { Technology } from "./technology";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  status: string;
  technologies?: Technology[]; // Assuming Technology is another model/interface
}
