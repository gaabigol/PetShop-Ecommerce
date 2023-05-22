import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { CartUtil } from 'src/app/util/cart.util';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(private toastr: ToastrService) {}

  ngOnInit() {}

  addToCart() {
    CartUtil.add(
      this.product._id,
      this.product.title,
      1,
      this.product.price,
      this.product.image[0]),
      this.toastr.success(`${this.product.title} adicionado ao carrinho`, `Produto Adicionado`);
  }
}
