import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss',
})
export class DeletePopupComponent {
  @Output() confirm: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @Input() display: boolean = false;

  @Input() product: Product = {
    name: '',
    price: '',
    rating: 0,
    image: '',
  };

  onConfirm(): void {
    this.confirm.emit(this.product);
  }

  onCancel(): void {
    this.display = false;
  }
}
