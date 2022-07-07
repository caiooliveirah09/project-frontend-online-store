import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <span>Digite algum termo de pesquisa ou escolha uma categoria.</span>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>
      </div>
    );
  }
}

export default Home;
