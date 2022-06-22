import {Component, Inject} from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Place } from 'src/app/models/place';
import { Estado } from 'src/app/models/estado';
import { Stock } from 'src/app/models/stock';

@Component({
    selector: 'change-state-stock-dialog',
    templateUrl: 'change-state-stock-dialog.html',
  })
  export class ChangeStateStockDialog {
    cantidadControl = new FormControl(0, Validators.min(1));
    options: FormGroup;
    res;
    estados: Estado[]= [Estado.DESUSO, Estado.USO, Estado.DESECHADO];
    estadosOrigen: Estado[]= [Estado.DESUSO, Estado.USO];
    lugar: Place;
     

    constructor(public dialogRef: MatDialogRef<ChangeStateStockDialog>,
      @Inject(MAT_DIALOG_DATA) public data: {lugar: Place, stock: Stock, index: number},) {
      this.options=new FormGroup({
        cantidadControl: this.cantidadControl
      });
      this.lugar=data.lugar;
      this.res={
        lugar: this.lugar.id, 
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