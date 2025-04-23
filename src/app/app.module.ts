import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { SubcategoryDetailPageComponent } from './components/subcategory-detail-page/subcategory-detail-page.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { HomeComponent } from './components/home/home.component';
import { TeamDetailPageComponent } from './components/team-detail-page/team-detail-page.component';
import { NewsDetailPageComponent } from './components/news-detail-page/news-detail-page.component';
import { SafePipe } from './services/safe-pipe';
import { AuthComponent } from './components/auth/auth.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SubcategoryDetailPageComponent,
    HeroSectionComponent,
    HomeComponent,
    TeamDetailPageComponent,
    NewsDetailPageComponent,
    SafePipe,
    AuthComponent,
    AdminPanelComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CartComponent,
    ProductDetailPageComponent
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
