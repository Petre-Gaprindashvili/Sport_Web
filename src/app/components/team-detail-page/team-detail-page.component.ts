import { Component, OnInit } from '@angular/core';
import { TeamsManagementService } from 'src/app/services/teams-management.service';
import { ActivatedRoute } from '@angular/router';
import { teams } from 'src/app/interfaces/teams';
import { Players } from 'src/app/interfaces/players';
import { News } from 'src/app/interfaces/news';
import { matches } from 'src/app/interfaces/matches';
import { Product } from 'src/app/interfaces/product';
@Component({
  selector: 'app-team-detail-page',
  templateUrl: './team-detail-page.component.html',
  styleUrls: ['./team-detail-page.component.css']
})
export class TeamDetailPageComponent implements OnInit {
teamId!: number;  
activeTab: string = 'home';  // Default active tab
team!: teams;
home:News[] = [];
player: Players[] =[];
matches:matches[] = [];
upcomingMatches: matches[] = [];
pastMatches: matches[] = [];
news: News[] = [];
product:Product[] = [];

constructor(public route: ActivatedRoute, private teamsmanagementservice:TeamsManagementService){}

ngOnInit(): void {
  this.teamId = +this.route.snapshot.paramMap.get('id')!;
this.loadTeamData();
}

setTab(tab:string):void{
  this.activeTab = tab;
}

loadTeamData(){
  this.teamsmanagementservice.getSingleTeam(this.teamId).subscribe(team=>{
    this.team = team;
    console.log(team)
  })

  this.teamsmanagementservice.getNewsByTeam(this.teamId).subscribe(home=>{
    this.home = home;

  })

  this.teamsmanagementservice.getPlayersByTeam(this.teamId).subscribe(player=>{
  this.player = player;
  })
 
  this.teamsmanagementservice.getMatchesByTeam(this.teamId).subscribe(matches=>{
    const now = new Date();
    this.upcomingMatches = matches.filter(m => new Date(m.matchDate) > now);

    this.pastMatches = matches.filter(m => new Date(m.matchDate) <= now);   
  })

  this.teamsmanagementservice.getNewsByTeam(this.teamId).subscribe(news=>{
    this.news = news;
  })
 
  this.teamsmanagementservice.getProductByTeam(this.teamId).subscribe(product=>{
    this.product = product
    console.log(product)
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


