import {Component, Inject} from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Place } from 'src/app/models/place';
import { Estado } from 'src/app/models/estado';
import { Stock } from 'src/app/models/stock';

@Component({
    selector: 'transfer-stock-dialog',
    templateUrl: 'transfer-stock-dialog.html',
  })
  export class TransferStockDialog {
    places: Place[];
    cantidadControl = new FormControl(0, Validators.min(1));
    options: FormGroup;
    estados: Estado[]= [Estado.DESUSO, Estado.USO, Estado.DESECHADO];
    estadosOrigen: Estado[]= [Estado.DESUSO, Estado.USO];
    res;
     

    constructor(public dialogRef: MatDialogRef<TransferStockDialog>,
      @Inject(MAT_DIALOG_DATA) public data: {places: Place[], stock: Stock, index: number},) {
      this.places=data.places;
      this.options=new FormGroup({
        cantidadControl: this.cantidadControl
      });
      this.res={
        lugarId: this.places[0].id, 
        estadoOrigen: this.estados[0],
        estadoDestino: this.estados[0],
        cantidad: this.cantidadControl.value,
        stockId: data.stock.id,
        index: data.index
      };
      
    }

    cantidadChanges(){
      this.res.cantidad=this.cantidadControl.value;
    }
  }