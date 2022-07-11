import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { getProductsFromCart } from '../services/storage';

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
                <span data-testid="shopping-cart-product-quantity">
                  {this.getProductQuantity(product.id)}
                </span>
              </div>
            ))}
            <Link data-testid="checkout-products" to="/finish">Finalizar Compra</Link>
          </>
        )}
      </section>
    );
  }
}

export default Cart;
