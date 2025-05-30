import { IProfessor } from "./professor.interface";

export interface IMateria {
    id?: number;
    nome: string;
    professor: IProfessor;
}