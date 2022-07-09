import React, { Component } from 'react';
import Product from '../components/Product';
import { getProductsFromCart, saveProductsToCart } from '../services/storage';

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
              <section key={ product.id }>
                <Product product={ product } />
                <div>
                  <span data-testid="shopping-cart-product-quantity">
                    {this.getProductQuantity(product.id)}
                  </span>
                </div>
              </section>
            ))}
          </>
        )}
      </section>
    );
  }
}

export default Cart;
