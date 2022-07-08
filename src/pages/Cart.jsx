import React, { Component } from 'react';
import Product from '../components/Product';
import getProductsFromId, {
  addProductsToCart,
  getProductsFromCart,
  saveProductsToCart,
} from '../services/api';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.loadCartProducts();
  }

  loadCartProducts = () => {
    // Linha 20 tá criando um novo array sem IDs repetidos!!
    const allProductsId = getProductsFromCart();
    const eachProductId = [...new Set(allProductsId)];
    eachProductId.map(async (id) => {
      const product = await getProductsFromId(id);
      this.setState((pastState) => ({
        cart: [...pastState.cart, product],
      }));
    });
  };

  getProductQuantity = (productId) => {
    const cart = getProductsFromCart();
    return cart.filter((id) => id === productId).length;
  };

  decreaseAmountInCart = (productId) => {
    const localStorageNow = getProductsFromCart();
    const firstProduct = localStorageNow.find((id) => id === productId);
    const index = localStorageNow.indexOf(firstProduct);
    localStorageNow.splice(index, 1);
    saveProductsToCart(localStorageNow);
    this.setState({});
  };

  increaseAmountInCart = (productId) => {
    addProductsToCart(productId);
    this.setState({});
  };

  clearCart = () => {
    saveProductsToCart([]);
    this.setState({ cart: [] });
  };

  render() {
    const { cart } = this.state;
    return (
      <section>
        {cart.length === 0 ? (
          <span data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </span>
        ) : (
          <>
            {cart.map((product) => (
              <section key={ product.id }>
                <Product product={ product } />
                <div>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.decreaseAmountInCart(product.id) }
                  >
                    -
                  </button>

                  <span data-testid="shopping-cart-product-quantity">
                    {this.getProductQuantity(product.id)}
                  </span>

                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ () => this.increaseAmountInCart(product.id) }
                  >
                    +
                  </button>
                </div>
              </section>
            ))}
            <div>
              <button type="button" onClick={ this.clearCart }>
                Esvaziar Carrinho
              </button>
            </div>
          </>
        )}
      </section>
    );
  }
}

export default Cart;
