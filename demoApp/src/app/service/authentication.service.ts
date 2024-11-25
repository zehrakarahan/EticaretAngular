import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { UserModel } from "../model/userModel";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private apiUrl = 'http://localhost:7057/api/Auth'; // .NET Core API URL'niz

  constructor(private http: HttpClient) { }

  public login(credentials: UserModel):Observable<any> {

    return this.http.post<any>(this.apiUrl + '/Login', credentials);
  }

}