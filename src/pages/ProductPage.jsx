import React from 'react';
import PropTypes from 'prop-types';
import getProductsFromId, { addProductsToCart } from '../services/api';
import Product from '../components/Product';

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
    console.log(productInfo);
    return (
      <div>
        {/* <h2 data-testid="product-detail-name">{ productInfo.title }</h2> */}
        <Product product={ productInfo } />
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
