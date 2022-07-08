import React, { Component } from 'react';
import Product from '../components/Product';
import getProductsFromId, {
  addProductsToCart,
  getProductsFromCart,
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

  loadCartProducts = async () => {
    const productsId = getProductsFromCart();
    productsId.map(async (id) => {
      const product = await getProductsFromId(id);
      this.setState((pastState) => ({
        cart: [...pastState.cart, product],
      }));
    });
    // console.log(await getProductsFromId(productsId[0]));
    // this.setState({ cart: productsList });
  };

  getProductQuantity = (productId) => {
    const { cart } = this.state;
    return cart.filter(({ id }) => id === productId).length;
  };

  render() {
    const { cart } = this.state;
    console.log(cart);
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
                <Product
                  product={ product }
                  quantity={ this.getProductQuantity(product.id) }
                />
                <span data-testid="shopping-cart-product-quantity">
                  {this.getProductQuantity(product.id)}
                </span>
              </section>
            ))}
          </>
        )}
      </section>
    );
  }
}

export default Cart;
