import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/interfaces/tabs';
import { ActivatedRoute } from '@angular/router';
import { CategoriesManagementService } from 'src/app/services/categories-management.service';
import { teams } from 'src/app/interfaces/teams';
import { News } from 'src/app/interfaces/news';
import { Subcategory } from 'src/app/interfaces/subCategory';

@Component({
  selector: 'app-subcategory-detail-page',
  templateUrl: './subcategory-detail-page.component.html',
  styleUrls: ['./subcategory-detail-page.component.css']
})

export class SubcategoryDetailPageComponent implements OnInit {
  subcategoryId: number | null = null;  // Main subcategory ID (from URL)
  tabs: Tab[] = [];  // List of tabs
  activeTab: string = 'Home';  // Default active tab
  teams: teams[] = [];  // Teams data for the 'AllTeams' tab
  news:  News[] = [];
  subcategoryForHeader: any = {};  // Store single subcategory object

  // subcategoryForHeader: { subCategories: Subcategory[] } = { subCategories: [] }; // Adjusted to match the structure of the response
  homeContent: string = "Welcome to the Home tab!";  // Default content for Home tab
  // tabContent: any = {};  // Store dynamic content for other tabs

  constructor(private route: ActivatedRoute, private categoriemanagementservice: CategoriesManagementService) {}

  ngOnInit(): void {
    this.subcategoryId = +this.route.snapshot.paramMap.get('id')!; 
    this.loadSubcategoryForHeader();
    this.loadTabsAndContent();
  }

  loadSubcategoryForHeader():void{
  if(this.subcategoryId){
   this.categoriemanagementservice.getSingleSubcategory(this.subcategoryId).subscribe(subcat=>{
    this.subcategoryForHeader = subcat
    console.log(this.subcategoryForHeader)

   })
  }
  }

  loadTabsAndContent(): void {
    if (this.subcategoryId) {
      this.categoriemanagementservice.getTabsForSubCategory(this.subcategoryId).subscribe(tabs => {
        this.tabs = tabs;  // Store the tabs
        this.loadContentForTab(this.activeTab);  // Load content for the active tab
      });
    }
  }

  loadContentForTab(tab: string): void {
    this.activeTab = tab;  // Set the active tab
    if (this.subcategoryId) {
      const selectedTab = this.tabs.find(t => t.sectionName === tab);  // Find the tab by name
      const categoryIdForContent = selectedTab ? selectedTab.categoryId : this.subcategoryId;  // Get the content's correct categoryId

      console.log(`Fetching content for tab: ${tab}, categoryId: ${categoryIdForContent}`);  // Debugging: check what ID is used

      // Load the correct content for the tab
     
      if (tab === 'AllTeams') {
        console.log(`Fetching teams for category ID: ${categoryIdForContent}`);
        this.categoriemanagementservice.getAllTeams(categoryIdForContent).subscribe(teams => {
          this.teams = teams;
          console.log('Teams:', teams);
        });
      }
      if(tab === 'News'){
        this.categoriemanagementservice.getNews(categoryIdForContent).subscribe(news=>{
          this.news = news;
        })
      }
    }
  }

  onTabChange(tab: string): void {
    this.loadContentForTab(tab);  // Load content when tab changes
  }
}






// loadTabs(): void {
//   this.categoriemanagementservice.getTabsForSubCategory(this.subcategoryId).subscribe((tabs: Tab[]) => {
//     this.tabs = tabs;
//     if (tabs.length > 0) {
//       this.setActiveTab(tabs[0].sectionName);
//       console.log(tabs)
//     }
//   });
// }
// setActiveTab(tabName: string): void {
//   this.activeTab = tabName;
// }

