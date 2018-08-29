import { Title } from '@angular/platform-browser';
import { CartaoService } from './../cartao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pesquisa-cartoes',
  templateUrl: './pesquisa-cartoes.component.html',
  styleUrls: ['./pesquisa-cartoes.component.css']
})
export class PesquisaCartoesComponent implements OnInit {

  cartoes = [];

  constructor(
    private cartaoService: CartaoService,
    private title: Title
  ) { }

  ngOnInit() {
    this.pesquisar();
    this.title.setTitle("Pesquisa de forma de pagamento")
  }

  pesquisar() {
    this.cartaoService.pesquisar()
      .then(car => this.cartoes = car);
  }
}
