import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  message: string = '';
  showErrors = false;
  isSuccess: boolean = false;
  token: string = ''; // for URL token


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authservice: AuthService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Read token from URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      // if (!this.token) {
      //   this.message = 'Token is missing or expired. Please request a new password reset link.';
      // }
    });
  }

  resetPassword(): void {
    this.showErrors = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    const resetPasswordData = this.resetPasswordForm.value;
    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      this.message = 'Password and confirmation password do not match.';
      return;
    }

    if (!this.token) {
      this.message = 'Token is missing.';
      return;
    }

    this.authservice.resetPassword(resetPasswordData, this.token).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.isSuccess = true;
          this.message = response.message;
          setTimeout(() => this.router.navigate(['/login']), 2000);
        } else {
          this.message = response.message;
        }
      },
      error: () => {
        this.message = 'There was an error resetting your password. Please try again later.';
      }
    });

  }
}

