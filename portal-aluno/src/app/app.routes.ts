import { Routes } from '@angular/router';
import { ListaComponent } from './componentes/aluno/lista/lista.component';
import { LancamentoNotaComponent } from './components/lancamento-nota/lancamento-nota.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListaComponent },
  { path: 'lancamento-nota', pathMatch: 'full', component: LancamentoNotaComponent },
  { path: '**', redirectTo: '' },
];
