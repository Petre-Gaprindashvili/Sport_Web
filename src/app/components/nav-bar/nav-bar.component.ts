import { CategoriesManagementService } from 'src/app/services/categories-management.service';
import { Category } from 'src/app/interfaces/category';
import { Subcategory } from 'src/app/interfaces/subCategory';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CartManagementServiceService } from 'src/app/services/cart-management-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  selectedCategoryName: string = '';  // Stores the name of the category that is hovered over
  categories: Category[] = [];  // Stores the list of all categories
  subCategories: Subcategory[] = [];  // Stores the subcategories of the hovered category
  hoverTimeout: any;  // Stores the timeout ID for hover effects
  showCartIcon: boolean = false;  // Flag to control the visibility of the cart icon (not in use in this code)
  cartItemCount: number = 0;  // Stores the count of items in the cart

  constructor(
    public authservice: AuthService,  // Injects AuthService for managing authentication
    public router: Router,  // Injects Router for navigation
    public categoriesmanagementservice: CategoriesManagementService,  // Injects CategoriesManagementService for categories and subcategories
    private cartservice: CartManagementServiceService  // Injects CartManagementService for cart management
  ) {}

  ngOnInit(): void {
    // Fetches the categories from CategoriesManagementService
    this.categoriesmanagementservice.getCategories().subscribe(data => {
      this.categories = data;  // Assigns the fetched categories to the categories array
    });

    // Subscribes to the cartCount$ observable to update the cart item count
    this.cartservice.cartCount$.subscribe(count => {
      this.cartItemCount = count;  // Updates the cart item count
    });

    // Checks if the user is logged in by calling getUserId() from AuthService
    const userId = this.authservice.getUserId();
    if (userId) {
      this.cartservice.updateCartState(userId);  // If user is logged in, updates the cart state
    }
  }

  // Triggered when a category is hovered over
  onCategoryHover(cat: any): void {
    this.selectedCategoryName = cat.name;  // Sets the name of the category being hovered
    // Fetches the subcategories of the hovered category from CategoriesManagementService
    this.categoriesmanagementservice.getAllSubcategories(cat.id).subscribe(data => {
      this.subCategories = data.subCategories;  // Assigns the fetched subcategories to subCategories
      console.log(data);  // Logs the fetched data for debugging (optional)
    });

    // Clears any previous hover timeout to prevent early hiding of subcategories
    clearTimeout(this.hoverTimeout);
  }

  // Triggered when the hover zone is entered (to clear any existing timeout)
  onCategoryHoverZoneEnter(): void {
    clearTimeout(this.hoverTimeout);  // Clears the timeout to prevent subcategories from hiding prematurely
  }

  // Triggered when the category hover is left (to hide subcategories with a delay)
  onCategoryLeave(): void {
    // Adds a delay before hiding subcategories, allowing the user to move the mouse to the subcategories area
    this.hoverTimeout = setTimeout(() => {
      this.subCategories = [];  // Clears the subcategories after the delay
      this.selectedCategoryName = '';  // Clears the selected category name
    }, 200);  // 200ms delay before hiding
  }
}
