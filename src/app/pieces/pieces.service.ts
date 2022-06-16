import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Stock } from '../models/stock';
import { environment } from 'src/environments/environment';
import { Place } from '../models/place';

@Injectable({
  providedIn: 'root'
})
export class PiecesService {
  private apiUrl: string;
  headers = new HttpHeaders(
    {'Content-Type': 'application/json;charset=UTF-8'}
  );

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/stock';
   }


  getStockGlobal(page: number, size:number): Observable<Stock[]>{
    return this.httpClient.get<Stock[]>( this.apiUrl+'/global', {headers: this.headers, params: {page: page, size: size}} )
  }

  getPlaces(): Observable<Place[]>{
    return this.httpClient.get<Place[]>( environment.apiUrl+'/lugar', {headers: this.headers} )
  }

  getStockByPlace(lugarId:number, page: number, size:number): Observable<Stock[]>{
    return this.httpClient.get<Stock[]>(this.apiUrl+'/lugar', {headers: this.headers, params: {lugarId: lugarId, page: page, size: size}}, )
  }
}
