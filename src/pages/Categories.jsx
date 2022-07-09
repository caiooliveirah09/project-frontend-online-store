import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { getProductsFromCategory, getProductsFromId } from '../services/api';
import { addProductsToCart } from '../services/storage';

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const { match: { params: { id } } } = this.props;
    const { results } = await getProductsFromCategory(id);
    this.setState({ productsList: results });
  }

  addToCart = ({ target }) => {
    const { productsList } = this.state;
    const { id } = target;
    const productInfo = productsList.find((item) => item.id === id);
    addProductsToCart(productInfo);
  }

  render() {
    const { productsList } = this.state;
    return (
      <section>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        { productsList.map((product) => (
          <div key={ product.id }>
            <Product product={ product } />
            <button
              type="button"
              id={ product.id }
              onClick={ this.addToCart }
              data-testid="product-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </section>
    );
  }
}

Categories.propTypes = {
  match: shape({}).isRequired,
};

export default Categories;
