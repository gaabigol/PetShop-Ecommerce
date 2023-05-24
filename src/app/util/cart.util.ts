import { CartItem } from '../models/cart-item.model';
import { Cart } from '../models/cart.model';

export class CartUtil {
  public static get(): Cart {
    //recupera dos dados do localStorage
    const data = localStorage.getItem('petshopcart');
    //caso não haja dados, retorna um carrinho novo
    if (!data) {
      return new Cart();
    }
    //caso haja dados, retorna o carrinho com dados
    return JSON.parse(data);
  }

  public static add(
    id: string,
    product: string,
    quantiy: number,
    price: number,
    image: string
  ): void {
    //obtém carrinho
    let cart = this.get();
    // gera novo carrinho
    const item = new CartItem(id, product, quantiy, price, image);
    //adiciona carrinho
    cart.items.push(item);
    //salva no localStorage
    localStorage.setItem('petshopcart', JSON.stringify(cart));
  }

  public static update(cart: Cart){
    //salva/atualiza no localStorage
    localStorage.setItem('petshopcart', JSON.stringify(cart));
  }

  public static clear(){
    localStorage.removeItem('petshopcart');
  }
}
