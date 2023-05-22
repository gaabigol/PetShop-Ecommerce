import { CartItem } from './Cart-Item.model';

export class Cart {
  constructor(
    public items: CartItem[] = []
    ) {}
}
