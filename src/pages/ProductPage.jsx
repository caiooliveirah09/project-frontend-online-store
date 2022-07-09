import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';
import { addProductsToCart } from '../services/storage';

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      productInfo: {},
    };
  }

  componentDidMount() {
    this.getProductInfo();
  }

  getProductInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getProductsFromId(id);
    this.setState({ productInfo: response });
  }

  addToCart = () => {
    const { productInfo } = this.state;
    addProductsToCart(productInfo);
  }

  render() {
    const { productInfo } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        <h2 data-testid="product-detail-name">{ productInfo.title }</h2>
        <p>{ productInfo.available_quantity }</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.addToCart }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductPage;
