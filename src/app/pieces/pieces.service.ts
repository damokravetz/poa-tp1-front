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
  private token: string;
  private apiUrl: string;
  headers: HttpHeaders; 

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/stock';
    this.token=localStorage.getItem('token')||'';
    this.headers= new HttpHeaders(
      {'Content-Type': 'application/json;charset=UTF-8', 'Authorization': this.token});
   }


  getStockGlobal(page: number, size:number): Observable<any>{
    return this.httpClient.get<any>( this.apiUrl+'/global', {headers: this.headers, params: {page: page, size: size}} )
  }

  getPlaces(): Observable<Place[]>{
    return this.httpClient.get<Place[]>( environment.apiUrl+'/lugar', {headers: this.headers} )
  }

  getStockByPlace(lugarId:number, page: number, size:number): Observable<any>{
    return this.httpClient.get<any>(this.apiUrl+'/lugar', {headers: this.headers, params: {lugarId: lugarId, page: page, size: size}}, )
  }

  transferStock(stockId:number, cantidad:number, lugarId:number, estadoOrigen:string, estadoDestino:string): Observable<Stock>{
    return this.httpClient.post<Stock>(this.apiUrl+'/transferencia', {}, {headers: this.headers, params: {stockId:stockId, cantidad:cantidad, lugarId:lugarId, estadoOrigen:estadoOrigen, estadoDestino:estadoDestino}}, )
  }

  enterStock(parteId:number, lugarId:number, cantidad:number, estadoDestino:string): Observable<Stock>{
    return this.httpClient.post<Stock>(this.apiUrl+'/ingreso', {}, {headers: this.headers, params: {parteId:parteId, cantidad:cantidad, lugarId:lugarId, estadoDestino:estadoDestino}}, )
  }
}
