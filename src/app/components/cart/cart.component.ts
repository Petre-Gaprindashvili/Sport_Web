import { Component, OnInit } from '@angular/core';
import { CartManagementServiceService } from 'src/app/services/cart-management-service.service';
import { cartItem, CartDto, upCartDto } from 'src/app/interfaces/cart';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: cartItem[] = [];  // Holds the items in the cart
  isLoggedIn: boolean = false;  // Flag to check if the user is logged in
  userId: number | null = null;  // Stores the user's ID
  isStockAvailable: boolean = true;  // Flag to check if stock is available
  cartIsEmpty: boolean = false;  // Default: cart is not empty

  constructor(private autservice: AuthService, private cartService: CartManagementServiceService) {}

  ngOnInit(): void {
    const userId = this.autservice.getUserId();  // Get the user ID from AuthService

    if (userId) {
      this.isLoggedIn = true;  // User is logged in
      this.userId = userId;
      this.cartService.clearGuestCart();  // Clears any guest cart if user is logged in
      this.cartService.updateCartState(userId);  // Update the cart state for the logged-in user

      // Subscribe to cart updates and load cart items
      this.cartService.getCartUpdates().subscribe(cart => {
        if (cart) {
          this.cartItems = cart.items || [];  // Load cart items if they exist
        }
      });
    } else {
      this.loadGuestCart();  // Load guest cart if user is not logged in
    }
  }

  // Load cart items for guests (non-logged-in users)
  loadGuestCart(): void {
    this.cartItems = this.cartService.getGuestCartItems();
  }

  // Update the quantity of a specific cart item
  updateQuantity(item: cartItem, change: number): void {
    const newQuantity = item.quantity + change;

    // Prevent quantity from going below 1
    if (newQuantity < 1) return;
    
    // Check if stock is available
    if (newQuantity > item.stock) {
      this.isStockAvailable = false;
      return;
    } else {
      this.isStockAvailable = true;
    }

    item.quantity = newQuantity;  // Update the quantity of the item

    // If the user is logged in, update the cart on the server
    if (this.isLoggedIn && this.userId !== null) {
      const dto: upCartDto = {
        userId: this.userId,
        productId: item.productId,
        NewQuantity: newQuantity
      };
      this.cartService.updateCartItemQuantity(dto).subscribe(() => {
        this.cartService.updateCartState(this.userId!);  // Update cart state after change
      });
    } else {
      this.cartService.saveGuestCart();  // Save guest cart to local storage
      this.loadGuestCart();  // Reload guest cart
    }
  }

  // Increase quantity of the item
  increaseQuantity(item: cartItem): void {
    this.updateQuantity(item, 1);
  }

  // Decrease quantity of the item
  decreaseQuantity(item: cartItem): void {
    this.updateQuantity(item, -1);
  }

  // Remove an item from the cart
  removeItem(item: cartItem) {
    this.cartService.removeFromCart(item.productId).subscribe(() => {
      this.cartService.updateCartState(this.userId!);  // Update cart state after removal
    });
  }

  // Calculate the total price of the items in the cart
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Checkout function, only allows checkout if the user is logged in
  checkOut(userId: number): void {
    if (userId === null) {
      Swal.fire({
        icon: 'error',
        title: 'User ID is missing.',
        text: 'Please ensure you are logged in!'
      });
      return;
    }

    // Call the checkout service to complete the checkout process
    this.cartService.checKout(userId).subscribe({
      next: (response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Checkout successful!",
          showConfirmButton: false,
          timer: 1500  // Display for 1.5 seconds
        });
        this.cartService.clearCart();  // Clear the cart after checkout
        this.ngOnInit();  // Re-initialize the component to refresh cart
      },
      // Optionally handle errors here if needed
      // error: (error) => {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Something went wrong with checkout. Please try again!'
      //   });
      // }
    });
  }
}
