import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriesRequest } from '../model/categoriesRequest';
import { Category } from '../model/category';
import { CouponRequest } from '../model/couponRequest';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiUrl = 'http://localhost:7057/api/'; // Base API URL
  private http: HttpClient;

  constructor(backend: HttpBackend) { 
    this.http = new HttpClient(backend);

  }
  public createCoupon(credentials: CouponRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Coupon/CreateCoupon', credentials);
  }
  public getAllCoupon(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Coupon/GetAllCoupons');
  }
}
