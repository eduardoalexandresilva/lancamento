import { AuthGuard } from './../seguranca/auth.guard';
import { LancamentosPesquisasComponent } from './lancamentos-pesquisas/lancamentos-pesquisas.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  { path: '' , redirectTo:  'lancamentos', pathMatch: 'full' },

  { path: 'lancamentos',
    component: LancamentosPesquisasComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },

  { path: 'lancamentos/novo',
  component: LancamentoCadastroComponent,
  canActivate: [AuthGuard],
  data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
},

  { path: 'lancamentos/:codigo',
  component: LancamentoCadastroComponent,
  canActivate: [AuthGuard],
  data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
},

];

@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
