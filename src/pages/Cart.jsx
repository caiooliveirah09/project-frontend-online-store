import React, { Component } from 'react';
import Product from '../components/Product';
import {
  getProductsFromCart,
  saveProductsToCart,
} from '../services/storage';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.loadCartProducts();
  }

  loadCartProducts = () => {
    const cartProducts = getProductsFromCart();
    this.setState({ cart: cartProducts });
  };

  getProductQuantity = (productId) => {
    const cartProducts = getProductsFromCart();
    const { quantity } = cartProducts.find(({ id }) => id === productId);
    return quantity;
  };

  findProductAtLocalStorage = (nowStorage, productId) => {
    for (let index = 0; index < nowStorage.length; index += 1) {
      if (nowStorage[index].id === productId) {
        return index;
      }
    }
  }

  decreaseAmountInCart = (productId) => {
    const localStorageNow = getProductsFromCart();
    const index = this.findProductAtLocalStorage(localStorageNow, productId);
    if (localStorageNow[index].quantity > 1) localStorageNow[index].quantity -= 1;
    saveProductsToCart(localStorageNow);
    this.setState({ cart: localStorageNow });
  };

  increaseAmountInCart = (productId) => {
    const localStorageNow = getProductsFromCart();
    const index = this.findProductAtLocalStorage(localStorageNow, productId);
    localStorageNow[index].quantity += 1;
    saveProductsToCart(localStorageNow);
    this.setState({ cart: localStorageNow });
  };

  clearCart = () => {
    saveProductsToCart([]);
    this.setState({ cart: [] });
  };

  render() {
    const { cart } = this.state;
    return (
      <section>
        {cart.length === 0 ? (
          <span data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </span>
        ) : (
          <>
            {cart.map((product) => (
              <div key={ product.id }>
                <Product product={ product } />
                <div>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.decreaseAmountInCart(product.id) }
                  >
                    -
                  </button>

                  <span data-testid="shopping-cart-product-quantity">
                    {this.getProductQuantity(product.id)}
                  </span>

                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ () => this.increaseAmountInCart(product.id) }
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div>
              <button type="button" onClick={ this.clearCart }>
                Esvaziar Carrinho
              </button>
            </div>
          </>
        )}
      </section>
    );
  }
}

export default Cart;
