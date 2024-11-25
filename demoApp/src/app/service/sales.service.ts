
// src/app/services/sales.service.ts
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopSalesProducts } from '../model/top-sales-product';
import { GetDailySales } from '../model/get-daily-sales';
import { GetLowStockProducts } from '../model/get-low-stock-product';
import { TopPreferCategories } from '../model/top-prefer-categories';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private apiUrl = 'http://localhost:7057/api/Sales/'; // Base API URL
  private http: HttpClient;

  constructor(backend: HttpBackend) {
    this.http = new HttpClient(backend);
  }
  public getAllSalesList(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'GetAllDummyList');
  }
  public getTopSellingProducts(): Observable<TopSalesProducts[]> {
    return this.http.get<TopSalesProducts[]>(`${this.apiUrl}GetTopSellingProducts`);
  }

  public getTopCategories(): Observable<TopPreferCategories[]> {
    return this.http.get<TopPreferCategories[]>(`${this.apiUrl}GetTopCategories`);
  }

  public getDailySales(): Observable<GetDailySales[]> {
    return this.http.get<GetDailySales[]>(`${this.apiUrl}GetDailySales`);
  }

  public getLowStockProducts(): Observable<GetLowStockProducts[]> {
    return this.http.get<GetLowStockProducts[]>(`${this.apiUrl}LowStock`);
  }
}
