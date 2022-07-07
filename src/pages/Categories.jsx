import { shape } from 'prop-types';
import React, { Component } from 'react';
import Product from '../components/Product';
import { getProductsFromCategory } from '../services/api';

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

  render() {
    const { productsList } = this.state;
    return (
      <section>
        { productsList.map((product) => (
          <Product key={ product.id } product={ product } />
        ))}
      </section>
    );
  }
}

Categories.propTypes = {
  match: shape({}).isRequired,
};

export default Categories;
