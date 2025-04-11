import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { SubcategoryDetailPageComponent } from './components/subcategory-detail-page/subcategory-detail-page.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SubcategoryDetailPageComponent,
    HeroSectionComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
