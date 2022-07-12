import React, { Component } from 'react';
import { getProductsFromCart } from '../services/storage';
import style from './finishOrder.module.scss';

class FinishOrder extends Component {
  constructor() {
    super();
    this.state = {
      cartFinish: [],
      totalPrice: [],
    };
  }

  componentDidMount() {
    this.loadCartProducts();
    this.totalPrice();
  }

  totalPrice = () => {
    const cartProducts = getProductsFromCart();
    const soma = cartProducts
      .map((x) => x.price)
      .reduce((a, b) => a + b, 0);
    this.setState({ totalPrice: soma });
  }

  loadCartProducts = () => {
    const cartProducts = getProductsFromCart();
    this.setState({ cartFinish: cartProducts });
  };

  render() {
    const { cartFinish, totalPrice } = this.state;

    return (
      <div className={ style.container }>
        <div className={ style.productCart }>
          <h2> Revise seus Produtos </h2>
          {cartFinish.map((product) => (
            <div key={ product.id } className={ style.product }>
              <img src={ product.thumbnail } alt="" />
              <p>{product.title}</p>
              <strong>{`R$ ${product.price}`}</strong>

            </div>
          ))}

          <h3>{`Total: R$ ${totalPrice}`}</h3>

        </div>

        <form action="">
          <h2>Infomacoes do comprador</h2>
          <div className={ style.groupAbout }>

            <label htmlFor="fullname">
              <input
                placeholder="Nome Completo"
                data-testid="checkout-fullname"
                type="text"
                id="fullname"
              />
            </label>
            <label htmlFor="cpf">
              <input
                placeholder="CPF"
                data-testid="checkout-cpf"
                type="text"
                id="cpf"
              />
            </label>
            <label htmlFor="email">
              <input
                placeholder="E-mail"
                data-testid="checkout-email"
                type="text"
                id="email"
              />
            </label>
            <label htmlFor="phone">
              <input
                placeholder="Telefone"
                data-testid="checkout-phone"
                type="text"
                id="phone"
              />
            </label>
          </div>
          <div className={ style.groupAddress }>
            <label htmlFor="cep">
              <input
                className={ style.cep }
                placeholder="Cep"
                data-testid="checkout-cep"
                type="text"
                id="cep"
              />
            </label>
            <label htmlFor="address">
              <input
                className={ style.address }
                placeholder="Endereco"
                data-testid="checkout-address"
                type="text"
                id="address"
              />
            </label>
          </div>
          <div className={ style.groupComplement }>
            <label htmlFor="complement">
              <input
                type="text"
                id="complement"
                placeholder="Complemento"
              />
            </label>
            <label htmlFor="number">
              <input
                type="number"
                id="number"
                placeholder="Numero"
              />
            </label>
            <label htmlFor="city">
              <input
                type="text"
                id="city"
                placeholder="Cidade"
              />
            </label>
            <select name="state" id="state">
              <option value="state">Estado</option>
            </select>
          </div>
        </form>
      </div>
    );
  }
}

export default FinishOrder;
