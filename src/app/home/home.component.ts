import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { PaginationParams, Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  private readonly productsUrl: string = 'http://localhost:3000/clothes';
  totalRecords: number = 0;

  constructor(private productsService: ProductsService) {}

  onProductsOutput(product: Product): void {
    console.log(product);
  }

  ngOnInit(): void {
    this.loadProducts(0, 5);
  }

  onPageChange(event: any): void {
    this.loadProducts(event.page, event.rows);
  }

  private loadProducts(page: number, perPage: number): void {
    this.productsService
      .getProducts(this.productsUrl, { page, perPage })
      .subscribe((products: Products) => {
        this.handleProductsResponse(products);
      });
  }

  private handleProductsResponse(products: Products): void {
    this.products = products.items;
    this.totalRecords = products.total;
  }
}
