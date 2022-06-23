import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
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
  userName: string;
  userMail: string;
  useDate: boolean=false;
  desde: Date=new Date(+0);
  hasta: Date=new Date();
  page: number=0;
  size: number=10;
  totalPageElements: number=0;
  parteId: number=-1;
  lugarId: number=-1;
  movimientos: Movimiento[]=[];
  displayedColumns: string[] = ['index', 'parte', 'origen', 'estado inicial', 'cantidad', 'destino', 'estado final'];
  options: FormGroup;
  dateFromControl = new FormControl(this.desde, [Validators.required]);
  dateTillControl = new FormControl(this.hasta, [Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MovimientosService) {
      this.userName=localStorage.getItem('nombre')||'';
      this.userMail=localStorage.getItem('email')||'';
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
    let hastaParam= moment(this.hasta).format('DD-MM-YYYY HH:mm:ss');
    if(this.parteId==-1&&this.lugarId==-1) this.getMovimientosGlobal(desdeParam, hastaParam);
    if(this.parteId!=-1&&this.lugarId==-1) this.getMovimientosPorParte(desdeParam, hastaParam);
    if(this.parteId!=-1&&this.lugarId!=-1) this.getMovimientosPorParteYLugar(desdeParam, hastaParam);
    if(this.parteId==-1&&this.lugarId!=-1) this.getMovimientosPorLugar(desdeParam, hastaParam);
  }

  getMovimientosGlobal(desdeParam: string, hastaParam:string){
    console.log(desdeParam)
    this.service.getTransfersGlobal(desdeParam, hastaParam, this.page, this.size).subscribe({
      next: (data) => {
        this.movimientos=data.content;
        this.setPageData(data);
      },
      error: (error) => {
        this.onErrorAction(error)
      }
    });
  }

  onErrorAction(error:any){
    if(error.status==403){
      this.router.navigate(['login'])
    }else{
      alert("Hubo un error: " +error.status);
    }
  }

  getMovimientosPorParte(desdeParam: string, hastaParam:string){
    this.service.getTransfersByPart(desdeParam, hastaParam, this.parteId, this.page, this.size).subscribe({
      next: (data) => {
        this.movimientos=data.content;
        this.setPageData(data);
      },
      error: (error) => {
        this.onErrorAction(error)
      }
    });
  }

  getMovimientosPorLugar(desdeParam: string, hastaParam:string){
    this.service.getTransfersByPlace(desdeParam, hastaParam, this.lugarId, this.page, this.size).subscribe({
      next: (data) => {
        this.movimientos=data.content;
        this.setPageData(data);
      },
      error: (error) => {
        this.onErrorAction(error)
      }
    });
  }

  getMovimientosPorParteYLugar(desdeParam: string, hastaParam:string){
    this.service.getTransfersByPartAndPlace(desdeParam, hastaParam, this.parteId, this.lugarId, this.page, this.size).subscribe({
      next: (data) => {
        this.movimientos=data.content;
        this.setPageData(data);
      },
      error: (error) => {
        this.onErrorAction(error)
      }
    });
  }

  setPageData(data: any){
    this.page=data.number;
    this.totalPageElements=data.totalElements;
  }

  eventPage(pageEvent: PageEvent){
    this.page=pageEvent.pageIndex;
    this.getMovimientos();
  }

  dateChanges(event: any){
    if(!this.options.invalid){
      this.desde=this.dateFromControl.value;
      this.hasta=this.dateTillControl.value;
      this.page=0;
      this.totalPageElements=0;
      this.getMovimientos();
    }
  }

  dateUsedChange(){
    this.useDate=!this.useDate;
    if(this.useDate==false){
      this.desde=new Date(+0)
      this.hasta=new Date();
    }else{
      this.desde=this.dateFromControl.value;
      this.hasta=this.dateTillControl.value;
    }
    this.getMovimientos();
  }

}
