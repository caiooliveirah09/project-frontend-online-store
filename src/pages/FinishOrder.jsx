import React, { Component } from 'react';

class FinishOrder extends Component {
  render() {
    return (
      <div>
        <form action="">
          <div className="groupAbout">

            <label htmlFor="fullname">
              <input
                data-testid="checkout-fullname"
                type="text"
                id="fullname"
              />
            </label>
            <label htmlFor="cpf">
              <input
                data-testid="checkout-cpf"
                type="number"
                id="cpf"
              />
            </label>
            <label htmlFor="email">
              <input
                data-testid="checkout-email"
                type="text"
                id="email"
              />
            </label>
            <label htmlFor="phone">
              <input
                data-testid="checkout-phone"
                type="number"
                id="phone"
              />
            </label>
          </div>
          <div className="groupAddress">
            <label htmlFor="cep">
              <input
                data-testid="checkout-cep"
                type="number"
                id="cep"
              />
            </label>
            <label htmlFor="address">
              <input
                data-testid="checkout-address"
                type="text"
                id="address"
              />
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default FinishOrder;
