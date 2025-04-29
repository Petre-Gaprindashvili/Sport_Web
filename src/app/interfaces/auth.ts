// user-login.interface.ts
export interface UserLogin {
    email: string;
    password: string;
  }
  
  // user-register.interface.ts
  export interface UserRegister {
    userName: string;
    email: string;
    password: string;
  }

export interface AuthResponse{
    isSuccess: boolean;
    message: string;
    role?: string; // 'admin' or '' (empty string) for regular users
    userId:number

}

//password-reset-request
export interface ResetPasswordResponse {
  message: string;
  isSuccess: boolean;
}
//reset-password
export interface ResetPassword{
  newPassword: string;
  confirmPassword: string;
}

//for admin only
export interface getUsers{
  userId:number
  userName:string;
  email: string;
  role?: string; // 'admin' or '' (empty string) for regular users
  isActive:boolean;
}

