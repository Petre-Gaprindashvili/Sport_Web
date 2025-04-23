import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cart, CartDto, cartItem, upCartDto } from '../interfaces/cart';
import { BehaviorSubject } from 'rxjs';
import { TitleStrategy } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CartManagementServiceService {
  cartItems:cartItem[] = [];
  private cartSubject = new BehaviorSubject<cart | null>(null);
  // cartItemCount
  private cartItemCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartItemCount.asObservable();


  constructor(private http:HttpClient) {}

  getCartByUserId(userId:number):Observable<cart>{
  return this.http.get<cart>(`${environment.backendBaseUrl}/api/carts/GetCart${userId}`)
  }

  addToCart(cartdto:CartDto):Observable<cart> {
  
  return this.http.post<cart>(`${environment.backendBaseUrl}/api/carts/addTocart`, cartdto)
  
  }
  updateCartState(userId: number): void {
    this.getCartByUserId(userId).subscribe(cart => {
      this.cartItems = cart.items || []; 
      this.cartSubject.next(cart); // Push new cart to subscribers
      this.getCartItemCount();
    });
  }
  getCartUpdates(): Observable<cart | null> {
    return this.cartSubject.asObservable();
  }

  // updateCart
  updateCartItemQuantity(cartdto:upCartDto):Observable<any>{
  return this.http.put("https://localhost:7284/api/carts/updateCart", cartdto)

  }

  getCartItemCount():void {
    const totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
  this.cartItemCount.next(totalQuantity); 
}

// incrementCartCount():void {
//   const current = this.cartItemCount.value;
//   this.cartItemCount.next(current + 1);
// }

}


