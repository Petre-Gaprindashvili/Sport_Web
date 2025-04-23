import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubcategoryDetailPageComponent } from './components/subcategory-detail-page/subcategory-detail-page.component';
import { HomeComponent } from './components/home/home.component';
import { TeamDetailPageComponent } from './components/team-detail-page/team-detail-page.component';
import { NewsDetailPageComponent } from './components/news-detail-page/news-detail-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },

  {
    path:'auth',
    component: AuthComponent
  },
  {
    path:'admin',
    component: AdminPanelComponent
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path:'reset-password',
    component:ResetPasswordComponent
  },

  { path: 'subcategory-detail-page/:id', 
    component: SubcategoryDetailPageComponent 
  },

  { path: 'team-detail-page/:id', 
    component: TeamDetailPageComponent
  },
  {
    path:'news-detail-page/:id',
    component: NewsDetailPageComponent
  },
  {
    path:'product-detail-page/:id',
    component:ProductDetailPageComponent
  },

  {
    path:'cart',
    component:CartComponent
  }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
