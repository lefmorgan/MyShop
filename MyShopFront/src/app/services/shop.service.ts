import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';
import { Shop } from '../models/shop';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  getShop(page: number): Observable<any> {
    const basUri = 'http://localhost:8000/api/shops';
    const url = `${basUri}?page=${page + 1}`;

    return this.http.get<any>(url);
  }

  getAllShop(): Observable<any> {
    const url = `http://localhost:8000/api/shops`;
    return this.http.get<any>(url);
  }

  removeShop(id: number): Observable<any> {
    const url = `http://localhost:8000/api/shops/${id}`;
    return this.http.delete(url).pipe(
      catchError((error: any) => {
        console.error(error);
        return of();
      })
    );
  }

  addShop(shop: Shop) {
    const url = `http://localhost:8000/api/shops`;
    return this.http.post(url, shop, this.httpOptions).subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'mon-jeton',
    }),
  };
}
