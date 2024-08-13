import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, RatingModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})

// Vamos usar o decorator input para passar o valor para o componente do que queremos na tela;
// Usar o decorator output para toda vez que quisermos confirmar um evento, e a partir desse output que vamos mudar o valor do produto;
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Output() confirm = new EventEmitter<Product>(); //Mandamos o evento para aqui, e o on confirm vai ser tratado para gerar o produto, emitindo ele a partir do evento capturado na funcao;
  @Output() cancel = new EventEmitter<void>();
  @Input() header!: string; // Esse input sempre vai ser passado;

  // Inicialmente inicializado como vazio
  @Input() product: Product = {
    name: '',
    price: '',
    rating: 0,
    image: '',
  };

  // A partir do evento emitimos o produto;

  onConfirm() {
    this.emitProduct();
  }

  emitProduct() {
    this.confirm.emit(this.product);
  }

  onCancel() {
    this.closeDisplay();
  }

  closeDisplay(): void {
    this.display = false;
  }
}
