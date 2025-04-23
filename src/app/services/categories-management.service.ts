import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category} from '../interfaces/category';
import { Subcategory } from '../interfaces/subCategory';
import { Tab } from '../interfaces/tabs';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { teams } from '../interfaces/teams';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { News } from '../interfaces/news';
import { matches } from '../interfaces/matches';




@Injectable({
  providedIn: 'root'
})
export class CategoriesManagementService {

  constructor(private http:HttpClient) {}


  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.backendBaseUrl}/api/categories/GetAllCategory`);
  }

  getAllSubcategories(id:number):Observable<{ subCategories: Subcategory[] }>{
    return this.http.get<{ subCategories: Subcategory[] }>(`${environment.backendBaseUrl}/api/categories/GetAllSubCategory/${id}`);

  // return this.http.get<Subcategory[]>(`${environment.backendBaseUrl}/api/categories/GetCategory/${categoryId}`);
  }

  getSingleSubcategory(id:number):Observable<Subcategory>{
   return this.http.get<Subcategory>(`${environment.backendBaseUrl}/api/categories/GetSingleSubcategory/${id}`);
  }

  getTabsForSubCategory(categoryId:number):Observable<Tab[]>{
    console.log('Calling API for categoryId:', categoryId);  // Check if the API is called

   return this.http.get<Tab[]>(`${environment.backendBaseUrl}/api/categories/GetAllTabs?categoryId=${categoryId}`);
  }

  getAllTeams(categoryId:number):Observable<teams[]>{
  return this.http.get<teams[]>(`https://localhost:7284/api/teams/GetAllTeams/${categoryId}`)
  }
  
  getMatches(categoryId:number):Observable<matches[]>{
  return this.http.get<matches[]>(`${environment.backendBaseUrl}/api/matches/GetMatches/${categoryId}`)
  }

  getNews(categoryId:number):Observable<News[]>{
    return this.http.get<News[]>(`https://localhost:7284/api/news/GetNewsByCategory/${categoryId}`)
  }

  getVideoNews(categoryId:number):Observable<News[]>{
    return this.http.get<News[]>(`${environment.backendBaseUrl}/api/news/GetVideoNewsByCategory/${categoryId}`)
  }

}






