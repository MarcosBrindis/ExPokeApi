import { AfterViewInit, Component, ViewChild, Input,SimpleChanges,OnChanges,EventEmitter, Output } from '@angular/core';
import { MatTableModule, MatTable,MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TableDataSource } from './table-datasource';
import { UpperCasePipe } from '@angular/common';
import { ReplaceLettersPipe } from './replace-letters.pipe';



import { ProductsI } from '../../models/products';
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule,CommonModule,UpperCasePipe,ReplaceLettersPipe]
})

export class TableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductsI>;

  @Input() products: ProductsI[] = [];
  @Output() favoriteChange = new EventEmitter<ProductsI[]>();



  displayedColumns = ['name', 'url', 'favorite'];
  dataSource = new MatTableDataSource<ProductsI>();

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      // Inicializa `favorite` en `false` si no está definido
      this.products = this.products.map(product => ({
        ...product,
        favorite: product.favorite || false
      }));
      this.dataSource.data = this.products;
    }
  }

  toggleFavorite(product: ProductsI): void {
    product.favorite = !product.favorite;
    this.emitFavorites();
  }
  emitFavorites(): void {
    const favorites = this.products.filter(product => product.favorite);
    this.favoriteChange.emit(favorites); // Emitimos solo los productos favoritos
  }

}