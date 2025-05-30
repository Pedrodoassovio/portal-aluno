import { INota } from "./nota.interface";
import { IPessoa } from "./pessoa.interface";

export interface IAluno extends IPessoa {
    matricula?: string;
    curso: string;
    notas?: INota[];
}