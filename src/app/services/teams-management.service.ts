import { HttpClient } from '@angular/common/http';  // Importing HttpClient module for making HTTP requests
import { Injectable } from '@angular/core';  // Importing Injectable to make the service injectable
import { Observable } from 'rxjs';  // Importing Observable to handle asynchronous data
import { teams } from '../interfaces/teams';  // Importing the teams interface
import { environment } from 'src/environments/environment';  // Importing environment variables
import { Players } from '../interfaces/players';  // Importing the Players interface
import { News } from '../interfaces/news';  // Importing the News interface
import { matches } from '../interfaces/matches';  // Importing the Matches interface
import { Product } from '../interfaces/product';  // Importing the Product interface

@Injectable({
  providedIn: 'root'  // Makes this service available throughout the app
})
export class TeamsManagementService {

  constructor(private http: HttpClient) { }  // Injecting HttpClient service for HTTP requests

  // Method to get a single team by its ID
  getSingleTeam(id: number): Observable<teams> {
    return this.http.get<teams>(`${environment.backendBaseUrl}/api/teams/GetSingleTeam/${id}`)  // Making GET request to fetch team
  }

  // Method to get all players by team ID
  getPlayersByTeam(teamId: number): Observable<Players[]> {
    return this.http.get<Players[]>(`${environment.backendBaseUrl}/api/players/GetPlayer/${teamId}`)  // Making GET request to fetch players by team
  }

  // Method to get all matches by team ID
  getMatchesByTeam(teamId: number): Observable<matches[]> {
    return this.http.get<matches[]>(`${environment.backendBaseUrl}/api/matches/GetMatchesByTeam/${teamId}`)  // Making GET request to fetch matches by team
  }

  // Method to get news for a specific team
  getNewsByTeam(teamId: number): Observable<News[]> {
    return this.http.get<News[]>(`${environment.backendBaseUrl}/api/news/GetNewsByTeam/${teamId}`)  // Making GET request to fetch news by team
  }

  // Method to get products related to a specific team
  getProductByTeam(teamId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.backendBaseUrl}/api/products/GetProductByTeam/${teamId}`)  // Making GET request to fetch products by team
  }

  // Method to get a single product by its ID
  getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.backendBaseUrl}/api/products/GetProduct/${id}`)  // Making GET request to fetch a single product
  }
}
