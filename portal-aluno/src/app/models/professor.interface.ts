import { IPessoa } from "./pessoa.interface";

export interface IProfessor extends IPessoa {
    matricula: string;
    dataAdmissao: Date;
    dataDemissao?: Date | null;
}