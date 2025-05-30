import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { NotaSchema } from './nota.schema';

export type AlunoDocument = HydratedDocument<Aluno>;

@Schema()
export class Aluno {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cpf: string;

  @Prop()
  rg: string;

  @Prop()
  email: string;

  @Prop()
  dataNascimento: Date;

  @Prop()
  matricula: string;

  @Prop()
  curso: string;

  @Prop({ type: [NotaSchema], default: [] })
  notas: Record<string, any>[];
}

export const AlunoSchema = SchemaFactory.createForClass(Aluno);
