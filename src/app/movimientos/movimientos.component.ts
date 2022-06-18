import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { Movimiento } from '../models/movimiento';
import { MovimientosService } from './movimientos.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  desde: Date=new Date();
  hasta: Date=new Date();
  page: number=0;
  size: number=10;
  parteId: number=-1;
  lugarId: number=-1;
  movimientos: Movimiento[]=[];
  displayedColumns: string[] = ['index', 'parte', 'origen', 'estado inicial', 'cantidad', 'destino', 'estado final'];
  options: FormGroup;
  dateFromControl = new FormControl();
  dateTillControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private service: MovimientosService) {

      this.options=new FormGroup({
        dateFromControl: this.dateFromControl,
        dateTillControl: this.dateTillControl
      });
   }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.parteId = Number(params['parteId']);
        this.lugarId = Number(params['lugarId']);
      }
    );
    this.getMovimientos();
  }

  getMovimientos(){
    let desdeParam= moment(this.desde).format('DD-MM-YYYY HH:mm:ss');
    let hastaParam= moment(this.hasta).format('DD-MM-YYYY HH:mm:ss');;
    if(this.parteId==-1&&this.lugarId==-1) this.getMovimientosGlobal(desdeParam, hastaParam);
    if(this.parteId!=-1&&this.lugarId==-1) this.getMovimientosPorParte(desdeParam, hastaParam);
    if(this.parteId!=-1&&this.lugarId!=-1) this.getMovimientosPorParteYLugar(desdeParam, hastaParam);
    if(this.parteId==-1&&this.lugarId!=-1) this.getMovimientosPorLugar(desdeParam, hastaParam);
  }

  getMovimientosGlobal(desdeParam: string, hastaParam:string){
    this.service.getTransfersGlobal(desdeParam, hastaParam, this.page, this.size).subscribe(data=>{
      this.movimientos=data;
    });
  }

  getMovimientosPorParte(desdeParam: string, hastaParam:string){
    this.service.getTransfersByPart(desdeParam, hastaParam, this.parteId, this.page, this.size).subscribe(data=>{
      this.movimientos=data;
    });
  }

  getMovimientosPorLugar(desdeParam: string, hastaParam:string){
    this.service.getTransfersByPlace(desdeParam, hastaParam, this.lugarId, this.page, this.size).subscribe(data=>{
      this.movimientos=data;
    });
  }

  getMovimientosPorParteYLugar(desdeParam: string, hastaParam:string){
    this.service.getTransfersByPartAndPlace(desdeParam, hastaParam, this.parteId, this.lugarId, this.page, this.size).subscribe(data=>{
      this.movimientos=data;
    });
  }

}
