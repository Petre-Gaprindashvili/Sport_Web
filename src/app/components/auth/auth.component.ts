import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartManagementServiceService } from 'src/app/services/cart-management-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;  // Flag to determine if the user is in login or registration mode
  authForm!: FormGroup;  // Reactive form for authentication
  message: string = '';  // Message to show success or error messages
  showErrors = false;  // Flag to show form validation errors
  userid: number | null = null;  // User ID can be null if not logged in

  constructor(
    private fb: FormBuilder,  // FormBuilder to create the form
    private router: Router,  // Router to navigate between routes
    private route: ActivatedRoute,  // ActivatedRoute to access query parameters
    private authService: AuthService,  // AuthService to handle authentication
    private cartservice: CartManagementServiceService  // Cart service to handle cart actions
  ) {}

  ngOnInit() {
    // Check the query params to set the mode (login or register)
    this.route.queryParams.subscribe(param => {
      const modeParam = param['mode'];
      this.isLoginMode = modeParam !== 'register';  // Login if mode is not 'register'
    });

    // Initialize the form with validation
    this.authForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],  // Username (only for register)
      email: ['', [Validators.required, Validators.email]],  // Email (both for login and register)
      password: ['', [Validators.required, Validators.minLength(6)]]  // Password (both for login and register)
    });
  }

  // Toggle between login and registration modes
  toggleMode() {
    const mode = this.isLoginMode ? 'register' : 'login';  // Switch the mode
    this.showErrors = false;  // Hide error messages when toggling
    this.authForm.reset();  // Reset the form
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { mode },  // Pass the new mode as a query param
      queryParamsHandling: 'merge'  // Merge other query parameters (if any)
    });
  }

  // Handle form submission for login or registration
  onSubmit() {
    this.showErrors = true;  // Show error messages after submission

    // Validate the form before proceeding
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

    const { userName, email, password } = this.authForm.value;  // Extract form values

    // If in login mode, call the login service
    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) {
            // On successful login, set the user ID and sync guest cart to server
            this.message = 'Login successful!';
            this.authService.setUserId(response.userId);
            this.cartservice.syncGuestCartToServer(response.userId);
            // Navigate to the appropriate role page (Admin or user)
            this.router.navigate([response.role === 'Admin' ? '/admin' : '/']);
          } else {
            this.message = response.message;
            alert("Login for added cart");
          }
        },
        error: () => this.message = 'Login failed. Server error.'
      });
    } else {
      // If in register mode, call the register service
      this.authService.register(userName, email, password).subscribe({
        next: (response) => {
          console.log('Registration Response:', response);
          if (response.isSuccess) {
            this.message = 'Registration successful. Please login.';
            this.isLoginMode = true;  // Switch to login mode after successful registration
          } else {
            this.message = response.message;
          }
        },
        error: () => this.message = 'Registration failed. Server error.'
      });
    }
  }

  // (Optional) Add item to cart (commented out for now)
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
