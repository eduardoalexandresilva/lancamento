import { AuthService } from './../seguranca/auth.service';
import { CategoriaService } from './../categorias/categoria.service';
import { PessoaService } from './../pessoas/pessoa.service';
import { CartaoService } from './../cartoes/cartao.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentoService } from './../lancamentos/lancamento.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { JwtHelper } from 'angular2-jwt';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule

  ],
  declarations: [NavbarComponent,
     PaginaNaoEncontradaComponent,
     NaoAutorizadoComponent
    ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
   ],
  providers: [
    LancamentoService,
    CartaoService,
    PessoaService,
    ConfirmationService,
    ErrorHandlerService,
    CategoriaService,
    Title,
    JwtHelper,
    AuthService,
    { provide: LOCALE_ID , useValue: 'pt-BR' }

  ]
})
export class CoreModule { }
