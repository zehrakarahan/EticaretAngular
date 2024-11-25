import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  private apiUrl = 'http://localhost:7057/api';  // Base API URL

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Eğer URL zaten base URL'yi içeriyorsa, değiştirmemize gerek yok
    if (!request.url.startsWith(this.apiUrl)) {
      request = request.clone({
        url: this.apiUrl + request.url
      });
    }

    return next.handle(request);
  }
}
