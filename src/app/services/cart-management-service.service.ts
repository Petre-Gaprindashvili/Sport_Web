import { Injectable } from '@angular/core';  // Importing Injectable to make the service injectable
import { HttpClient } from '@angular/common/http';  // Importing HttpClient for HTTP requests
import { Observable } from 'rxjs';  // Importing Observable for asynchronous handling
import { environment } from 'src/environments/environment';  // Importing environment variables for backend URLs
import { cart, CartDto, cartItem, upCartDto } from '../interfaces/cart';  // Importing cart-related interfaces
import { BehaviorSubject } from 'rxjs';  // Importing BehaviorSubject for state management
import { TitleStrategy } from '@angular/router';  // Unused import, could be removed
import { NumberSymbol } from '@angular/common';  // Unused import, could be removed


@Injectable({
  providedIn: 'root'  // Makes the service globally available in the app
})
export class CartManagementServiceService {
  cartItems: cartItem[] = [];  // Holds the cart items (in-memory)
  private cartSubject = new BehaviorSubject<cart | null>(null);  // Holds the current cart state
  private cartItemCount = new BehaviorSubject<number>(0);  // Holds the total item count
  cartCount$ = this.cartItemCount.asObservable();  // Observable for cart item count updates

  constructor(private http: HttpClient) {
    // Ensures that the guest cart is loaded from localStorage as soon as the service is initialized
    this.loadGuestCart();
  }

  // Method to fetch the cart by a specific user ID from the backend
  getCartByUserId(userId: number): Observable<cart> {
    return this.http.get<cart>(`${environment.backendBaseUrl}/api/carts/GetCart${userId}`);
  }

  // Method to add items to the cart (Backend API call)
  addToCart(cartdto: CartDto): Observable<cart> {
    return this.http.post<cart>(`${environment.backendBaseUrl}/api/carts/addTocart`, cartdto);
  }

  // Method to update the cart state for a specific user ID by fetching from the server
  updateCartState(userId: number): void {
    this.getCartByUserId(userId).subscribe(cart => {
      this.cartItems = cart.items || [];  // Assigning the cart items
      this.cartSubject.next(cart);  // Notifying subscribers with the new cart state
      this.getCartItemCount();  // Updating the item count
    });
  }

  // Method to get cart state updates
  getCartUpdates(): Observable<cart | null> {
    return this.cartSubject.asObservable();
  }

  // Method to update the quantity of an item in the cart
  updateCartItemQuantity(cartdto: upCartDto): Observable<any> {
    return this.http.put("https://localhost:7284/api/carts/updateCart", cartdto);
  }

  // Method to calculate and update the total quantity of items in the cart
  getCartItemCount(): void {
    const totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);  // Summing up item quantities
    this.cartItemCount.next(totalQuantity);  // Updating the cart item count
  }

  // Guest Cart functionality (using localStorage)

  // Method to load the guest cart from localStorage (if it exists)
  private loadGuestCart(): void {
    const storedCart = localStorage.getItem('guestCart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);  // Loading stored cart items into memory
      this.getCartItemCount();  // Recalculating the total item count
    }
  }

  // Method to save the current guest cart to localStorage
  saveGuestCart(): void {
    localStorage.setItem('guestCart', JSON.stringify(this.cartItems));  // Saving to localStorage
    this.getCartItemCount();  // Recalculating the total item count
  }

  // Method to add an item to the guest cart (in localStorage)
  addToGuestCart(item: cartItem): void {
    const existing = this.cartItems.find(i => i.productId === item.productId);  // Check if the item already exists
    if (existing) {
      existing.quantity += item.quantity;  // If it exists, increase the quantity
    } else {
      this.cartItems.push(item);  // Otherwise, add the new item
    }
    this.saveGuestCart();  // Save the updated cart
  }

  // Method to clear the guest cart (in localStorage)
  clearGuestCart(): void {
    this.cartItems = [];  // Empty the cart in memory
    localStorage.removeItem('guestCart');  // Remove the cart from localStorage
    this.getCartItemCount();  // Update the cart item count
  }

  // Method to get items in the guest cart
  getGuestCartItems(): cartItem[] {
    return this.cartItems;
  }

  // Method to sync the guest cart to the server (if user is logged in)
  syncGuestCartToServer(userId: number): void {
    const guestCart = this.getGuestCartItems();  // Get the current guest cart items
    if (guestCart.length) {
      this.updateCartState(userId);  // If the cart is not empty, update the server cart state
      return;
    }
    guestCart.forEach(item => {
      const dto: CartDto = {
        userId,
        productId: item.productId,
        quantity: item.quantity
      };
      this.addToCart(dto).subscribe();  // Add each item to the user's cart
    });
    this.clearGuestCart();  // Clear the guest cart after syncing
    this.updateCartState(userId);  // Refresh server cart state
  }

  // Method to remove an item from the cart by its product ID
  removeFromCart(productId: number): Observable<number> {
    return this.http.delete<number>(`https://localhost:7284/api/carts/RemoveFromCart/${productId}`);
  }

  // Method to initiate checkout for a user by their ID
  checKout(userId: number): Observable<number> {
    return this.http.post<number>(`https://localhost:7284/api/carts/checkout/${userId}`, null);
  }

  // Method to clear the entire cart (in memory)
  clearCart() {
    this.cartItems = [];
  }
}
