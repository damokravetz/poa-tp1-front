import {Component, Inject} from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Place } from 'src/app/models/place';
import { Estado } from 'src/app/models/estado';
import { Stock } from 'src/app/models/stock';

@Component({
    selector: 'enter-withdraw-stock-dialog',
    templateUrl: 'enter-withdraw-stock-dialog.html',
  })
  export class EnterWithdrawStockDialog {
    cantidadControl = new FormControl(0, Validators.min(1));
    options: FormGroup;
    estados: Estado[]= [Estado.DESUSO, Estado.USO];
    res;
     

    constructor(public dialogRef: MatDialogRef<EnterWithdrawStockDialog>,
      @Inject(MAT_DIALOG_DATA) public data: {lugarId: number, stock: Stock, index: number},) {
      this.options=new FormGroup({
        cantidadControl: this.cantidadControl
      });
      this.res={
        parteId: data.stock.parte.id,
        lugarId: data.lugarId, 
        estadoDestino: this.estados[0],
        cantidad: this.cantidadControl.value,
        index: data.index
      };
      
    }

    cantidadChanges(){
      this.res.cantidad=this.cantidadControl.value;
    }
  }