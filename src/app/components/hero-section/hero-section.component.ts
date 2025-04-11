import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
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
  

}
