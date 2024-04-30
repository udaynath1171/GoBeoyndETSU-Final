import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:8080/api/users";
  loggedInUser: User | undefined;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/email/${email}`);
  }

  updateUserStatus(userId: number, newStatus: string): Observable<any> {
    const formData = new FormData();
    formData.append("newStatus", newStatus);

    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http.put(`${this.apiUrl}/${userId}/status`, formData, {
      headers,
      responseType: "text",
    });
  }

  getUsersWithPendingStatus(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/pending`);
  }
}
