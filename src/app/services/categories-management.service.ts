import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category} from '../interfaces/category';
import { Subcategory } from '../interfaces/subCategory';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoriesManagementService {

  constructor(private http:HttpClient) {}


  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.backendBaseUrl}/api/categories/GetAllCategory`);
  }

  getSubcategories(id:number):Observable<{ subCategories: Subcategory[] }>{
    return this.http.get<{ subCategories: Subcategory[] }>(`https://localhost:7284/api/categories/GetCategory${id}`);

  // return this.http.get<Subcategory[]>(`${environment.backendBaseUrl}/api/categories/GetCategory/${categoryId}`);
  }
}

