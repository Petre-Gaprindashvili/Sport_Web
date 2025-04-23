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
forgotForm!: FormGroup;
showErrors = false;
message = '';
isRequestInProgress = false; // Flag to track if the request is in progress
isResetLinkSent = false;  // Track if the reset link was already sent



constructor(private httpClient: HttpClient, private fb: FormBuilder, private authservice: AuthService){}
ngOnInit(): void {
// Initialize the form in ngOnInit lifecycle hook
this.forgotForm = this.fb.group({
email: ['', [Validators.required, Validators.email]],
})
}


get email(){
  return this.forgotForm.get('email');
}

onSubmit(){
  this.showErrors = true;

  console.log('Form submitted'); // Add this to see if the method is triggered

// Handle form submission
if(this.forgotForm.invalid)return;
const email = this.email?.value
if (!email) {
  console.warn('Email is empty');
  return;
}
    
this.authservice.sendResetLink(email).subscribe({
  next: (response) => {
    if (response.isSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'Reset link sent',
        text: 'Please check your inbox.',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      // Swal.fire({
      //   icon: 'info',
      //   title: 'Link Already Sent',
      //   text: response.message,
      //   confirmButtonText: 'OK'
      // });
    }

    this.isRequestInProgress = false;
  },
  error: () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Something went wrong. Please try again later.',
      confirmButtonText: 'OK'
    });
    this.isRequestInProgress = false;
  }
});

};


}




