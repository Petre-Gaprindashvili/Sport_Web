import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm!: FormGroup;
  message: string = '';
  showErrors = false;
  userid: number | null = null; // User ID can be null if not logged in

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
        const modeParam = param['mode'];
        this.isLoginMode = modeParam !== 'register'; // login if not register
      });
    

    this.authForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


  }

  toggleMode() {
    const mode = this.isLoginMode ? 'register' : 'login';
    this.showErrors = false;
    this.authForm.reset();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { mode },
      queryParamsHandling: 'merge' // Optional: keeps other query params
    });
  }

  onSubmit() {
    this.showErrors = true;
    if (this.isLoginMode) {
      if (
        this.authForm.get('email')?.invalid ||
        this.authForm.get('password')?.invalid
      ) {
      
        return;
      }
    } else {
      if (this.authForm.invalid) {

        return;
      }
    }
    const { userName, email, password } = this.authForm.value;
    
    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe({
        next: (response) => {
          // this.authService.setUserId(response.userId);
          console.log(response)
          if (response.isSuccess) {
            this.message = 'Login successful!';
            this.router.navigate([response.role === 'Admin' ? '/admin' : '/']);
          } else {
            this.message = response.message;
          }
        },
        error: () => this.message = 'Login failed. Server error.'
      });
    } else {
      this.authService.register(userName, email, password ).subscribe({
        next: (response) => {
          console.log('Registration Response:', response);
          if (response.isSuccess) {
            this.message = 'Registration successful. Please login.';
            this.isLoginMode = true;
          } else {
            this.message = response.message;
          }
        },
        error: () => this.message = 'Registration failed. Server error.'
      });
    }
  }
  // addItemToCart(item: any) {
  //   if (this.userid === null) {
  //     // If not logged in, just proceed with adding the item without setting a user ID
  //     console.log('Adding item to cart without user ID:', item);
  //   } else {
  //     // If logged in, proceed with user-specific cart actions
  //     console.log('Adding item to cart for user:', this.userid, item);
  //   }
  // }
}
