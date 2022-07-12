import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategory,
  getProductsFromQuery,
} from '../services/api';
import Product from '../components/Product';
import { addProductsToCart, getProductsFromCart } from '../services/storage';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      haveInfo: true,
      categories: [],
      productsInfo: [],
      productsList: [],
      cartAmount: 0,
    };
  }

  componentDidMount() {
    this.handleCategories();
    this.getAmountOfItemsInCart();
  }

  handleCategories = async () => {
    const response = await getCategories();
    this.setState({ categories: response });
  };

  handleChange = ({ target }) => {
    this.setState({ searchInput: target.value });
  };

  searchProducts = async () => {
    const { searchInput } = this.state;
    const { results } = await getProductsFromQuery(searchInput);
    if (results.length !== 0) {
      this.setState({ productsInfo: results, haveInfo: true });
    } else {
      this.setState({ haveInfo: false });
    }
  };

  getProducts = async ({ target }) => {
    const { id } = target;
    const { results } = await getProductsFromCategory(id);
    console.log(results);
    this.setState({
      productsInfo: [],
      productsList: results,
    });
  };

  getAmountOfItemsInCart = () => {
    const localStorageNow = getProductsFromCart();
    const cartTotal = localStorageNow
      .reduce((acc, curr) => acc + curr.quantity, 0);
    if (localStorageNow) {
      this.setState({ cartAmount: cartTotal });
    }
  };

  addToCart = ({ target }) => {
    const { productsList } = this.state;
    const product = productsList.find(({ id }) => id === target.id);
    addProductsToCart(product);
    this.getAmountOfItemsInCart();
  };

  render() {
    const { categories, productsInfo, productsList, haveInfo, cartAmount } = this.state;
    return (
      <div data-testid="home-initial-message">
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
          {' '}
          <span data-testid="shopping-cart-size">{cartAmount}</span>
        </Link>
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
        <aside>
          {categories.map(({ name, id }) => (
            <button
              data-testid="category"
              type="button"
              id={ id }
              key={ id }
              onClick={ this.getProducts }
            >
              {name}
            </button>
          ))}
        </aside>
        {haveInfo ? (
          productsInfo.map((product) => (
            <div key={ product.id }>
              <Product product={ product } />
              { product.shipping.free_shipping
              && <h3 data-testid="free-shipping">Frete Grátis</h3> }
            </div>
          ))
        ) : (
          <span>Nenhum produto foi encontrado</span>
        )}
        {productsInfo.length === 0
          && productsList.length > 0
          && productsList.map((product) => (
            <div key={ product.id }>
              <Product product={ product } />
              { product.shipping.free_shipping
              && <h3 data-testid="free-shipping">Frete Grátis</h3> }
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
      </div>
    );
  }
}

export default Home;
