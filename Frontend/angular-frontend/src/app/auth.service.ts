import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userEmail = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    // Check if the user is already logged in (e.g., from localStorage)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      this.loggedIn.next(true);
    }

    // Retrieve user email from local storage
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.userEmail.next(userEmail);
    }
  }

  login(formData: { email: any; password: any; }): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/login', formData, { responseType: 'text' }).pipe(
      tap(() => {
        // Update the loggedIn BehaviorSubject upon successful login
        this.loggedIn.next(true);
        localStorage.setItem('userEmail', formData.email);
        this.userEmail.next(formData.email);
        // Optionally, save the authentication state to localStorage
        localStorage.setItem('isLoggedIn', 'true');
      })
    );
  }

  logout(): void {
    // Perform logout logic, e.g., clear local storage, invalidate token
    this.loggedIn.next(false);
    this.userEmail.next('');
    // Optionally, remove the authentication state from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  }

  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserEmail(): Observable<string> {
    return this.userEmail.asObservable();
  }
}
