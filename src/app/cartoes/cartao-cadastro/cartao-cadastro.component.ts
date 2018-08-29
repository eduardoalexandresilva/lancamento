import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { CartaoService } from './../cartao.service';
import { Cartao } from './../../core/model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartao-cadastro',
  templateUrl: './cartao-cadastro.component.html',
  styleUrls: ['./cartao-cadastro.component.css']
})
export class CartaoCadastroComponent implements OnInit {

  cartao = new Cartao();

  constructor(
    private cartaoService: CartaoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private router: ActivatedRoute,
    private rota: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoCartao = this.router.snapshot.params['codigo'];

    if(codigoCartao) {
      this.carregarCartao(codigoCartao);
    }

    this.title.setTitle("Cadastro de forma de pagamento");
  }

  get editando() {
     return Boolean(this.cartao.codigo);
  }

  carregarCartao(codigo: number) {

   this.cartaoService.buscaPorCodigo(codigo)
     .then(car => {
       this.cartao = car;
       this.atualizaEdicao();
     })

     .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if(this.editando){
       this.atualizarCartao(form)
    }else {
      this.adicionarCartao(form)
    }

  }

  atualizarCartao(form: FormControl) {
    this.cartaoService.atualizar(this.cartao)
      .then(cartao => {
         this.cartao = cartao;

         this.toasty.success('Atualizado com sucesso!');
         this.atualizaEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  adicionarCartao(form: FormControl) {
    this.cartaoService.adicionar(this.cartao)
     .then(cartaoAdicionado => {
       this.toasty.success('Forma adicionada com sucesso!');

        this.rota.navigate(['formaPagamento/novo', cartaoAdicionado.codigo]);
     })

     .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl){
    form.reset();
    this.cartao = new Cartao();
  }

  atualizaEdicao(){
    this.title.setTitle(`Ediçao de Forma: ${this.cartao.nome}`);
  }

}
