import { Component, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/interfaces/news';
import { CategoriesManagementService } from 'src/app/services/categories-management.service';
import { TeamsManagementService } from 'src/app/services/teams-management.service';

@Component({
  selector: 'app-news-detail-page',
  templateUrl: './news-detail-page.component.html',
  styleUrls: ['./news-detail-page.component.css']
})
export class NewsDetailPageComponent implements OnInit{

  newsId!:number;
  quaryId!: number;

  news: any;
 constructor( 
  private route: ActivatedRoute,
  private teamservice:TeamsManagementService,
  private categoriesservice:CategoriesManagementService){}

  ngOnInit(): void {
    this.newsId = Number(this.route.snapshot.paramMap.get('id'))!;
    this.quaryId = Number(this.route.snapshot.queryParamMap.get('quaryId')); // get the correct teamId

    this.loadNewsDetail();
  }

  loadNewsDetail():void{
  this.teamservice.getNewsByTeam(this.quaryId).subscribe(news=>{
    const found = news.find(item => item.id === this.newsId);
if(found){
  this.news = found
}
  })
   
   this.categoriesservice.getNews(this.quaryId).subscribe(news=>{
    const found = news.find(item => item.id === this.newsId)
    if(found){
      this.news = found
    }
   })

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
