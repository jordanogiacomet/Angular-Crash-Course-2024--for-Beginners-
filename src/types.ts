import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

// Agora conseguimos modificar as opcoes e passar o que quisermos para ela;


export interface Options {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

// Formato de como os produtos sao retornados do backend;

export interface Products {
    items: Product[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

export interface Product {
    id?: number;
    price: string;
    name: string;
    image: string;
    rating: number;
}

// Passadas as mesmas propriedades do backend;

export interface PaginationParams {
    [key: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; // Index signature, que permite passar mais propriedades de qualquer tipo, como : sortBy: "name" ou  descending: true;
    page: number;
    perPage: number;
}