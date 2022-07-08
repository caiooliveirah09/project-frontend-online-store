import { shape } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { addProductsToCart, getProductsFromCategory } from '../services/api';

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
    this.setState({
      productsList: results,
    });
  }

  addToCart = async ({ target }) => {
    const { id } = target;
    addProductsToCart(id);
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
              data-testid="product-add-to-cart"
              onClick={ this.addToCart }
              id={ product.id }
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
