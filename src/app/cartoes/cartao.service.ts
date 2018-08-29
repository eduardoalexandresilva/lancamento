import { environment } from './../../environments/environment';
import { Cartao } from './../core/model';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class CartaoService {

  cartoesUrl: string;

  constructor(private http: AuthHttp) {
    this.cartoesUrl = `${environment.apiUrl}/cartoes`;
  }

  pesquisar(): Promise<any> {


    return this.http.get(`${this.cartoesUrl}`)
      .toPromise()
      .then(response => response.json());

  }

  adicionar(cartao: Cartao): Promise<Cartao> {

    return this.http.post(this.cartoesUrl, JSON.stringify(cartao))
       .toPromise()
       .then(response => response.json());
  }

  atualizar(cartao: Cartao): Promise<Cartao> {

    return this.http.put(`${this.cartoesUrl}/${cartao.codigo}` ,
            JSON.stringify(cartao))
        .toPromise()
        .then(response => {
          const lancamentoAlterado = response.json() as Cartao;

          return lancamentoAlterado
        });
  }

  buscaPorCodigo(codigo: number): Promise<Cartao> {


    return this.http.get(`${this.cartoesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const cartao = response.json() as Cartao;

      return cartao;
      });
  }

}
