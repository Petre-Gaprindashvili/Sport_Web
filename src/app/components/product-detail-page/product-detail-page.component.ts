import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartDto, cartItem } from 'src/app/interfaces/cart';
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
productId:number | null = null;
product: Product | null = null; 
constructor( private authservice:AuthService, private route:ActivatedRoute, private cartmanagementservice:CartManagementServiceService, private teamsmanagementservice:TeamsManagementService){}

ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    if(this.productId){
      this.teamsmanagementservice.getSingleProduct(this.productId).subscribe(product=>{
        this.product = product
      })
   }  
   
}

addTocart(product:Product):void{
  const userId = this.authservice.getUserId();
  if(!userId){
    return;
  }
    const cartdto: CartDto = {
    userId: userId,         // Example user ID
    productId: product.id,    // Example product ID
    quantity: 1
}
console.log('Adding item to cart:', cartdto);
// this.cartmanagementservice.getUserId(38).subscribe((userId=>{
  //   console.log('Fetched User ID:', userId); // Log the user ID to ensure it's being retrieved correctly
  
  
  this.cartmanagementservice.addToCart(cartdto).subscribe(()=>{
    console.log("aded");
    // this.cartmanagementservice.getCartByUserId(29).subscribe(updateCart=>{
      //   console.log('Updated Cart:', updateCart);
      // this.cartmanagementservice.incrementCartCount();
      this.cartmanagementservice.updateCartState(userId)
      this.cartmanagementservice.getCartItemCount();
    })
    
  }
  
  // getCartItemCount(){
  //   const count = this.cartItems.reduce((sum, current)=>sum + current.quantity,0);
  //   this.cartItemCount.next(1);
  // }
  
}




