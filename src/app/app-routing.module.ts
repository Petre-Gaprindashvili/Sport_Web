import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SubcategoryDetailPageComponent } from './components/subcategory-detail-page/subcategory-detail-page.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },

  { path: 'subcategory-detail-page/:id', 
    component: SubcategoryDetailPageComponent 
  },
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
