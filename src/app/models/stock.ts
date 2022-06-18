import { Parte } from "./parte";
import { Place } from "./place";

export interface Stock {
    id:number,
    parte: Parte,
    cantidadDesuso: number,
    cantidadUso: number,
    cantidadDesechado: number,
    estado: string,
    lugar: Place
}