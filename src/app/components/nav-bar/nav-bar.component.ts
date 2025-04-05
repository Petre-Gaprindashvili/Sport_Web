import { CategoriesManagementService } from 'src/app/services/categories-management.service';
import { Category } from 'src/app/interfaces/category';
import { Subcategory } from 'src/app/interfaces/subCategory';
import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';

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

  constructor(public categoriesmanagementservice:CategoriesManagementService,  ){}



ngOnInit(): void {

  this.categoriesmanagementservice.getCategories().subscribe(data=>{
    this.categories = data
    console.log(data)
  })

}

onCategoryHover(cat: any): void {
  this.selectedCategoryName = cat.name;
  this.categoriesmanagementservice.getSubcategories(cat.id).subscribe(data => {
    this.subCategories = data.subCategories;
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
  }, 300); // Delay in ms
}
}



