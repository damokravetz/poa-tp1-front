import { ChangeDetectorRef ,Component, OnInit } from '@angular/core';
import {Inject, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Parte } from '../models/parte';
import { Stock } from '../models/stock';
import {Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PiecesService } from './pieces.service';
import { Place } from '../models/place';

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

  displayedColumns: string[] = ['modelo', 'descripcion', 'tipo', 'desuso', 'uso', 'desechado', 'acciones'];
  selected = -1;
  constructor(
    private service: PiecesService
    // private route: ActivatedRoute,
    // private router: Router,
    // private piecesService: PiecesService,
    // private cdRef: ChangeDetectorRef,
    // private httpClient: HttpClient
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

}
