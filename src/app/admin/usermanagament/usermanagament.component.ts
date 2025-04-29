

import { Component, OnInit } from '@angular/core';
import { getUsers } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usermanagament',
  templateUrl: './usermanagament.component.html',
  styleUrls: ['./usermanagament.component.css']
})
export class UsermanagamentComponent implements OnInit {
  users: getUsers[] = [];  // Array to hold all users fetched from the backend
  inputUserId: number | null = null;  // User ID entered by the admin to perform actions
  singleUser: getUsers | null = null;  // To hold the details of a single user when fetched
  newRole: string = '';  // The new role to assign to the selected user
  showRoleChange: boolean = false;  // Flag to toggle visibility of role change input

  // Constructor to inject the AuthService for backend calls
  constructor(private authservice: AuthService) {}

  // ngOnInit lifecycle hook to fetch all users when the component is initialized
  ngOnInit(): void {
    // Fetch all users from the backend
    this.authservice.getAllUser().subscribe(user => {
      this.users = user;  // Assign the fetched users to the 'users' array
    });
  }

  // Function to get the details of a single user by their ID
  getSingleUser(): void {
    if (!this.inputUserId) {
      // Show an alert if no user ID is entered
      Swal.fire("Please enter a User ID to fetch!");
      return;
    }
    // Fetch the user details using the inputted user ID
    this.authservice.getSingleUser(this.inputUserId).subscribe(response => {
      this.singleUser = response;  // Assign the fetched user details to 'singleUser'
      this.showRoleChange = false;  // Ensure that the role change input is hidden initially
    });
  }

  // Function to change the role of the selected user
  changeUserRole():void{
      if(this.newRole && this.singleUser){
        this.authservice.changeUserRole(this.singleUser.userId, this.newRole).subscribe((success)=>{
          if(success){
            this.singleUser?.role == this.newRole;
            this.newRole = '';
            this.showRoleChange = false;
          } else{
            alert("");
          }
        })
      }
    }
  // Function to show the role change input field
  showRoleInput(): void {
    this.showRoleChange = true;  // Set flag to show the role change input field
  }

  // Function to close the user details info box
  closeUserInfo(): void {
    this.singleUser = null;  // Clear the user details
    this.showRoleChange = false;  // Hide the role change input
  }

  // Function to deactivate the user account
  deactivateUser(): void {
    if (!this.inputUserId) {
      // Show an alert if no user ID is entered
      Swal.fire("Please enter a User ID to fetch!");
      return;
    }
    // Deactivate the user using the inputted user ID
    this.authservice.deactivateUser(this.inputUserId).subscribe(response => {
      if (response) {
        // Show success message if deactivation is successful
        Swal.fire("User deactivated successfully!");
        
        // Update the user's status and role locally
        if (this.singleUser) {
          this.singleUser.isActive = false;  // Set the user as inactive
          this.singleUser.role = 'Deactivated';  // Update the user's role to 'Deactivated'
        }
      } else {
        // Show failure message if deactivation fails
        Swal.fire("Failed to deactivate the user.");
      }
    });
  }

  // Function to reactivate the user account
  reactivateUser(): void {
    if (!this.inputUserId) {
      // Show an alert if no user ID is entered
      Swal.fire("Please enter a User ID to fetch!");
      return;
    }
    // Reactivate the user using the inputted user ID
    this.authservice.reactivateUser(this.inputUserId).subscribe(response => {
      if (response) {
        // Show success message if reactivation is successful
        Swal.fire("User reactivated successfully!");

        // Update the user's status and role locally
        if (this.singleUser) {
          this.singleUser.isActive = true;  // Set the user as active
          this.singleUser.role = 'Reactivated';  // Update the user's role to 'Reactivated'
        }
      } else {
        // Show failure message if reactivation fails
        Swal.fire("Failed to reactivate the user.");
      }
    });
  }

  // Function to delete the user account
  deleteUser(): void {
    if (!this.inputUserId) {
      // Show an alert if no user ID is entered
      Swal.fire("Please enter a User ID to fetch!");
      return;
    }
    // Delete the user using the inputted user ID
    this.authservice.deleteUser(this.inputUserId).subscribe(response => {
      if (response) {
        // Show success message if deletion is successful
        Swal.fire("User deleted successfully!");
      } else {
        // Show failure message if deletion fails
        Swal.fire("Failed to delete the user.");
      }
    });
  }
}





// changeUserRole():void{
//   if(this.newRole && this.singleUser){
//     this.authservice.changeUserRole(this.singleUser.userId, this.newRole).subscribe((success)=>{
//       if(success){
//         this.singleUser?.role == this.newRole;
//         this.newRole = '';
//         this.showRoleChange = false;
//       } else{
//         alert("");
//       }
//     })
//   }
//   }zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz