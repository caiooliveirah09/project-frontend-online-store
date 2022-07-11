import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromQuery } from '../services/api';
import Product from '../components/Product';
import FormSearch from '../components/FormSearch';
import style from './home.module.scss';
import CategoriesList from '../components/CategoriesList';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      productsInfo: [],
      haveInfo: true,
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchInput: value });
  }

  redirectToCategory = ({ target }) => {
    const {
      history: { push },
    } = this.props;
    const { id } = target;
    push(`/category/${id}`);
  };

  searchProducts = async () => {
    const { searchInput } = this.state;
    const response = await getProductsFromQuery(searchInput);
    if (response.results.length !== 0) {
      this.setState({ productsInfo: response.results, haveInfo: true });
    } else {
      this.setState({ haveInfo: false });
    }
  }

  render() {
    const { productsInfo, haveInfo } = this.state;
    return (
      <div data-testid="home-initial-message" className={ style.container }>
        <CategoriesList
          redirectToCategory={ this.redirectToCategory }
        />
        <main className={ style.mainContainer }>
          <div className={ style.search }>
            <FormSearch
              handleChange={ this.handleChange }
              searchProducts={ this.searchProducts }
            />
            <Link to="/cart" data-testid="shopping-cart-button">
              Carrinho
            </Link>
          </div>
          <div className={ style.products }>
            { haveInfo ? productsInfo.map((product) => (
              <Product
                key={ product.id }
                product={ product }
              />
            )) : <span>Nenhum produto foi encontrado</span>}
          </div>
        </main>
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
