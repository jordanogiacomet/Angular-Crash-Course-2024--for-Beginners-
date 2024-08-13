import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { requestStringConstructor } from './utils';

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
      .subscribe({
        next: (data: Products) => this.handleProductsResponse(data),
        error: (error) => this.handleRequestError(error, 'load'),
      });
  }

  private handleProductsResponse(products: Products): void {
    this.products = products.items;
    this.totalRecords = products.total;
  }

  private handleRequestError(response: any, verb: string): void {
    console.error(requestStringConstructor(verb, 'error'), response);
  }

  handleLoadProductsError(response: any): void {
    console.error('Error loading products: ', response);
  }

  private addProduct(product: Product): void {
    this.productsService.addProduct(this.productsUrl, product).subscribe({
      next: (data) => { this.handleRequestSuccess(data, 'delete'), this.loadProducts(0, 5); },
      error: (error) => this.handleRequestError(error, 'error'),
    });
  }

  private editProduct(product: Product, id: number): void {
    this.productsService
      .editProduct(this.buildProductUrl(id), product)
      .subscribe({
        next: (data) => this.handleRequestSuccess(data, 'edit'),
        error: (error) => this.handleRequestError(error, 'error'),
      });
  }

  private deleteProduct(id: number): void {
    this.productsService.deleteProduct(this.buildProductUrl(id)).subscribe({
      next: (data) => this.handleRequestSuccess(data, 'delete'),
      error: (error) => this.handleRequestError(error, 'error'),
    });
  }

  private handleRequestSuccess(response: any, verb: string): void {
    console.log(requestStringConstructor(verb, 'sucessfully'), response);
  }

  private buildProductUrl(id: number): string {
    return this.productsUrl + '/' + id;
  }
}
