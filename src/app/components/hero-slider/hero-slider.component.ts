import { Component, OnInit } from '@angular/core';
import { matches } from 'src/app/interfaces/matches';
import { CategoriesManagementService } from 'src/app/services/categories-management.service';


@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css']
})
export class HeroSliderComponent implements OnInit {
  results: (matches & { isPast: boolean })[] = [];
  // upcomingMatches: matches[] = [];
// pastMatches: matches[] = [];

  constructor(public categoriemanagementservice:CategoriesManagementService){}
  images = [
    {src: 'https://www.reuters.com/resizer/v2/S4OKYUEQ6BJV3CJEWWUQ4465LA.jpg?auth=63d065e4d7ef4204a26cd9b415c7bf69b8ba6f04032501d8ee6c61dc7ca3b3c6&width=1920&quality=80'
    },
    {src: 'https://live.staticflickr.com/3850/33870196905_607d0e169f_h.jpg'},
    {src: 'https://images.ctfassets.net/vhp9jnid12wf/BgZ1CUgnZnSKcyWttSdmS/7684ec53374cc2e7a063cca3a304e789/NFL_Desktop2x.jpg?fm=webp&q=100' },
    {src: 'https://img.mlbstatic.com/mlb-images/image/upload/t_16x9/t_w2208/mlb/ecvvy36s45gvkdoadfeq.jpg' },
    ]
    
    slideConfig = {
      
      "slidesToShow": 1,
      "slidesToScroll": 1,
      "infinite": true,
      "autoplay": true,
      "autoplaySpeed": 2000,
      "dots": true,
      "arrows": false,
      "fade": true,
      "cssEase": 'linear',
      "pauseOnHover": false ,
      "pauseOnFocus": false 
    };

// getAllMatche

slideConfigg = {
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  dots: false,
  arrows: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};


 ngOnInit(): void {
   this.categoriemanagementservice.getAllMatches().subscribe(matches=>{
    const now = new Date();
    // Combining both past and upcoming matches into one array
    this.results = matches.map(match=>({
    ...match,
    isPast: new Date(match.matchDate) <= now
    }))
       // Sorting the results array so past matches appear first
       this.results.sort((a, b) => {
        if (a.isPast && !b.isPast) {
          return -1; // Past match comes first
        }
        if (!a.isPast && b.isPast) {
          return 1;  // Upcoming match comes after
        }
        return 0; // If both are either past or upcoming, keep the original order
      });
    
   })
  }

    // Function to check if the match is past
   isPastMatch(matchDate: string | Date): boolean {
    const date = new Date(matchDate); // Ensure matchDate is converted to Date
    return date <= new Date();
  }

}

