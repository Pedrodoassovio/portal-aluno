import { Module } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { AlunosController } from './alunos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Aluno, AlunoSchema } from './schemas/aluno.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Aluno.name, schema: AlunoSchema }])],
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule { }
