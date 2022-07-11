import React, { Component } from 'react';
import Product from '../components/Product';
import {
  addProductsToCart,
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

  stockControl = (productId) => {
    const storage = getProductsFromCart();
    const product = storage.find(({ id }) => id === productId);
    const { inStock, quantity } = product;
    return quantity < inStock;
  }

  findProductAtLocalStorage = (storage, productId) => (
    storage.indexOf(storage.find(({ id }) => id === productId)));

  decreaseAmountInCart = (productId) => {
    const storage = getProductsFromCart();
    const index = this.findProductAtLocalStorage(storage, productId);
    if (storage[index].quantity > 1) storage[index].quantity -= 1;
    saveProductsToCart(storage);
    this.setState({ cart: storage });
  };

  increaseAmountInCart = (productId) => {
    if (this.stockControl(productId)) {
      addProductsToCart({ id: productId });
      const storage = getProductsFromCart();
      this.setState({ cart: storage });
    }
  };

  clearCart = () => {
    saveProductsToCart([]);
    this.loadCartProducts();
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
