import { number, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './product.module.scss';

class Product extends Component {
  render() {
    const {
      product: { id, price, thumbnail, title },
    } = this.props;
    return (
      <div data-testid="product" className={ style.product }>
        <img src={ thumbnail } alt={ title } />
        <h2 data-testid="shopping-cart-product-name">{title}</h2>
        <span>{price}</span>
        <Link
          className={ style.linkProduct }
          data-testid="product-detail-link"
          to={ `/product/${id}` }
        >
          Ver informações
        </Link>
      </div>
    );
  }
}

Product.propTypes = {
  product: shape({
    id: string,
    price: number,
    thumbnail: string,
    title: string,
  }).isRequired,
};

export default Product;
