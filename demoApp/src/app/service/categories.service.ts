import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriesRequest } from '../model/categoriesRequest';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'http://localhost:7057/api/'; // Base API URL
  private http: HttpClient;

  constructor(backend: HttpBackend) { 
    this.http = new HttpClient(backend);

  }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı. Lütfen giriş yapın.');
    }
    console.log(token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Token'ı Bearer formatında gönder
      'Content-Type': 'application/json', // JSON formatında veri gönderildiğini belirtin
    });
  }

  public createCategories(credentials: CategoriesRequest): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl + 'Categories/SaveCategories', credentials,{ headers });
  }
  public getAllCategories(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.apiUrl + 'Categories/GetAllCategories',{ headers });
  }
  public getAllCategoriesWithSelect(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<Category[]>(this.apiUrl + 'Categories/GetAllCategoriesWithSelect',{ headers });
  }
}
