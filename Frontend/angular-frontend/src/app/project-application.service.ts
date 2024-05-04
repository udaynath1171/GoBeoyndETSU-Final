import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProjectApplication } from "./models/project-application";
import { Project } from "./models/project";

@Injectable({
  providedIn: "root",
})
export class ProjectApplicationService {
  private baseUrl = "http://localhost:8080/api/projectApplications";

  constructor(private http: HttpClient) {}

  // Create a new project application
  createProjectApplication(
    projectApplication: ProjectApplication
  ): Observable<ProjectApplication> {
    return this.http.post<ProjectApplication>(
      `${this.baseUrl}/`,
      projectApplication
    );
  }

  // Get all project applications
  getAllProjectApplications(): Observable<ProjectApplication[]> {
    return this.http.get<ProjectApplication[]>(`${this.baseUrl}/`);
  }

  getAllProjectApplicationsByUserId(id: number): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + "/byUserIdAndStatus/" + id);
  }

  getAllProjectApplicationsByProjectd(
    id: number
  ): Observable<ProjectApplication[]> {
    return this.http.get<ProjectApplication[]>(
      this.baseUrl + "/byProjectId/" + id
    );
  }

  // Get a project application by ID
  getProjectApplicationById(id: number): Observable<ProjectApplication> {
    return this.http.get<ProjectApplication>(`${this.baseUrl}/${id}`);
  }

  // Update a project application
  updateProjectApplication(
    id: number,
    projectApplication: ProjectApplication
  ): Observable<ProjectApplication> {
    return this.http.put<ProjectApplication>(
      `${this.baseUrl}/${id}`,
      projectApplication
    );
  }

  // Delete a project application
  deleteProjectApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateProjectApplicationStatus(id: number, status: string): Observable<any> {
    const formData = new FormData();
    formData.append("status", status);

    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http.put(`${this.baseUrl}/${id}/status`, formData, {
      headers,
      responseType: "text",
    });
  }
}
