import { CategoriesManagementService } from 'src/app/services/categories-management.service';
import { Category } from 'src/app/interfaces/category';
import { Subcategory } from 'src/app/interfaces/subCategory';
import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { CartManagementServiceService } from 'src/app/services/cart-management-service.service';
import { AuthService } from 'src/app/services/auth.service';





@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  selectedCategoryName: string = '';
  categories: Category[] = [];
  subCategories: Subcategory[] = [];
  hoverTimeout: any;
  showCartIcon: boolean = false;
  cartItemCount:number = 0; 
  constructor(public authservice:AuthService, public router: Router, public categoriesmanagementservice:CategoriesManagementService, private cartservice: CartManagementServiceService){}
ngOnInit(): void {

  this.categoriesmanagementservice.getCategories().subscribe(data=>{
    this.categories = data
  })

   this.cartservice.cartCount$.subscribe(count=>{
    this.cartItemCount = count
  })
  const userId = this.authservice.getUserId();
  if (userId) {
    this.cartservice.updateCartState(userId);
  }
}

onCategoryHover(cat: any): void {
  this.selectedCategoryName = cat.name;
  this.categoriesmanagementservice.getAllSubcategories(cat.id).subscribe(data => {
    this.subCategories = data.subCategories;
    console.log(data)
    this.subCategories
  });

  clearTimeout(this.hoverTimeout)
}
  onCategoryHoverZoneEnter(): void {
   clearTimeout(this.hoverTimeout);  
}

onCategoryLeave(): void {
  // Add a delay before hiding to allow user to move to subcategories area
  this.hoverTimeout = setTimeout(() => {
    this.subCategories = [];
    this.selectedCategoryName = '';
  }, 200); // Delay in ms
}


}




