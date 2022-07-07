import React, { Component } from 'react';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  render() {
    const { cart } = this.state;
    return (
      <section>
        { cart.length === 0 ? (
          <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
        ) : (
          <div />
        ) }
      </section>
    );
  }
}

export default Cart;
