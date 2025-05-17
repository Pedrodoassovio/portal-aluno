import { IProfessor } from "./professor.interface";

export interface IMateria {
    nota: number[];
    nome: string;
    professor: IProfessor;
}