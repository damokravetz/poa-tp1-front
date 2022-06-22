import { ChangeDetectorRef ,Component, OnInit } from '@angular/core';
import {Inject, Injectable} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Parte } from '../models/parte';
import { Stock } from '../models/stock';
import {Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PiecesService } from './pieces.service';
import { Place } from '../models/place';
import { MatDialog } from '@angular/material/dialog';
import { TransferStockDialog } from '../dialogs/transfer-stock-dialog/transfer-stock-dialog';
import { EnterWithdrawStockDialog } from '../dialogs/enter-withdraw-stock-dialog/enter-withdraw-stock-dialog';
import { PageEvent } from '@angular/material/paginator';
import { ChangeStateStockDialog } from '../dialogs/change-state-stock-dialog/change-state-stock-dialog';

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.css']
})
export class PiecesComponent implements OnInit {
  userName: string;
  userMail: string;
  page: number=0;
  size: number=10;
  totalPageElements: number=0;
  parameterSubs: Subscription=new Subscription();
  stocks: Stock[];
  places: Place[];
  error = '';

  displayedColumns: string[] = ['index', 'modelo', 'descripcion', 'tipo', 'desuso', 'uso', 'desechado', 'acciones'];
  globalPlace: Place = {id:-1 , codLugar:"00", descripcion:"Global", esDeposito:false, capacidad:0}
  selected: Place;
  constructor(
    private service: PiecesService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.selected=this.globalPlace;
    this.userName=localStorage.getItem('nombre')||'';
    this.userMail=localStorage.getItem('email')||'';
    this.stocks=[];
    this.places=[];
  }

  ngOnInit(): void {
    this.service.getPlaces().subscribe({
      next: (data) => {
        this.places=data;
      },
      error: (error) => {
        this.onErrorAction(error)
      }
    })
    this.getStocks();
  }

  getStocks(){
    if(this.selected.id==-1){
      this.service.getStockGlobal(this.page,this.size).subscribe({
        next: (data) => {
          this.stocks=data.content;
          this.setPageData(data);
        },
        error: (error) => {
          this.onErrorAction(error)
        }
      })
    }else{
      this.service.getStockByPlace(this.selected.id,this.page,this.size).subscribe({
        next: (data) => {
          this.stocks=data.content;
          this.setPageData(data);
        },
        error: (error) => {
          this.onErrorAction(error)
        }
      })
    }
  }

  onErrorAction(error:any){
    if(error.status==403){
      this.router.navigate(['login'])
    }else{
      alert("Hubo un error: "+error.status);
    }
  }

  openTransferDialog(stock: Stock, index: number){
    const dialogRef = this.dialog.open(TransferStockDialog, {
      width: '250px',
      data: {place: this.selected, places: this.places, stock: stock, index: index},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=false){
        this.service.transferStock(result.stockId, result.cantidad, result.lugar.id, result.estadoOrigen, result.estadoDestino).subscribe({
            next: (data) => {
              this.stocks[result.index].cantidadDesuso=data.cantidadDesuso;
              this.stocks[result.index].cantidadUso=data.cantidadUso;
              this.stocks[result.index].cantidadDesechado=data.cantidadDesechado;
              alert("Transferencia realizado con éxito")
            },
            error: (error) => {
              this.onErrorAction(error)
            }
        });
      }
    });
  }

  openEnterWithdrawDialog(stock: Stock, index: number){
    const dialogRef = this.dialog.open(EnterWithdrawStockDialog, {
      width: '250px',
      data: {lugarId: this.selected.id, stock: stock, index: index},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=false){
        this.service.enterStock(result.parteId, result.lugarId, result.cantidad, result.estadoDestino).subscribe({
          next: (data) => {
            if(this.stocks[result.index].id==null){
              this.stocks[result.index].id=data.id;
              this.stocks[result.index].lugar=data.lugar;
            }
            this.stocks[result.index].cantidadDesuso=data.cantidadDesuso;
            this.stocks[result.index].cantidadUso=data.cantidadUso;
            this.stocks[result.index].cantidadDesechado=data.cantidadDesechado;
            alert("Ingreso realizado con éxito")
          },
          error: (error) => {
            this.onErrorAction(error)
          }
        });
      }
    });
  }

  openChangeStateStockDialog(stock: Stock, index: number){
    const dialogRef = this.dialog.open(ChangeStateStockDialog, {
      width: '250px',
      data: {lugar: this.selected, stock: stock, index: index},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=false){
        this.service.transferStock(result.stockId, result.cantidad, result.lugarId, result.estadoOrigen, result.estadoDestino).subscribe({
          next: (data) => {
            if(this.stocks[result.index].id==null){
              this.stocks[result.index].id=data.id;
              this.stocks[result.index].lugar=data.lugar;
            }
            this.stocks[result.index].cantidadDesuso=data.cantidadDesuso;
            this.stocks[result.index].cantidadUso=data.cantidadUso;
            this.stocks[result.index].cantidadDesechado=data.cantidadDesechado;
            alert("Cambio de estado realizado con éxito")
          },
          error: (error) => {
            this.onErrorAction(error)
          }
        });
      }
    });
  }

  openReport(parte: Parte){
    this.router.navigate(['movimientos'], { queryParams: { parteId: parte.id, lugarId: this.selected.id } })
  }

  openGlobalReport(){
    this.router.navigate(['movimientos'], { queryParams: { parteId: -1, lugarId: this.selected.id } })
  }

  setPageData(data: any){
    this.page=data.number;
    this.totalPageElements=data.totalElements;
  }

  eventPage(pageEvent: PageEvent){
    this.page=pageEvent.pageIndex;
    this.getStocks();
  }

}
