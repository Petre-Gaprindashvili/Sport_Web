import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/news';
import { CategoriesManagementService } from 'src/app/services/categories-management.service';
import { ActivatedRoute } from '@angular/router';
import { VideoHelperService } from '../shared/video-helper';

@Component({
  selector: 'app-highlights-section',
  templateUrl: './highlights-section.component.html',
  styleUrls: ['./highlights-section.component.css']
})
export class HighlightsSectionComponent implements OnInit {
  news: News[] = [];
  visibleNews: { [category: string]: News[] } = {}; // Track visible news by category
  newsToShow: number = 4;  
  categories: string[] = []; // Store unique categories

  constructor(
    public videohelper: VideoHelperService,
    private route: ActivatedRoute,
    public categoriemanagementservice: CategoriesManagementService
  ) {}

  ngOnInit(): void {
    this.categoriemanagementservice.getnewsByParentCategory().subscribe(news => {
      this.news = news;
      this.categories = Array.from(new Set(news.map(item => item.parentCategoryName)));
      
      // Initialize visible news for each category
      this.categories.forEach(category => {
        this.visibleNews[category] = this.news.filter(item => item.parentCategoryName === category).slice(0, this.newsToShow);
      });
    });
  }

  // Get all news for a specific category
  getNewsByParentCategory(categoryName: string): News[] {
    return this.news.filter(p => p.parentCategoryName === categoryName);
  }

  // Load more news for a specific category
  loadMoreNews(category: string): void {
    const alreadyVisible = this.visibleNews[category]?.length || 0;
    const moreNews = this.getNewsByParentCategory(category).slice(alreadyVisible, alreadyVisible + 4);
    this.visibleNews[category] = [...this.visibleNews[category], ...moreNews];
  }

  // Filter news for a specific category
  filteredNewsByCategory(category: string): News[] {
    return this.visibleNews[category] || [];
  }

  // Check if more news can be loaded for a specific category
  canLoadMore(category: string): boolean {
    const totalNewsInCategory = this.getNewsByParentCategory(category).length;
    const visibleNewsCount = this.filteredNewsByCategory(category).length;
    return visibleNewsCount < totalNewsInCategory;
  }

  // This method is used to embed the video URL
  // getEmbedUrl(videoUrl: string): string {
  //   let videoId = '';
  //   if (videoUrl.includes('youtube.com/watch')) {
  //     const urlParams = new URLSearchParams(videoUrl.split('?')[1]);
  //     videoId = urlParams.get('v') || '';
  //   } else if (videoUrl.includes('youtu.be/')) {
  //     videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
  //   }
  //   return `https://www.youtube.com/embed/${videoId}?modestbranding=1&showinfo=0&rel=0`;
  // }
}




