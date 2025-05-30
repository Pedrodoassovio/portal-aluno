import { IMateria } from "./materia.interface";

export interface INota {
  materia: IMateria;
  notas: number[];
}