import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CartaoService } from './../../cartoes/cartao.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  cartoes = [];
  lancamento =  new Lancamento;


  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private cartaoService: CartaoService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if(codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarCartoes();
    this.carregarPessoas();
    this.title.setTitle('Novo Lançamento');
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number){
     this.lancamentoService.buscaPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizaTituloEdicao();
      })

      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar( form: FormControl){
      if(this.editando) {
        this.atualizarLancamento(form)
      }else{
        this.adicionarLancamento(form)
      }
  }

  adicionarLancamento(form: FormControl){
    this.lancamentoService.adicionar(this.lancamento)
    .then(lancamentoAdicionado => {
       this.toasty.success('Lancamento adicionado com sucesso!');

         this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo])
      })
    .catch(erro => this.errorHandler.handle(erro));

  }

  atualizarLancamento( form: FormControl){
    this.lancamentoService.atualizar(this.lancamento)
     .then(lancamento => {
       this.lancamento = lancamento;


       this.toasty.success('Lancamento alterado com sucesso');
       this.atualizaTituloEdicao();
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias(){
    return this.categoriaService.listarTodas()
    .then(cat => {
      this.categorias = cat.map( c => ({ label: c.nome, value: c.codigo}));

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCartoes(){
    return this.cartaoService.pesquisar()
    .then(cartao => {
      this.cartoes = cartao.map(c => ({label: c.nome, value: c.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas(){
  return this.pessoaService.listarTodas()
  .then(pes => {
    this.pessoas = pes.map( p => ({label: p.nome, value: p.codigo}));
  })
  .catch(erro => this.errorHandler.handle(erro));
 }

   novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizaTituloEdicao() {
    this.title.setTitle(`Edição de lancamento: ${this.lancamento.descricao}`);
  }

}
