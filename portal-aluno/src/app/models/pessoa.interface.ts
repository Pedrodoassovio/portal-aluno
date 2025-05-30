import { IEndereco } from "./endereco.interface";

export interface IPessoa {
    nome: string;
    cpf: string;
    rg: string;
    endereco?: IEndereco;
    dataNascimento?: Date;
    foto?: string;
    email: string;
}