import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/interfaces/tabs';
import { ActivatedRoute } from '@angular/router';
import { CategoriesManagementService } from 'src/app/services/categories-management.service';
import { teams } from 'src/app/interfaces/teams';
import { News } from 'src/app/interfaces/news';
import { Subcategory } from 'src/app/interfaces/subCategory';
import { matches } from 'src/app/interfaces/matches';

@Component({
  selector: 'app-subcategory-detail-page',
  templateUrl: './subcategory-detail-page.component.html',
  styleUrls: ['./subcategory-detail-page.component.css']
})

export class SubcategoryDetailPageComponent implements OnInit {
  isVideoLoaded = false;

  subcategoryId: number | null = null;  // Main subcategory ID (from URL)
  tabs: Tab[] = [];  // List of tabs
  activeTab: string = 'Home';  // Default active tab
  home:News[]= [];      // Number of news to show each time
  teams: teams[] = [];  // Teams data for the 'AllTeams' tab
   results: matches[] = [];
  upcomingMatches: matches[] = [];
  pastMatches: matches[] = [];
  news:  News[] = [];
  visibleNews: News[] = [];      // News currently shown
  newsToShow: number =  4;  
  subcategory: any = {};  // Store single subcategory object
  // homeContent: string = "Welcome to the Home tab!";
  constructor( private route: ActivatedRoute, private categoriemanagementservice: CategoriesManagementService) {}

  ngOnInit(): void {
    this.subcategoryId = +this.route.snapshot.paramMap.get('id')!; 
    this.loadSubcategory();
    this.loadTabsAndContent();
    
  }


  loadSubcategory():void{
  if(this.subcategoryId){
   this.categoriemanagementservice.getSingleSubcategory(this.subcategoryId).subscribe(subcat=>{
    this.subcategory = subcat

   })
  }
  }

  loadTabsAndContent(): void {
    if (this.subcategoryId) {
      this.categoriemanagementservice.getTabsForSubCategory(this.subcategoryId).subscribe(tabs => {
        this.tabs = tabs;  // Store the tabs
        this.loadContentForTab(this.activeTab);  
        console.log(tabs)// Load content for the active tab
      
      });
    }
  }

  loadContentForTab(tab: string): void {
    this.activeTab = tab;  // Set the active tab
    if (this.subcategoryId) {
      const selectedTab = this.tabs.find(t => t.sectionName === tab);  // Find the tab by name
      const categoryIdForContent = selectedTab ? selectedTab.categoryId : this.subcategoryId;  // Get the content's correct categoryId
       if(tab === 'Home'){
        this.categoriemanagementservice.getNews(categoryIdForContent).subscribe(home =>{
          this.home = home;
        })
       }
       if (tab === 'AllTeams') {
        this.categoriemanagementservice.getAllTeams(categoryIdForContent).subscribe(teams => {
          this.teams = teams;
        });
       }
       if(tab === 'Results'){
        this.categoriemanagementservice.getMatches(categoryIdForContent).subscribe(matches=>{
          // this.results = matches
          const now = new Date();
          this.upcomingMatches = matches.filter(m => new Date(m.matchDate) > now);

          this.pastMatches = matches.filter(m => new Date(m.matchDate) <= now);        
        })
       }
       if(tab === 'News'){
        this.categoriemanagementservice.getNews(categoryIdForContent).subscribe(news =>{
          this.news = news;
          this.visibleNews = this.news.slice(0,this.newsToShow);
        })
       }
       if(tab === 'Videos'){
        this.categoriemanagementservice.getVideoNews(categoryIdForContent).subscribe(video=>{
          this.news = video;
          console.log(video)
        })
       }
    }
  }
  loadMoreNews(): void {
    this.newsToShow += 5;
    this.visibleNews = this.news.slice(0, this.newsToShow);
  }

  onTabChange(tab: string): void {
    this.loadContentForTab(tab);  // Load content when tab changes
  }


  getEmbedUrl(videoUrl: string): string {
    let videoId = '';
  
    if (videoUrl.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(videoUrl.split('?')[1]);
      videoId = urlParams.get('v') || '';
    } else if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
    }
  
    // This hides the title and YouTube branding as much as allowed
    return `https://www.youtube.com/embed/${videoId}?modestbranding=1&showinfo=0&rel=0`;
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

