import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriesRequest } from '../model/categoriesRequest';
import { Category } from '../model/category';
import { Product } from '../model/productResponse';
import { ProductRequest } from '../model/productRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:7057/api/'; // Base API URL
  private http: HttpClient;

  constructor(backend: HttpBackend) { 
    this.http = new HttpClient(backend);

  }
  public getAllCategoriesWithSelect(): Observable<any> {
    return this.http.get<Product[]>(this.apiUrl + 'Product/GetAllProductWithSelect');
  }
  public getAllProducts(): Observable<any> {
    return this.http.get<Category[]>(this.apiUrl + 'Product/GetProducts');
  }
  public createProduct(credentials: ProductRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Product/AddProduct', credentials);
  }
}
