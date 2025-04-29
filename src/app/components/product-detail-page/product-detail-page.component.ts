import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, CartDto, cartItem } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { CartManagementServiceService } from 'src/app/services/cart-management-service.service';
import { TeamsManagementService } from 'src/app/services/teams-management.service';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  productId: number | null = null;  // Store product ID from URL
  product: Product | null = null;   // Store product details fetched from the server
  isStockAvailable: boolean = true; // Flag to check if stock is available for the product

  constructor(
    private authservice: AuthService,   // Auth service for user management
    private route: ActivatedRoute,      // ActivatedRoute to fetch route parameters
    private cartmanagementservice: CartManagementServiceService,  // Service to handle cart management
    private teamsmanagementservice: TeamsManagementService  // Service to fetch product details
  ) {}

  ngOnInit(): void {
    // Get product ID from URL parameters
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    if (this.productId) {
      // Fetch product details based on product ID
      this.teamsmanagementservice.getSingleProduct(this.productId).subscribe(product => {
        this.product = product;  // Assign the product details to the 'product' variable
      });
    }
  }

  // Helper method to create the basic structure for cart items
  private buildCartBase(product: Product) {
    return {
      productId: product.id,
      quantity: 1,
      price: product.price,
      totalPrice: product.price,
      product: product
    };
  }

  // Method to add product to cart
  addTocart(product: Product): void {
    const userId = this.authservice.getUserId();  // Get logged-in user's ID
    const base = this.buildCartBase(product); // Build basic cart item structure
    const existingItem = this.cartmanagementservice.cartItems.find(item => {
      return item.productId == product.id;  // Check if the item is already in the cart
    });
    const currentQuantity = existingItem ? existingItem.quantity : 0;  // Get current quantity of product in cart

    // Check if the quantity exceeds available stock
    if (currentQuantity + 1 > product.stock) {
      this.isStockAvailable = false;  // Set stock availability to false if quantity exceeds stock
      return;
    } else {
      this.isStockAvailable = true;  // Set stock availability to true if quantity is within stock
    }

    // Add the item to the cart if user is logged in
    if (userId) {
      const cartDto: CartDto = {
        userId: userId,
        ...base  // Spread the basic cart data
      };
      this.cartmanagementservice.addToCart(cartDto).subscribe(() => {
        this.cartmanagementservice.updateCartState(userId);  // Update cart state after adding item
        this.cartmanagementservice.getCartItemCount();  // Update cart item count
      });
    } else {
      // For guest users, create a guest cart item
      const guestCartItem: cartItem = {
        ...base,
        productName: product.name,
        imgUrl: product.imageUrl,
        stock: product.stock,
        id: product.id,
      };
      this.cartmanagementservice.addToGuestCart(guestCartItem);  // Add item to guest cart
    }
  }

  // Method to generate a unique ID (not currently used in the code, but might be useful for other purposes)
  generateUniqueId(): number {
    return Math.floor(Math.random() * Date.now());  // Generate a unique ID based on current timestamp
  }
}
