import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getProductsFromId, { addProductsToCart } from '../services/api';

class ProductPage extends React.Component {
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

  addToCart = async () => {
    const { productInfo: { id } } = this.state;
    addProductsToCart(id);
  }

  render() {
    const { productInfo } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        <h2 data-testid="product-detail-name">{ productInfo.title }</h2>
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
