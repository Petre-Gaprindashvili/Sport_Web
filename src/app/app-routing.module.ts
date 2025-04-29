import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubcategoryDetailPageComponent } from './components/subcategory-detail-page/subcategory-detail-page.component';
import { HomeComponent } from './components/home/home.component';
import { TeamDetailPageComponent } from './components/team-detail-page/team-detail-page.component';
import { NewsDetailPageComponent } from './components/news-detail-page/news-detail-page.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminpanelComponent } from './admin/adminpanel/adminpanel.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { CartComponent } from './components/cart/cart.component';
import { UsermanagamentComponent } from './admin/usermanagament/usermanagament.component';
import { CategorymanagamentComponent } from './admin/categorymanagament/categorymanagament.component';
import { VideoComponent } from './components/video/video.component';

const routes: Routes = [
    // Public Routes

  {
    path:'',
    component: HomeComponent
  },
  {
    path:'video',
    component:VideoComponent
  },

  {
    path:'auth',
    component: AuthComponent
  },
  // {
  //   path:'admin',
  //   component: AdminpanelComponent
  // },
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
  },
  
  // Admin Routes (Nested Routes)

  {
    path: 'admin',
    component: AdminpanelComponent,
    children:[
      {path:'usermanagament', component:UsermanagamentComponent },
      {path:'categorymanagament', component:CategorymanagamentComponent },



      
    ]

  }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }
    )
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
