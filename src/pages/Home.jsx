import { shape } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
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

  redirectToCategory = async ({ target }) => {
    const { history: { push } } = this.props;
    const { id } = target;
    push(`/category/${id}`);
  }

  render() {
    const { categorias } = this.state;

    return (
      <div data-testid="home-initial-message">
        <span>Digite algum termo de pesquisa ou escolha uma categoria.</span>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
        <aside>
          {categorias.map((categoria) => (
            <button
              data-testid="category"
              type="button"
              id={ categoria.id }
              key={ categoria.id }
              onClick={ this.redirectToCategory }
            >
              {categoria.name}
            </button>
          ))}
        </aside>
      </div>
    );
  }
}

Home.propTypes = {
  history: shape({}).isRequired,
};

export default Home;
