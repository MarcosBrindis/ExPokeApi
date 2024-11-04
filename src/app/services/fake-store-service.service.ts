import { ProductsI } from '../models/products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FakeStoreServiceService {
  private url: string = 'https://pokeapi.co/api/v2/pokemon';
  private headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductsI[]> {
    return this.http.get<any>(this.url, { headers: this.headers }).pipe(
      map(response => response.results) // Extrae `results` de la respuesta
    );
  }
}