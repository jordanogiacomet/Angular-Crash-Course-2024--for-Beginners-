import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';

// Vai ser usado para facilitar as chamadas;
// Sabemos que precisamos fazer um get para /clothes
// Como vamos fazer isso?
// Usando o servico pre existente HttpClient -> usado para fazer chamadas rest
// Selecionamos as opcoes e o HttpClient processa o request para nos;
// Adicionamos uma camada de abstracao para tornar isso mais simples;
// Para nao invocar o http client toda vez;
// T representa um tipo generico de resposta, eu poderia colocar string, number, qualquer coisa;
// Temos que cuidar tambem do any;
// O que estamos dizendo -> estamos provendo para um metodo do tipo <T> uma url do tipo string e opcoes que podem ser qualquer coisa
// Any pode ser usado mas nao deve ser usado;
// Portando criar uma interface;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Sendo httpClient algo que estamos injetando, precisamos de um provider para a dependencia
  // Um provider e um set de instrucoes para a injecao de dependecias em como instanciar ou criar um servico
  constructor(
    private httpClient: HttpClient
  ) { }

  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }
}
