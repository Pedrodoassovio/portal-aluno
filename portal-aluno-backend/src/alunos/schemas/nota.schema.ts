import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Professor {
  @Prop() nome: string;
  @Prop() cpf: string;
  @Prop() rg: string;
  @Prop() email: string;
  @Prop() dataNascimento: Date;
  @Prop() matricula: string;
  @Prop() dataAdmissao: Date;
}

@Schema()
export class Materia {
  @Prop() nome: string;
  @Prop({ type: Professor }) professor: Professor;
}

@Schema()
export class Nota {
  @Prop({ type: Materia, required: true }) materia: Materia;
  @Prop({ type: [Number], default: [] }) notas: number[];
}

export const NotaSchema = SchemaFactory.createForClass(Nota);