import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../interfaces/message.interface';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/auth.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'http://localhost:8000/api/v1/'

  constructor(
    private http: HttpClient,
    private cookies: CookieService) { }

  public getAllMessages(room: string): Observable<Message[]> {
    const token = `Token ${this.cookies.get('token')}`;
    const headers = new HttpHeaders({ 'Authorization': token })

    return this.http.get<Message[]>(`${this.API_URL}messages/${room}`, {headers: headers});
  }

  public login(data: Login): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.API_URL}login`, data);
  }
}