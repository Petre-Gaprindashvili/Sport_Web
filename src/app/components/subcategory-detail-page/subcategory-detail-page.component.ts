// Angular core imports
import { Component, OnInit } from '@angular/core'; // Needed for component declaration and lifecycle management

// Interface for tabs
import { Tab } from 'src/app/interfaces/tabs'; // Interface for tabs

// Angular routing imports
import { ActivatedRoute } from '@angular/router'; // For accessing route parameters (subcategory ID)

// Services
import { CategoriesManagementService } from 'src/app/services/categories-management.service'; // Service to fetch category data

// Interfaces for team, news, subcategory, and match data
import { teams } from 'src/app/interfaces/teams'; // Interface for teams
import { News } from 'src/app/interfaces/news'; // Interface for news articles
import { Subcategory } from 'src/app/interfaces/subCategory'; // Interface for subcategories
import { matches } from 'src/app/interfaces/matches'; // Interface for match data

// Helper service for video handling
import { VideoHelperService } from '../shared/video-helper'; // Service for video URL processing

@Component({
  selector: 'app-subcategory-detail-page', // Component selector
  templateUrl: './subcategory-detail-page.component.html', // Path to the HTML template
  styleUrls: ['./subcategory-detail-page.component.css'] // Path to the CSS file
})

export class SubcategoryDetailPageComponent implements OnInit {

  // Properties
  isVideoLoaded = false; // Flag to check if video is loaded

  subcategoryId: number | null = null;  // Main subcategory ID from the URL
  tabs: Tab[] = [];  // Array of tab objects
  activeTab: string = 'Home';  // Default active tab
  home: News[] = [];  // News array to hold home content
  teams: teams[] = [];  // Array to hold team data for 'AllTeams' tab
  upcomingMatches: matches[] = []; // Array for upcoming matches
  pastMatches: matches[] = []; // Array for past matches
  news: News[] = []; // Array to hold all news
  visibleNews: News[] = [];  // Array to hold news that is currently displayed
  newsToShow: number = 4;  // Number of news articles to display initially
  subcategory: any = {};  // Object to hold the subcategory data

  // Constructor with dependency injection
  constructor(
    public videohelper: VideoHelperService,  // Service to handle video URLs
    private route: ActivatedRoute, // Service for accessing route parameters
    private categoriemanagementservice: CategoriesManagementService // Service to fetch category and subcategory data
  ) {}

  // Lifecycle hook to initialize the component
  ngOnInit(): void {
    this.subcategoryId = +this.route.snapshot.paramMap.get('id')!;  // Get subcategory ID from route
    this.loadSubcategory(); // Load subcategory data
    this.loadTabsAndContent(); // Load tabs and corresponding content
  }

  // Method to load the subcategory data
  loadSubcategory(): void {
    if (this.subcategoryId) {
      this.categoriemanagementservice.getSingleSubcategory(this.subcategoryId).subscribe(subcat => {
        this.subcategory = subcat;  // Store the subcategory data
      });
    }
  }

  // Method to load the tabs and content for the current subcategory
  loadTabsAndContent(): void {
    if (this.subcategoryId) {
      this.categoriemanagementservice.getTabsForSubCategory(this.subcategoryId).subscribe(tabs => {
        this.tabs = tabs;  // Store the tabs
        this.loadContentForTab(this.activeTab);  // Load content for the default active tab
        console.log(tabs); // Log tabs for debugging
      });
    }
  }

  // Method to load content based on the selected tab
  loadContentForTab(tab: string): void {
    this.activeTab = tab;  // Set the active tab
    if (this.subcategoryId) {
      const selectedTab = this.tabs.find(t => t.sectionName === tab);  // Find the tab by name
      const categoryIdForContent = selectedTab ? selectedTab.categoryId : this.subcategoryId;  // Get the correct category ID

      // Load content based on the tab selected
      if (tab === 'Home') {
        this.categoriemanagementservice.getNews(categoryIdForContent).subscribe(home => {
          this.home = home;  // Store news for the home tab
        });
      }

      if (tab === 'AllTeams') {
        this.categoriemanagementservice.getAllTeams(categoryIdForContent).subscribe(teams => {
          this.teams = teams;  // Store team data for the AllTeams tab
        });
      }

      if (tab === 'Results') {
        this.categoriemanagementservice.getMatches(categoryIdForContent).subscribe(matches => {
          // Filter matches into past and upcoming categories
          const now = new Date();
          this.upcomingMatches = matches.filter(m => new Date(m.matchDate) > now);
          this.pastMatches = matches.filter(m => new Date(m.matchDate) <= now);
        });
      }

      if (tab === 'News') {
        this.categoriemanagementservice.getNews(categoryIdForContent).subscribe(news => {
          this.news = news;  // Store all news for the News tab
          this.visibleNews = this.news.slice(0, this.newsToShow);  // Show a limited number of news articles initially
        });
      }

      if (tab === 'Videos') {
        this.categoriemanagementservice.getVideoNews(categoryIdForContent).subscribe(video => {
          this.news = video;  // Store video news
          console.log(video); // Log video news for debugging
        });
      }
    }
  }

  // Method to load more news when the user clicks 'Load More'
  loadMoreNews(): void {
    this.newsToShow += 2;  // Increase the number of news articles to show
    this.visibleNews = this.news.slice(0, this.newsToShow);  // Update the visible news
  }

  // Method to handle tab change and load corresponding content
  onTabChange(tab: string): void {
    this.loadContentForTab(tab);  // Load content when tab changes
  }

 
}
