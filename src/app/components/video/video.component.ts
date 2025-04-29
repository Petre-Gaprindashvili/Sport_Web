import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/news';
import { CategoriesManagementService } from 'src/app/services/categories-management.service';
import { VideoHelperService } from '../shared/video-helper';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
videoNews: News[] = [];

constructor(public videohelper:VideoHelperService,  private categoriemanagementservice: CategoriesManagementService) {}
 
ngOnInit(): void {
  this.categoriemanagementservice.getnewsByParentCategory().subscribe(response=>{
    this.videoNews = response.filter(p => p.videoUrl);
  })

}

}

