import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  // No inicio do componente, vamos chamar o backend e pegar a lista de produtos;
  // Se inscrevendo ao observable que o produto produz;
  // No inicio do programa injetamos o servico que contem toda logica encapsulada de pegar a api;
  // Produto service retorna um observable -> algo como uma promisse que eu posso me inscrever
  // Quando eu faco o get eu preciso esperar para o server completar a requisicao, logo a forma que esperamos e observando esse request que acabamos de fazer;
  // Eu estou dando o get e retornando um observable para voce, quando ele acabar ele vai retornar uma informacao para voce;
  // Esse retorno sendo observavel eu posso me inscrever nele e por me inscrever nele eu posso mostrar as coisas;

  products: Product[] = []

  onProductsOutput(product: Product) {
    console.log(product);
  }

  ngOnInit() {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page: 0, perPage: 5 })
      .subscribe((products: Products) => {
        this.products = products.items;
      });
  }
}
