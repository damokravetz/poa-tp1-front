import { Parte } from "./parte";
import { Place } from "./place";

export interface Movimiento {
    id: number,
    cantidad: number,
    estadoInicial: string,
    estadoFinal: string,
    fecha: Date,
    origen: Place,
    destino: Place,
    parte: Parte
}