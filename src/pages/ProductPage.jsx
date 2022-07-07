import React, { Component } from 'react';
import { addProductsToCart } from '../services/api';

class ProductPage extends Component {
  addToCart = async () => {
    const { productInfo: { id } } = this.state;
    addProductsToCart(id);
  }

  render() {
    return (
      <button
        type="button"
        data-testid="product-detail-add-to-cart"
        onClick={ this.addToCart }
      >
        Adicionar ao carrinho
      </button>
    );
  }
}

export default ProductPage;
