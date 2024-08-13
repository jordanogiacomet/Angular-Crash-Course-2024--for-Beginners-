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
  styleUrls: ['./edit-popup.component.scss'], // Correção aqui
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();
  @Input() header: string = ''; // Garantia de valor padrão

  @Input() product: Product = {
    name: '',
    price: '',
    rating: 0,
    image: '',
  };

  onConfirm(): void {
    this.confirm.emit(this.product); // Quando emitir um produto mandar ele no evento, so assim funciona a adicao;
  }

  onCancel(): void {
    this.display = false; // Fechar o popup ao cancelar
  }
}