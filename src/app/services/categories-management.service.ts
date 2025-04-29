import { Injectable } from '@angular/core';  // Importing Injectable to make the service injectable
import { HttpClient } from '@angular/common/http';  // Importing HttpClient to make HTTP requests
import { Category } from '../interfaces/category';  // Importing the Category interface
import { Subcategory, Subresponse } from '../interfaces/subCategory';  // Importing Subcategory and Subresponse interfaces
import { Tab } from '../interfaces/tabs';  // Importing the Tab interface
import { environment } from 'src/environments/environment';  // Importing environment variables for backend URL
import { Observable } from 'rxjs';  // Importing Observable for asynchronous data handling
import { BehaviorSubject, Subject } from 'rxjs';  // Importing BehaviorSubject and Subject from rxjs (though not used in the code here)
import { teams } from '../interfaces/teams';  // Importing the teams interface
import { News } from '../interfaces/news';  // Importing the News interface
import { matches } from '../interfaces/matches';  // Importing the Matches interface

@Injectable({
  providedIn: 'root'  // Makes this service available throughout the app
})
export class CategoriesManagementService {

  constructor(private http: HttpClient) { }  // Injecting HttpClient service to perform HTTP requests

  // Method to get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.backendBaseUrl}/api/categories/GetAllCategory`);
  }

  // Method to get all subcategories for a specific category by category ID
  getAllSubcategories(id: number): Observable<{ subCategories: Subcategory[] }> {
    return this.http.get<{ subCategories: Subcategory[] }>(`${environment.backendBaseUrl}/api/categories/GetAllSubCategory/${id}`);
  }

  // Method to get a single subcategory by its ID
  getSingleSubcategory(id: number): Observable<Subcategory> {
    return this.http.get<Subcategory>(`${environment.backendBaseUrl}/api/categories/GetSingleSubcategory/${id}`);
  }

  // Method to get tabs for a specific subcategory by category ID
  getTabsForSubCategory(categoryId: number): Observable<Tab[]> {
    console.log('Calling API for categoryId:', categoryId);  // Debugging: logs categoryId
    return this.http.get<Tab[]>(`${environment.backendBaseUrl}/api/categories/GetAllTabs?categoryId=${categoryId}`);
  }

  // Method to get all teams for a specific category
  getAllTeams(categoryId: number): Observable<teams[]> {
    return this.http.get<teams[]>(`https://localhost:7284/api/teams/GetAllTeams/${categoryId}`);
  }

  // Method to get all matches
  getAllMatches(): Observable<matches[]> {
    return this.http.get<matches[]>(`${environment.backendBaseUrl}/api/matches/GetAllMatches`);
  }

  // Method to get matches by category ID
  getMatches(categoryId: number): Observable<matches[]> {
    return this.http.get<matches[]>(`${environment.backendBaseUrl}/api/matches/GetMatches/${categoryId}`);
  }

  // Method to get news for parent category
  getnewsByParentCategory(): Observable<News[]> {
    return this.http.get<News[]>(`${environment.backendBaseUrl}/api/news/GetNewsByParentCategory`);
  }

  // Method to get news for a specific category by category ID
  getNews(categoryId: number): Observable<News[]> {
    return this.http.get<News[]>(`https://localhost:7284/api/news/GetNewsByCategory/${categoryId}`);
  }

  // Method to get video news for a specific category
  getVideoNews(categoryId: number): Observable<News[]> {
    return this.http.get<News[]>(`${environment.backendBaseUrl}/api/news/GetVideoNewsByCategory/${categoryId}`);
  }

  // Admin functionality: Method to add a new category
  addCategory(name: string): Observable<string> {
    return this.http.post<string>("https://localhost:7284/api/admin/categories/AddNewCategory", { name }, { withCredentials: true });
  }

  // Admin functionality: Method to update an existing category by ID
  updateCategory(id: number, categoryName: string): Observable<Category> {
    return this.http.put<Category>(`${environment.backendBaseUrl}/api/admin/categories/UpdateCategory${id}`, { name: categoryName }, { withCredentials: true });
  }

  // Admin functionality: Method to delete a category by ID
  deleteCategory(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.backendBaseUrl}/api/admin/categories/DeleteCategory${id}`, { withCredentials: true });
  }

  // Admin functionality: Method to add a new subcategory
  addSubCategory(subCategory: { name: string; image: string; parentCategoryId: number }): Observable<Subresponse> {
    return this.http.post<Subresponse>(`${environment.backendBaseUrl}/api/admin/categories/AddSubCategory`, subCategory, { withCredentials: true });
  }

  // Admin functionality: Method to delete a subcategory by ID
  deleteSubCategory(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.backendBaseUrl}/api/admin/categories/DeleteSubCategory${id}`, { withCredentials: true });
  }
}
