import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movimiento } from '../models/movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private apiUrl: string;
  headers = new HttpHeaders(
    {'Content-Type': 'application/json;charset=UTF-8'}
  );

  constructor(private httpClient: HttpClient) { 
    this.apiUrl = environment.apiUrl + '/movimiento';
  }

  getTransfersGlobal(desde: string, hasta: string, page: number, size:number): Observable<Movimiento[]>{
    return this.httpClient.get<Movimiento[]>( this.apiUrl, {headers: this.headers, params: {desde: desde, hasta: hasta, page: page, size: size}} )
  }

  getTransfersByPart(desde: string, hasta: string, parteId: number, page: number, size:number): Observable<Movimiento[]>{
    return this.httpClient.get<Movimiento[]>( this.apiUrl+'/parte', {headers: this.headers, params: {desde: desde, hasta: hasta, parteId: parteId, page: page, size: size}} )
  }

  getTransfersByPlace(desde: string, hasta: string, lugarId: number, page: number, size:number): Observable<Movimiento[]>{
    return this.httpClient.get<Movimiento[]>( this.apiUrl+'/lugar', {headers: this.headers, params: {desde: desde, hasta: hasta, lugarId: lugarId, page: page, size: size}} )
  }

  getTransfersByPartAndPlace(desde: string, hasta: string, parteId: number, lugarId: number, page: number, size:number): Observable<Movimiento[]>{
    return this.httpClient.get<Movimiento[]>( this.apiUrl+'/parte/lugar', {headers: this.headers, params: {desde: desde, hasta: hasta, parteId: parteId, lugarId: lugarId, page: page, size: size}} )
  }
}
