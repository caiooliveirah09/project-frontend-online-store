import React from 'react';
import PropTypes from 'prop-types';

export default class FormSearch extends React.Component {
  render() {
    const { handleChange, searchProducts } = this.props;
    return (
      <form action="">
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        <label htmlFor="search">
          <input
            id="search"
            data-testid="query-input"
            type="text"
            onChange={ handleChange }
            placeholder="Pesquisar"
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ searchProducts }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

FormSearch.propTypes = {
  handleChange: PropTypes.func,
  searchProducts: PropTypes.func,

}.isRequired;
