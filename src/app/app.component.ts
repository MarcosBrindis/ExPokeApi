import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FakeStoreServiceService } from './services/fake-store-service.service';
import { ProductsI } from './models/products';
import { TableComponent } from './component/table/table.component';
import { FavoriteComponent } from './component/favorite/favorite.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TableComponent,FavoriteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'apirest1';

  dataSource: ProductsI[] = [];
  favorites: ProductsI[] = [];

  constructor(private fakeStoreService: FakeStoreServiceService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.fakeStoreService.getProducts().subscribe(
      data => {
        this.dataSource = data.map(product => ({
          ...product,
          favorite: product.favorite || false
        }));
        console.log(this.dataSource);
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  updateFavorites(favorites: ProductsI[]): void {
    this.favorites = favorites; // Actualiza la lista de favoritos
  }
}