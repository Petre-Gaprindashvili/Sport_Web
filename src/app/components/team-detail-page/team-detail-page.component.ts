// Angular core imports
import { Component, OnInit } from '@angular/core'; // Needed for component declaration and lifecycle

// Services
import { TeamsManagementService } from 'src/app/services/teams-management.service'; // Service to fetch team data

// Angular routing
import { ActivatedRoute } from '@angular/router'; // To access route parameters (team ID)

// Interfaces for typing
import { teams } from 'src/app/interfaces/teams'; // Interface for team
import { Players } from 'src/app/interfaces/players'; // Interface for players
import { News } from 'src/app/interfaces/news'; // Interface for news articles
import { matches } from 'src/app/interfaces/matches'; // Interface for match data
import { Product } from 'src/app/interfaces/product'; // Interface for products

// Helper services
import { VideoHelperService } from '../shared/video-helper'; // Service for video URL handling

@Component({
  selector: 'app-team-detail-page', // Component selector
  templateUrl: './team-detail-page.component.html', // HTML template path
  styleUrls: ['./team-detail-page.component.css'] // CSS path
})
export class TeamDetailPageComponent implements OnInit {

  // Properties
  teamId!: number; // Holds the current team ID from route
  activeTab: string = 'home';  // Default active tab

  team!: teams; // Holds team details
  home: News[] = []; // News shown on home tab
  player: Players[] = []; // List of players
  matches: matches[] = []; // All matches
  upcomingMatches: matches[] = []; // Future matches
  pastMatches: matches[] = []; // Past matches
  news: News[] = []; // Team-specific news
  product: Product[] = []; // Team merchandise

  // Constructor with injected services
  constructor(
    public videohelper: VideoHelperService, // For video URL processing
    public route: ActivatedRoute, // To read route parameters
    private teamsmanagementservice: TeamsManagementService // To fetch data from backend
  ) {}

  // Lifecycle hook
  ngOnInit(): void {
    this.teamId = +this.route.snapshot.paramMap.get('id')!; // Get team ID from route
    this.loadTeamData(); // Load all team-related data
  }

  // Method to switch active tab
  setTab(tab: string): void {
    this.activeTab = tab;
  }

  // Fetch data for the team
  loadTeamData() {
    // Get team info
    this.teamsmanagementservice.getSingleTeam(this.teamId).subscribe(team => {
      this.team = team;
      console.log(team);
    });

    // Get news for home tab
    this.teamsmanagementservice.getNewsByTeam(this.teamId).subscribe(home => {
      this.home = home;
    });

    // Get players
    this.teamsmanagementservice.getPlayersByTeam(this.teamId).subscribe(player => {
      this.player = player;
    });

    // Get all matches and filter into past and upcoming
    this.teamsmanagementservice.getMatchesByTeam(this.teamId).subscribe(matches => {
      const now = new Date();
      this.upcomingMatches = matches.filter(m => new Date(m.matchDate) > now);
      this.pastMatches = matches.filter(m => new Date(m.matchDate) <= now);
    });

    // Get team-specific news
    this.teamsmanagementservice.getNewsByTeam(this.teamId).subscribe(news => {
      this.news = news;
    });

    // Get products related to team
    this.teamsmanagementservice.getProductByTeam(this.teamId).subscribe(product => {
      this.product = product;
      console.log(product);
    });
  }


}
