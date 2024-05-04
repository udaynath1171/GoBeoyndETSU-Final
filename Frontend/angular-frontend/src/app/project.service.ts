import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Project } from "./models/project";
import { HttpClient } from "@angular/common/http";
import { Technology } from "./models/technology";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private apiUrl = "http://localhost:8080/api/projects";
  private project: Project = {
    id: 0,
    title: "Project Title",
    description: "Project Description",
    expectedStartDate: new Date(), // Example: Current date
    expectedCompletionDate: new Date(), // Example: Current date
    additionalDocumentation: new Blob(), // Example: No additional documentation
    technologies: [], // Example: Empty array
    status: "Pending", // Example: Initial status
    owner: "djndederh",
  };

  private projects: Project[] = [this.project];

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getAllProjectsByOwner(email: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl + "/owner/" + email);
  }

  getProjectById(id: number): Observable<Project | undefined> {
    const project = this.projects.find((p) => p.id === id);
    return of(project);
  }

  createProject(project: Project): Observable<void> {
    return this.http.post<void>(this.apiUrl, project);
  }

  updateProject(id: number, project: Project): Observable<void> {
    // Logic to update a project (not implemented in mock service)
    return of();
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + id);
  }

  getAllTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(
      "http://localhost:8080/api/technologies"
    );
  }
}
