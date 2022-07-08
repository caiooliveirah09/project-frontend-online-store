import React, { Component } from 'react';
import Product from '../components/Product';
import { getProductsFromCart } from '../services/api';

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
    const productsList = getProductsFromCart();
    this.setState({ cart: productsList });
  };

  getProductQuantity = (productId) => {
    const { cart } = this.state;
    return cart.filter(({ id }) => id === productId).length;
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
                <span data-testid="shopping-cart-product-quantity">
                  {this.getProductQuantity(product.id)}
                </span>
              </section>
            ))}
          </>
        )}
      </section>
    );
  }
}

export default Cart;
