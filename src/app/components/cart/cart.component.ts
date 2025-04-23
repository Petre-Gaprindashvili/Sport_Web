import { Component, OnInit } from '@angular/core';
import { cart, CartDto, upCartDto } from 'src/app/interfaces/cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartManagementServiceService } from 'src/app/services/cart-management-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: cart | null = null;
  userId!: number;

  constructor(
    private cartService: CartManagementServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userId = userId; // ✅ Correct assignment
    } else {
      console.log("User ID not found");
    }
    this.reloadCart();
    console.log(userId)
    console.log(this.cart)
  }

  reloadCart(): void {
    if (this.userId) {
      console.log('Fetching cart for user ID:', this.userId);
      this.cartService.getCartByUserId(this.userId).subscribe({
        next: (cart) => {
          console.log('Response from API:', cart);
          this.cart = cart;
        },
        error: (err) => {
          console.error('Error fetching cart:', err);
        }
      });
    } else {
      console.log("User ID is undefined in reloadCart");
    }
  }

  updateQuantity( productId:number, quantity:number):void{
  // if(quantity < 1){
  //   return;
  // }
  const CartDto: upCartDto = {
  userId: this.userId,
  productId: productId,
   NewQuantity: quantity
  }
  console.log('CartDto:', CartDto);  // Log the DTO to see the structure

  
  this.cartService.updateCartItemQuantity(CartDto).subscribe({
    next: () => {
      console.log('Cart updated successfully');
      this.reloadCart(); // Reload the cart after updating the quantity
    },
    error: (err) => {
      console.error('Error updating cart:', err);
    }
  });

  
}

increaseQuantity(item: any): void {
  item.quantity++;
  this.updateQuantity(item.productId, item.quantity);
}

decreaseQuantity(item: any): void {
  if (item.quantity > 1) {
    item.quantity--;
    this.updateQuantity(item.productId, item.quantity);
  }

  }
}




