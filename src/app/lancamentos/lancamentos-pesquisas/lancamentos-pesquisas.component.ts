import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisas',
  templateUrl: './lancamentos-pesquisas.component.html',
  styleUrls: ['./lancamentos-pesquisas.component.css']
})
export class LancamentosPesquisasComponent implements OnInit{

  totalResgistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private auth: AuthService,
    private errorHandle: ErrorHandlerService,
    private toast: ToastyService,
    private confrimation: ConfirmationService,
    private title: Title
  ){}

  ngOnInit() {
   this.title.setTitle('Pesquisa de lançamentos')
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
     .then(resultado =>{
       this.totalResgistros = resultado.total;
       this.lancamentos = resultado.lancamentos;
     })

     .catch(erro => this.errorHandle.handle(erro));

}

aoMudarPagina(event: LazyLoadEvent) {
  const pagina = event.first / event.rows;
  this.pesquisar(pagina);
}

confirmarExclusao(lancamento: any){
  this.confrimation.confirm({
    message: 'Tem certeza que deseja excluír ?',
    accept: () => {
       this.excluir(lancamento);
    }
  });

}

excluir( lancamento: any){
 this.lancamentoService.excluir(lancamento.codigo)
 .then(() => {
   if(this.grid.first === 0){
      this.pesquisar();
   }else{
      this.grid.first = 0;
}
    this.toast.success('Lancamento excluído com sucesso!');
  })
  .catch(erro => this.errorHandle.handle(erro));
}

}
