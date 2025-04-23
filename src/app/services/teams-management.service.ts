import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { teams } from '../interfaces/teams';
import { environment } from 'src/environments/environment';
import { Players } from '../interfaces/players';
import { News } from '../interfaces/news';
import { matches } from '../interfaces/matches';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class TeamsManagementService {

  constructor(private http:HttpClient) { }
  getSingleTeam(id:number):Observable<teams>{
    return this.http.get<teams>(`${environment.backendBaseUrl}/api/teams/GetSingleTeam/${id}`)
  }
  getPlayersByTeam(teamId:number):Observable<Players[]>{
  return this.http.get<Players[]>(`${environment.backendBaseUrl}/api/players/GetPlayer/${teamId}`)
  }

   getMatchesByTeam(teamId:number):Observable<matches[]>{
    return this.http.get<matches[]>(`${environment.backendBaseUrl}/api/matches/GetMatchesByTeam/${teamId}`)
    }
  
  getNewsByTeam(teamId:number):Observable<News[]>{
  return this.http.get<News[]>(`${environment.backendBaseUrl}/api/news/GetNewsByTeam/${teamId}`)
  }

  getProductByTeam(teamId:number):Observable<Product[]>{
  return this.http.get<Product[]>(`${environment.backendBaseUrl}/api/products/GetProductByTeam/${teamId}`)
  }

  getSingleProduct(id:number):Observable<Product>{
  return this.http.get<Product>(`${environment.backendBaseUrl}/api/products/GetProduct/${id}`)
  }
}


