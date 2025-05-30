import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAluno } from '../models/aluno.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private _httpClient = inject(HttpClient);

  criar(aluno: IAluno) : Observable<any> {
    return this._httpClient.post('http://localhost:3000/alunos', aluno);
  }

  buscarTodos(): Observable<IAluno[]> {
    return this._httpClient.get<IAluno[]>('http://localhost:3000/alunos');
  }

  exluir(aluno: IAluno): Observable<void> {
    return this._httpClient.delete<void>(`http://localhost:3000/alunos/${aluno.matricula}`);
  }
}