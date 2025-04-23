import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, UserRegister, UserLogin, ResetPasswordResponse, ResetPassword } from '../interfaces/auth';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIdSubject = new BehaviorSubject<number | null>(null); // Manage userId in BehaviorSubject for dynamic access

  constructor(private http:HttpClient) {}

  login(email:string, password:string):Observable<AuthResponse>{
  const user: UserLogin = {email,password};
  return this.http.post<AuthResponse>(`${environment.backendBaseUrl}/api/users/login`, user,{
     withCredentials:true
  })
  }
  setUserId(userId: number) {
    localStorage.setItem('userId', userId.toString()); // ✅ persist it
    this.userIdSubject.next(userId);
  }
  
  getUserId(): number | null {
    const stored = localStorage.getItem('userId');
    if (stored) {
      const id = parseInt(stored, 10);
      this.userIdSubject.next(id); // optional, to update the BehaviorSubject too
      return id;
    }
    return null;
  }
  
  
  register(userName: string, email: string, password: string):Observable<AuthResponse>{
   const user: UserRegister = {userName,email,password};
   return this.http.post<AuthResponse>(`${environment.backendBaseUrl}/api/users/register`, user,{
     withCredentials:true
   });
  }

  sendResetLink(email: string):Observable<ResetPasswordResponse>{
  return this.http.post<ResetPasswordResponse>("https://localhost:7284/api/users/password-reset/request", {email})
  }

  resetPassword( ResetPassword: ResetPassword, token:string):Observable<ResetPasswordResponse>{
    // const tokenurl = `https://localhost:7284/api/users/reset-password?token=${token}`;  // Get token from localStorage
   
  return this.http.post<ResetPasswordResponse>(`${environment.backendBaseUrl}/api/users/reset-password?token=${token}`, ResetPassword)
  }



}



