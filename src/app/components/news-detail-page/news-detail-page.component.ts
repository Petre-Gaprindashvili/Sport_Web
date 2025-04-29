import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/interfaces/news';  // Interface for the news data
import { CategoriesManagementService } from 'src/app/services/categories-management.service';  // Service for fetching categories-related news
import { TeamsManagementService } from 'src/app/services/teams-management.service';  // Service for fetching team-related news
import { VideoHelperService } from '../shared/video-helper';

@Component({
  selector: 'app-news-detail-page',
  templateUrl: './news-detail-page.component.html',
  styleUrls: ['./news-detail-page.component.css']
})
export class NewsDetailPageComponent implements OnInit {

  videoNews!: News;  // For video news data
  newsId!: number;  // ID of the selected news article
  quaryId!: number;  // Query ID to filter news by team or category
  parentCategoryName!: string;  // Name of the parent category (for filtering by category)
  news: any;  // Store the news article

  constructor(
    public videohelper:VideoHelperService,
    private route: ActivatedRoute,  // To get route parameters
    private teamservice: TeamsManagementService,  // Service to get team-specific news
    private categoriesservice: CategoriesManagementService  // Service to get category-based news
  ) {}

  ngOnInit(): void {
    // Get the news ID from the URL route parameters
    this.newsId = Number(this.route.snapshot.paramMap.get('id'))!;
    // Get the query parameter for the team ID (for news related to a team)
    this.quaryId = Number(this.route.snapshot.queryParamMap.get('quaryId'));
    // Get the parent category name from the query parameters (if any)
    this.parentCategoryName = this.route.snapshot.queryParamMap.get('parentCategoryName') || '';
    // Get the flag for video news from the query parameters (if any)
    this.videoNews = this.route.snapshot.queryParamMap.get('isVideoNews') || this.news;

    // Load news details based on the conditions
    this.loadNewsDetail();
  }

  // Function to load the news details
  loadNewsDetail(): void {
    // Check if a team ID is provided (quaryId)
    if (this.quaryId) {
      // Load news related to a specific team
      this.teamservice.getNewsByTeam(this.quaryId).subscribe(news => {
        this.findNews(news);  // Call method to find and set the news item
      });

      // Load news related to a category (could be similar to team news but based on category)
      this.categoriesservice.getNews(this.quaryId).subscribe(news => {
        this.findNews(news);  // Call method to find and set the news item
      });

    // Check if a parent category name is provided
    } else if (this.parentCategoryName) {
      // Load news related to a specific parent category
      this.categoriesservice.getnewsByParentCategory().subscribe(news => {
        this.findNews(news);  // Call method to find and set the news item
      });

    // If video news flag is set, filter video news items
    } else if (this.videoNews) {
      // Load news related to a parent category and filter video news if applicable
      this.categoriesservice.getnewsByParentCategory().subscribe(news => {
        this.findNews(news);  // Call method to find and set the news item
        // Uncomment below if you want to filter video news specifically
        // this.videoNews = news.filter(p => p.videoUrl);
      });
    }
  }

  // Helper method to find the specific news item from a list of news
  private findNews(newsList: News[]): void {
    const found = newsList.find(item => item.id === this.newsId);  // Find the news with the matching ID
    if (found) {
      this.news = found;  // If found, assign it to the 'news' variable
    }
  }

}
