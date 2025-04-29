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
  resetPasswordForm!: FormGroup;  // FormGroup for managing the reset password form
  message: string = '';  // To store success/error messages
  showErrors = false;  // Flag to show error messages when the form is submitted
  isSuccess: boolean = false;  // Flag to indicate if the password reset was successful
  token: string = ''; // For storing the token passed in the URL

  constructor(
    private router: Router,  // Router to navigate between pages
    private fb: FormBuilder,  // FormBuilder to create a reactive form
    private authservice: AuthService,  // AuthService for handling password reset API calls
    private route: ActivatedRoute  // ActivatedRoute to access route parameters
  ) {}

  ngOnInit(): void {
    // Initialize the form with password and confirm password fields
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],  // Password field with validation
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]  // Confirm password field with validation
    });

    // Read the token from the URL query parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];  // Get the 'token' query parameter
      // Optionally handle the case where token is missing (commented out)
      // if (!this.token) {
      //   this.message = 'Token is missing or expired. Please request a new password reset link.';
      // }
    });
  }

  resetPassword(): void {
    this.showErrors = true;  // Show error messages when trying to submit the form
    if (this.resetPasswordForm.invalid) {
      return;  // If the form is invalid, don't proceed with the reset
    }

    const resetPasswordData = this.resetPasswordForm.value;  // Get the form data
    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      this.message = 'Password and confirmation password do not match.';  // Show error if passwords don't match
      return;
    }

    if (!this.token) {
      this.message = 'Token is missing.';  // Show error if token is missing
      return;
    }

    // Call the AuthService to reset the password using the token and new passwords
    this.authservice.resetPassword(resetPasswordData, this.token).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.isSuccess = true;  // If successful, update success flag
          this.message = response.message;  // Show success message
          setTimeout(() => this.router.navigate(['/login']), 2000);  // Redirect to login after 2 seconds
        } else {
          this.message = response.message;  // Show error message if reset fails
        }
      },
      error: () => {
        this.message = 'There was an error resetting your password. Please try again later.';  // Show generic error message if request fails
      }
    });
  }
}
