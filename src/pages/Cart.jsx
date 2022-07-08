import React, { Component } from 'react';
import Product from '../components/Product';
import getProductsFromId, { getProductsFromCart } from '../services/api';

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
    // Linha 20 tá criando um novo array sem itens(IDs) repetidos!!
    const allProductsId = getProductsFromCart();
    const singleProductsId = [...new Set(allProductsId)];
    singleProductsId.map(async (productId) => {
      const product = await getProductsFromId(productId);
      this.setState((pastState) => ({
        cart: [...pastState.cart, product],
      }));
    });
  };

  getProductQuantity = (productId) => {
    const cart = getProductsFromCart();
    return cart.filter((id) => id === productId).length;
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
