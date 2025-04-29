import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;  // Holds the form group for the forgot password form
  showErrors = false;  // Flag to indicate if validation errors should be shown
  message = '';  // Stores any error or success messages to be displayed
  isRequestInProgress = false;  // Flag to track if the reset link request is in progress
  isResetLinkSent = false;  // Flag to track if the reset link was already sent

  constructor(
    private httpClient: HttpClient,  // Injects HttpClient for making HTTP requests
    private fb: FormBuilder,  // Injects FormBuilder to handle form creation
    private authservice: AuthService  // Injects AuthService for authentication services
  ) {}

  ngOnInit(): void {
    // Initialize the forgotForm FormGroup with email validation
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email field with required and email format validation
    });
  }

  // Getter for accessing the email form control
  get email() {
    return this.forgotForm.get('email');
  }

  // Handles the form submission
  onSubmit() {
    this.showErrors = true;  // Show validation errors when the form is submitted

    console.log('Form submitted');  // Logs to see if the submit method is triggered

    // If the form is invalid, return early
    if (this.forgotForm.invalid) return;

    const email = this.email?.value;  // Get the email entered in the form
    if (!email) {
      console.warn('Email is empty');  // If email is empty, log a warning
      return;
    }

    // Call the sendResetLink method from AuthService to request the reset link
    this.authservice.sendResetLink(email).subscribe({
      next: (response) => {
        // If the response indicates success, show a success message
        if (response.isSuccess) {
          Swal.fire({
            icon: 'success',
            title: 'Reset link sent',
            text: 'Please check your inbox.',
            timer: 2000,  // Show for 2 seconds
            showConfirmButton: false  // No confirm button, just a timer
          });
        } else {
          // Optionally handle case where the link is already sent (commented out in the code)
          // Swal.fire({
          //   icon: 'info',
          //   title: 'Link Already Sent',
          //   text: response.message,
          //   confirmButtonText: 'OK'
          // });
        }

        this.isRequestInProgress = false;  // Reset the request progress flag
      },
      error: () => {
        // If there is an error in the request, show an error message
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong. Please try again later.',
          confirmButtonText: 'OK'
        });
        this.isRequestInProgress = false;  // Reset the request progress flag
      }
    });
  }
}
