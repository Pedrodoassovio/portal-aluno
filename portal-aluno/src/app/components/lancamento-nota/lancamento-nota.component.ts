import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { IAluno } from '../../models/aluno.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lancamento-nota',
  imports: [MatCardModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatTableModule, CommonModule, FormsModule],
  templateUrl: './lancamento-nota.component.html',
  styleUrl: './lancamento-nota.component.scss'
})
export class LancamentoNotaComponent {
  notasForm!: FormGroup;
  private _formBuilder = inject(FormBuilder);
  public mediaFinal: number = 0;
  aluno: IAluno;
  private _snackBar = inject(MatSnackBar);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.aluno = data?.aluno;
  }

  submeterNotas() {
    //TODO: Implementar lógica para submeter as notas
    this._snackBar.open(`Não implementado!`, 'fechar');
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.notasForm = this._formBuilder.group({
      nota1: [this.aluno?.notas?.[0]?.notas[0] ?? 0, [Validators.required, Validators.min(0), Validators.max(2)]],
      nota2: [this.aluno?.notas?.[0]?.notas[1] ?? 0, [Validators.required, Validators.min(0), Validators.max(2)]],
      nota3: [this.aluno?.notas?.[0]?.notas[2] ?? 0, [Validators.required, Validators.min(0), Validators.max(2)]],
    });

  }

  calcularMediaFinal(nota1: number, nota2: number, nota3: number): number {
    const notas = this.notasForm.value;
    const n1 = notas.nota1;
    const n2 = notas.nota2;
    const n3 = notas.nota3;

    // Só calcula se todos os campos estiverem preenchidos e válidos
    if (
      n1 === null || n1 === '' || isNaN(Number(n1)) ||
      n2 === null || n2 === '' || isNaN(Number(n2)) ||
      n3 === null || n3 === '' || isNaN(Number(n3))
    ) {
      return 0;
    }

    return +((Number(n1) + Number(n2) + Number(n3)) / 3).toFixed(2);
  }
  get notas(): FormArray {
    return this.notasForm.get('notas') as FormArray;
  }

  salvarNotasMateria(i: number) {
    //TODO: Implementar lógica para salvar as notas da matéria
  }
}
