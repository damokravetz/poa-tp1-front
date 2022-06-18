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

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.css']
})
export class PiecesComponent implements OnInit {

  parameterSubs: Subscription=new Subscription();
  stocks: Stock[];
  places: Place[];
  error = '';

  displayedColumns: string[] = ['index', 'modelo', 'descripcion', 'tipo', 'desuso', 'uso', 'desechado', 'acciones'];
  selected = -1;
  constructor(
    private service: PiecesService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.stocks=[];
    this.places=[];
  }

  ngOnInit(): void {
    this.service.getPlaces().subscribe(data=>{
      this.places=data;
    })
    this.getStocks();
  }

  getStocks(){
    if(this.selected==-1){
      this.service.getStockGlobal(0,10).subscribe(data=>{
        this.stocks=data;
      })
    }else{
      this.service.getStockByPlace(this.selected,0,10).subscribe(data=>{
        this.stocks=data;
      })
    }
  }

  openTransferDialog(stock: Stock, index: number){
    const dialogRef = this.dialog.open(TransferStockDialog, {
      width: '250px',
      data: {places: this.places, stock: stock, index: index},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=false){
        this.service.transferStock(result.stockId, result.cantidad, result.lugarId, result.estadoOrigen, result.estadoDestino).subscribe(data=>{
            console.log(data)
            this.stocks[result.index].cantidadDesuso=data.cantidadDesuso;
            this.stocks[result.index].cantidadUso=data.cantidadUso;
            this.stocks[result.index].cantidadDesechado=data.cantidadDesechado;
        });
      }
    });
  }

  openReport(parte: Parte){
    this.router.navigate(['movimientos'], { queryParams: { parteId: parte.id, lugarId: this.selected } })
  }

}
