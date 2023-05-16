import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent {
  constructor(data: DataService) {}

  ngOnInit() {}
}
