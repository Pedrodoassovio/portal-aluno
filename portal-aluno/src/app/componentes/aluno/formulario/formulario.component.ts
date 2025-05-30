import { CommonModule } from '@angular/common';
import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IAluno } from '../../../models/aluno.interface';
import { AlunoService } from './../../../services/aluno.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit {
  @Input({ required: true }) public tipoAcao!: 'cadastro' | 'edicao';

  public aluno!: any;
  public formulario!: FormGroup;

  private _formBuilder = inject(FormBuilder);
  private _alunoService = inject(AlunoService);
  private _snackBar = inject(MatSnackBar);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef: MatDialog) {
    this.tipoAcao = data?.tipoAcao;
    this.aluno = data?.aluno;
  }

  ngOnInit(): void {
    this.iniciaFormulario();

    if (this.tipoAcao === 'edicao' && this.aluno) {
      this.preencheAlunoParaEdicao(this.aluno);
    }
  }

  iniciaFormulario() {
    this.formulario = this._formBuilder.group({
      nome: [, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [, [Validators.required, Validators.email]],
      cpf: [, [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      rg: [, [Validators.required, Validators.pattern('^[0-9]{7,8}$')]],
      matricula: [],
      curso: [, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  preencheAlunoParaEdicao(aluno: IAluno) {
    this.formulario.patchValue({
      nome: aluno.nome,
      email: aluno.email,
      cpf: aluno.cpf,
      rg: aluno.rg,
      matricula: aluno.matricula,
      curso: aluno.curso
    });
  }

  onSubmit() {
    if (this.formulario.invalid) return;

    this._alunoService.criar(this.formulario.value).subscribe({
      next: (aluno: IAluno) => {
        this._snackBar.open(`Aluno ${aluno.nome} criado com sucesso!`, 'Fechar', {
          duration: 4000
        });
        this.formulario.reset();
        this._dialogRef.closeAll();
      },
      error: (error) => {
        this._snackBar.open('Erro ao criar aluno. Tente novamente.', 'Fechar', {
          duration: 4000
        });
      }
    })
    const aluno = this.formulario.value;
  }
}
