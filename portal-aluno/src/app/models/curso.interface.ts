import { IMateria } from "./materia.interface";

export interface ICurso {
    id: number;
    nome: string;
    materias: IMateria[];
}