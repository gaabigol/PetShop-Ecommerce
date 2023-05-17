import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent implements OnInit {
  public products$: Observable<any[]> | undefined;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.products$ = this.data.getProducts();
  }
}
