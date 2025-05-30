import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LancamentoNotaComponent } from '../../../components/lancamento-nota/lancamento-nota.component';
import { IAluno } from '../../../models/aluno.interface';
import { FormularioComponent } from '../formulario/formulario.component';
import { AlunoService } from './../../../services/aluno.service';
@Component({
  selector: 'app-lista',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatDialogModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _alunoService = inject(AlunoService);
  private _dialogRef = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  public displayedColumns: string[] = ['matricula', 'nome', 'rg', 'curso', 'actions'];
  public dataSource = new MatTableDataSource<IAluno>([
    {
      nome: 'João da Silva',
      cpf: '123.456.789-00',
      rg: '123456789',
      email: 'aaaa@aaaaaa.com',
      dataNascimento: new Date(),
      matricula: '12345',
      curso: 'Analise e desenvolvimento de sistemas',
    }
  ]);

  ngOnInit(): void {
    this.buscarAlunos();
  }

  buscarAlunos() {
    this._alunoService.buscarTodos().subscribe({
      next: (alunos: IAluno[]) => {
        this.dataSource.data = alunos;
        console.log('Alunos buscados com sucesso:', alunos);
      },
      error: () => {
        alert('Erro ao buscar alunos:');
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  abrirModalEdicao(aluno: IAluno) {
    this._dialogRef.open(FormularioComponent, {
      data: {
        aluno: aluno,
        tipoAcao: 'edicao',
      },
      width: '600px'
    })
  }

  abrirModalLancamentoNota(aluno: IAluno) {
    this._dialogRef.open(LancamentoNotaComponent, {
      data: {
        aluno: aluno,
      },
      width: '900px'
    })
  }


  abrirModalCadastro() {
    this._dialogRef.open(FormularioComponent, {
      data: {
        tipoAcao: 'cadastro',
      },
      width: '600px'
    }).afterClosed().subscribe({
      next: () => {
        this.buscarAlunos();
      }
    });
  }

  excluirAluno(aluno: IAluno) {
    this._alunoService.exluir(aluno).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(a => a.matricula !== aluno.matricula);
        this._snackBar.open(`Aluno ${aluno.nome} excluído com sucesso!`, 'Fechar', {
          duration: 4000
        })
      },
      error: (error) => {
        console.error('Erro ao excluir aluno:', error);
        this._snackBar.open(`Erro ao excluir aluno ${aluno.nome}`, 'Fechar', {
          duration: 4000
        });
      }
    })
  }

  abrirModalConfirmacaoExclusao(aluno: IAluno) {
    this.excluirAluno(aluno);
  }
}
