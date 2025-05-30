import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Aluno, AlunoDocument } from './schemas/aluno.schema';

@Injectable()
export class AlunosService {
  private ultimoId = 0;

  constructor(@InjectModel(Aluno.name) private alunoModel: Model<AlunoDocument>) { }

  async listarAlunos(): Promise<Aluno[]> {
    return this.alunoModel.find().exec();
  }

  async cadastrarAluno(aluno: Aluno): Promise<Aluno> {
    this.ultimoId += 1;
    aluno.matricula = this.ultimoId.toString().padStart(6, '0');

    if (!Array.isArray(aluno.notas)) {
      aluno.notas = [];
    }

    aluno.notas.push({
      materia: {
        nome: 'Sistemas para internet',
        professor: {
          nome: 'Prof. Ailton',
          cpf: '111.222.333-44',
          rg: '1234567',
          email: 'professor@anhanguera.com',
          dataNascimento: new Date(1980, 5, 10),
          matricula: 'P001',
          dataAdmissao: new Date(2010, 2, 15)
        }
      },
      notas: [0, 0, 0]
    });

    const alunoCriado = await this.alunoModel.create(aluno);
    return alunoCriado;
  }

  async deletarAluno(matricula: string): Promise<void> {
    await this.alunoModel.deleteOne({ matricula }).exec();
  }
}
