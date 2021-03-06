import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { CommonModule } from '@angular/common';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisasComponent } from './lancamentos-pesquisas/lancamentos-pesquisas.component';
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
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    LancamentosRoutingModule

  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisasComponent

  ],
  exports: []
})
export class LancamentosModule { }
