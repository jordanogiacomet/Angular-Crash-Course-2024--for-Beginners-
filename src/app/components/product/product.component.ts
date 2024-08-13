import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  ngOnInit() {
    this.productOutput.emit(this.product);
  }
  // Precisamos de um jeito de prover os produtos para esse componente;
  // Apareceu um erro no console que ngfor nao e um atributo de app-product, logo preciso incluir as dependencias necessarias;
  @Input() product!: Product // -> Eu posso deixar a exclamacao porque eu sei que na montagem de produto, eu estou provendo um produto;
  // Isso emite valores para fora a partir de um evento
  @Output() productOutput: EventEmitter<Product> = new EventEmitter();
}
