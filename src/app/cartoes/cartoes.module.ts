import { CartoesRoutingModule } from './cartoes-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartaoCadastroComponent } from './cartao-cadastro/cartao-cadastro.component';
import { PesquisaCartoesComponent } from './pesquisa-cartoes/pesquisa-cartoes.component';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,



    SharedModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    CartoesRoutingModule
  ],
  declarations: [
    CartaoCadastroComponent,
    PesquisaCartoesComponent
  ],
  exports:[]
})
export class CartoesModule { }
