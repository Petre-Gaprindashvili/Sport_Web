import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, UserRegister, UserLogin, ResetPasswordResponse, ResetPassword, getUsers } from '../interfaces/auth';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';  // Ensure tap is imported
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';  // Unnecessary import, can be removed
import { Subcategory } from '../interfaces/subCategory';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIdSubject = new BehaviorSubject<number | null>(null); // Manage userId in BehaviorSubject for dynamic access
  private adminEmailSubject: BehaviorSubject<string> = new BehaviorSubject<string>(''); // Stores email in memory

  constructor(private http: HttpClient) {}

  // Login method to authenticate the user and store the email in memory
  login(email: string, password: string): Observable<AuthResponse> {
    const user: UserLogin = { email, password };
    return this.http.post<AuthResponse>(`${environment.backendBaseUrl}/api/users/login`, user, {
      withCredentials: true // Include credentials (cookies)
    }).pipe(
      // After successful login, store the email in BehaviorSubject (in-memory)
      tap(response => {
        this.adminEmailSubject.next(email); // Store email in memory
      })
    );
  }

  // Store and persist userId in localStorage
  setUserId(userId: number) {
    localStorage.setItem('userId', userId.toString()); //  persist it
    this.userIdSubject.next(userId);
  }

  // Get userId from localStorage or return null if not found
  getUserId(): number | null {
    const stored = localStorage.getItem('userId');
    if (stored) {
      const id = parseInt(stored, 10);
      this.userIdSubject.next(id); // Update BehaviorSubject as well (optional)
      return id;
    }
    return null;
  }

  // User registration
  register(userName: string, email: string, password: string): Observable<AuthResponse> {
    const user: UserRegister = { userName, email, password };
    return this.http.post<AuthResponse>(`${environment.backendBaseUrl}/api/users/register`, user, {
      withCredentials: true // Include credentials (cookies)
    });
  }

  // Request password reset link
  sendResetLink(email: string): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>("https://localhost:7284/api/users/password-reset/request", { email });
  }

  // Reset user password with the provided token
  resetPassword(ResetPassword: ResetPassword, token: string): Observable<ResetPasswordResponse> {
    // const tokenurl = `https://localhost:7284/api/users/reset-password?token=${token}`; // Get token from localStorage if needed
    return this.http.post<ResetPasswordResponse>(`${environment.backendBaseUrl}/api/users/reset-password?token=${token}`, ResetPassword);
  }

  // Return the userId from the BehaviorSubject as an observable
  getUserIdObservable(): Observable<number | null> {
    return this.userIdSubject.asObservable();
  }

  // Clear user session and remove userId from localStorage
  clearUser(): void {
    localStorage.removeItem('userId');
    this.userIdSubject.next(null);
  }

  // Get the admin's email as an observable
  getAdminEmail(): Observable<string> {
    return this.adminEmailSubject.asObservable(); // Return observable for the email
  }

  // Get all users (admin only)
  getAllUser(): Observable<getUsers[]> {
    return this.http.get<getUsers[]>(`${environment.backendBaseUrl}/api/admin/users/GetAll`);
  }

  // Get a single user by userId (admin only)
  getSingleUser(userId: number): Observable<getUsers> {
    return this.http.get<getUsers>(`${environment.backendBaseUrl}/api/admin/users/GeUser/${userId}`);
  }

  // Change user role (admin only)
  changeUserRole(userId: number, newRole: string): Observable<boolean> {
    // Add newRole as a query parameter to the URL
    const url = `${environment.backendBaseUrl}/api/admin/users/update-role/${userId}?newRole=${newRole}`;
    return this.http.put<boolean>(url, {});
  }

  // Deactivate user (admin only)
  deactivateUser(userId: number): Observable<boolean> {
    return this.http.put<boolean>(`${environment.backendBaseUrl}/api/admin/users/deactivate/${userId}`, {});
  }

  // Reactivate user (admin only)
  reactivateUser(userId: number): Observable<boolean> {
    return this.http.put<boolean>(`${environment.backendBaseUrl}/api/admin/users/reactivate/${userId}`, {});
  }

  // Delete user (admin only)
  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.backendBaseUrl}/api/admin/users/DeleteUser/${userId}`, {});
  }
}
