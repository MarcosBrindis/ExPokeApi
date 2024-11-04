import { Component,Input } from '@angular/core';
import { ProductsI } from '../../models/products';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  @Input() favorites: ProductsI[] = [];
}
