import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimiento } from '../models/movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private token:string;
  private apiUrl: string;
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl + '/movimiento';
    this.token=localStorage.getItem('token')||''; 
    this.headers= new HttpHeaders(
      {'Content-Type': 'application/json;charset=UTF-8', 'Authorization': this.token});
  }

  getTransfersGlobal(desde: string, hasta: string, page: number, size:number): Observable<any>{
    return this.httpClient.get<any>( this.apiUrl+'/global', {headers: this.headers, params: {desde: desde, hasta: hasta, page: page, size: size}} )
  }

  getTransfersByPart(desde: string, hasta: string, parteId: number, page: number, size:number): Observable<any>{
    return this.httpClient.get<any>( this.apiUrl+'/parte', {headers: this.headers, params: {desde: desde, hasta: hasta, parteId: parteId, page: page, size: size}} )
  }

  getTransfersByPlace(desde: string, hasta: string, lugarId: number, page: number, size:number): Observable<any>{
    return this.httpClient.get<any>( this.apiUrl+'/lugar', {headers: this.headers, params: {desde: desde, hasta: hasta, lugarId: lugarId, page: page, size: size}} )
  }

  getTransfersByPartAndPlace(desde: string, hasta: string, parteId: number, lugarId: number, page: number, size:number): Observable<any>{
    return this.httpClient.get<any>( this.apiUrl+'/parte/lugar', {headers: this.headers, params: {desde: desde, hasta: hasta, parteId: parteId, lugarId: lugarId, page: page, size: size}} )
  }
}
