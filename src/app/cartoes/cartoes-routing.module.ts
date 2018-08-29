import { AuthGuard } from './../seguranca/auth.guard';
import { PesquisaCartoesComponent } from './pesquisa-cartoes/pesquisa-cartoes.component';
import { CartaoCadastroComponent } from './cartao-cadastro/cartao-cadastro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [

  { path: 'formaPagamento/novo',
    component: CartaoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CARTAO'] }
  },

  { path: 'formaPagamento/:codigo',
    component: CartaoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CARTAO'] }
  },

  { path: 'formaPagamento',
    component: PesquisaCartoesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CARTAO'] }
  },


];

@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CartoesRoutingModule { }
