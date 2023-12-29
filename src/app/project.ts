import { Employee } from "./employee";

export interface Project {
    id: number;
    project_name: string;
    nb_employees: number;
    employees: Employee[]; // Assuming Employee interface is defined
  }
  