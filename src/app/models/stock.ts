import { Parte } from "./parte";

export interface Stock {
    id:number,
    parte: Parte,
    cantidadDesuso: number,
    cantidadUso: number,
    cantidadDesechado: number,
    estado: string
}