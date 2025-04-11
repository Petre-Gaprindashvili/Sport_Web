import { CategoriesManagementService } from 'src/app/services/categories-management.service';
import { Category } from 'src/app/interfaces/category';
import { Subcategory } from 'src/app/interfaces/subCategory';
import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Router } from '@angular/router';




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
//  categ: number = 98;
// teams: any[] = [];
  constructor(public categoriesmanagementservice:CategoriesManagementService, private rote:Router){}


  

ngOnInit(): void {

  this.categoriesmanagementservice.getCategories().subscribe(data=>{
    this.categories = data
  })
  // this.categoriesmanagementservice.getAllTeams(this.categ).subscribe(temas=>{
  //   this.teams = temas;
  //   console.log(temas)
  // })

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

// goToSubcategory(id: number) {
//   console.log('Navigating to subcategory with ID:', id);

//   this.rote.navigate(['/subcategory-detail-page', id]);
// }


}




