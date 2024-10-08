import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Product, Products } from '../../types';

// Esse servico vai ser incluido em home component, para chamar o backend e chamar a lista de produtos;
// Importamos nosso servico de api, e logo notamos nossa abstracao funcionando, deixando tudo mais simples;
// Agora queremos criar tipos para nossos anys;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }

  // Estamos retornando um observable de produtos;
  // Lembrar de tipar options e retornos;
  getProducts = (url: string, params: PaginationParams): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json'
    });
  }
  addProduct = (url: string, body: Product): Observable<any> => {
    return this.apiService.post(url, body, {});
  }

  editProduct = (url: string, body: Product): Observable<any> => {
    return this.apiService.put(url, body, {});
  }
  deleteProduct = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  }
}
