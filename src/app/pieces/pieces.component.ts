import { Component, OnInit } from '@angular/core';
import { Parte } from '../models/Parte';

const ELEMENT_DATA: Parte[] = [
  {modelo: 'ALSJ76', descripcion: "Pantalla frontal", tipo: 'Critica'},
  {modelo: 'ALSJ76', descripcion: "Pantalla frontal", tipo: 'Critica'},
  {modelo: 'ALSJ76', descripcion: "Pantalla frontal", tipo: 'Critica'},
  {modelo: 'ALSJ76', descripcion: "Pantalla frontal", tipo: 'Critica'},
  {modelo: 'ALSJ76', descripcion: "Pantalla frontal", tipo: 'Critica'},
  {modelo: 'ALSJ76', descripcion: "Pantalla frontal", tipo: 'Critica'},
  {modelo: 'ALSJ76', descripcion: "Pantalla frontal", tipo: 'Critica'},
];

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.css']
})
export class PiecesComponent implements OnInit {
  displayedColumns: string[] = ['modelo', 'descripcion', 'tipo'];
  dataSource : Parte[];
  constructor() { 
    this.dataSource=ELEMENT_DATA;
  }

  ngOnInit(): void {
  }

}
