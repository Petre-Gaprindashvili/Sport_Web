import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  
import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { SubcategoryDetailPageComponent } from './components/subcategory-detail-page/subcategory-detail-page.component';
import { HeroSliderComponent} from './components/hero-slider/hero-slider.component';
import { HomeComponent } from './components/home/home.component';
import { TeamDetailPageComponent } from './components/team-detail-page/team-detail-page.component';
import { NewsDetailPageComponent } from './components/news-detail-page/news-detail-page.component';
import { SafePipe } from './components/shared/safe-pipe';
import { AuthComponent } from './components/auth/auth.component';
import { ShortNamePipe } from './components/shared/short-name-pipe';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { HighlightsSectionComponent } from './components/highlights-section/highlights-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminpanelComponent } from './admin/adminpanel/adminpanel.component';
import { UsermanagamentComponent } from './admin/usermanagament/usermanagament.component';
import { CategorymanagamentComponent } from './admin/categorymanagament/categorymanagament.component';
import { VideoComponent } from './components/video/video.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SubcategoryDetailPageComponent,
    HeroSliderComponent,
    HomeComponent,
    TeamDetailPageComponent,
    NewsDetailPageComponent,
    SafePipe,
    ShortNamePipe,
    AuthComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CartComponent,
    ProductDetailPageComponent,
    HighlightsSectionComponent,
    FooterComponent,
    AdminpanelComponent,
    UsermanagamentComponent,
    CategorymanagamentComponent,
    VideoComponent,
    // CarouselModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
