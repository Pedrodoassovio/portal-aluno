import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { Aluno } from './schemas/aluno.schema';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) { }

  @Get()
  async listarAlunos(): Promise<Aluno[]> {
    return this.alunosService.listarAlunos();
  }

  @Post()
  async cadastrarAluno(@Body() aluno: Aluno): Promise<Aluno> {
    return this.alunosService.cadastrarAluno(aluno);
  }

  @Delete(':matricula')
  async deletarAluno(@Param('matricula') matricula: string): Promise<void> {
    return this.alunosService.deletarAluno(matricula);
  }
}