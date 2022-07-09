import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromQuery } from '../services/api';
import Product from '../components/Product';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
      searchInput: '',
      productsInfo: [],
      haveInfo: true,
    };
  }

  componentDidMount() {
    this.handleCategories();
  }

  handleCategories = async () => {
    const response = await getCategories();
    this.setState({
      categorias: response,
    });
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchInput: value });
  }

  searchProducts = async () => {
    const { searchInput } = this.state;
    const response = await getProductsFromQuery(searchInput);
    if (response.results.length !== 0) {
      this.setState({ productsInfo: response.results, haveInfo: true });
    } else {
      this.setState({ haveInfo: false });
    }
  }

  redirectToCategory = ({ target }) => {
    const { history: { push } } = this.props;
    const { id } = target;
    push(`/category/${id}`);
  }

  render() {
    const { categorias, productsInfo, haveInfo } = this.state;
    return (
      <div data-testid="home-initial-message">
        <span>Digite algum termo de pesquisa ou escolha uma categoria.</span>
        <label htmlFor="input">
          <input
            data-testid="query-input"
            type="text"
            onChange={ this.handleChange }
          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.searchProducts }
          >
            Pesquisar
          </button>
        </label>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        <aside>
          {categorias.map(({ name, id }) => (
            <button
              data-testid="category"
              type="button"
              id={ id }
              key={ id }
              onClick={ this.redirectToCategory }
            >
              {name}
            </button>
          ))}
        </aside>
        { haveInfo ? productsInfo.map((product) => (
          <Product
            key={ product.id }
            product={ product }
          />
        )) : <span>Nenhum produto foi encontrado</span>}
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Home;
