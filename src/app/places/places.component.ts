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
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  displayedColumns: string[] = ['modelo', 'descripcion', 'tipo'];
  dataSource : Parte[];
  constructor() { 
    this.dataSource=ELEMENT_DATA;
  }
  ngOnInit(): void {
    
  }
}
