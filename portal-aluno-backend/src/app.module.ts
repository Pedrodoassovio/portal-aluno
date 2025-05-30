import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlunosModule } from './alunos/alunos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AlunosModule,
    MongooseModule.forRoot('mongodb://localhost:27017/aluno_management'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
