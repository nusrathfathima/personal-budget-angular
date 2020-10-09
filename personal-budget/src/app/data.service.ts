import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  myBudgetURL = 'http://localhost:3000/budget';
  constructor(private http: HttpClient) {}

  getMyBudget(): Observable<any[]> {
    return this.http.get<any[]>(this.myBudgetURL);
  }
}
