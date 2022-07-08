import { number, shape, string } from 'prop-types';
import React, { Component } from 'react';

class Product extends Component {
  render() {
    const { product } = this.props;
    const { price, title, thumbnail } = product;
    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <h2 data-testid="shopping-cart-product-name">{title}</h2>
        <span>{price}</span>
      </div>
    );
  }
}

Product.propTypes = {
  product: shape({
    price: number,
    title: string,
    thumbnail: string,
  }).isRequired,
};

export default Product;
