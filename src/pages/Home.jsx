import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Card from '../components/Card';

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
    const response = await getProductsFromCategoryAndQuery(searchInput);
    if (response.results.length !== 0) {
      this.setState({ productsInfo: response.results, haveInfo: true });
    } else {
      this.setState({ haveInfo: false });
    }
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
          {categorias.map((categoria) => (
            <button data-testid="category" type="button" key={ categoria.id }>
              {categoria.name}
            </button>
          ))}
        </aside>
        { haveInfo ? productsInfo.map((product) => (
          <Card
            key={ product.id }
            id={ product.id }
            title={ product.title }
            thumbnail={ product.thumbnail }
          />
        )) : <span>Nenhum produto foi encontrado</span>}
      </div>
    );
  }
}

export default Home;
