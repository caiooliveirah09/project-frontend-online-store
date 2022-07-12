import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';
import { addProductsToCart, getProductsFromCart } from '../services/storage';
import style from './productPage.module.scss';
import Assessments from '../components/Assessments';

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      productInfo: {},
      cartAmount: 0,
    };
  }

  componentDidMount() {
    this.getProductInfo();
    this.getAmountOfItemsInCart();
  }

  getProductInfo = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getProductsFromId(id);
    this.setState({ productInfo: response });
  };

  getAmountOfItemsInCart = () => {
    const localStorageNow = getProductsFromCart();
    const cartTotal = localStorageNow
      .reduce((acc, curr) => acc + curr.quantity, 0);
    if (localStorageNow) {
      this.setState({ cartAmount: cartTotal });
    }
  };

  addToCart = () => {
    const { productInfo } = this.state;
    addProductsToCart(productInfo);
    this.getAmountOfItemsInCart();
  }

  render() {
    const { productInfo, cartAmount } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        <header>
          <Link to="/">
            <h2>Voltar para Home</h2>
          </Link>
          <Link to="/cart" data-testid="shopping-cart-button">
            Carrinho
            <span data-testid="shopping-cart-size">{cartAmount}</span>
          </Link>
        </header>
        <div className={ style.container }>
          <div className={ style.cardImg }>
            <img src={ productInfo.thumbnail } alt="" />
          </div>
          <div className={ style.productDescription }>
            <h2 data-testid="product-detail-name">{ productInfo.title }</h2>
            <strong>{ `R$ ${productInfo.price}` }</strong>
          </div>
        </div>
        <Assessments id={ id } />
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
