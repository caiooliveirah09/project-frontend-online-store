import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends React.Component {
  render() {
    const { title, thumbnail, id } = this.props;
    return (
      <div data-testid="product" key={ id }>
        <span>{title}</span>
        <img alt={ title } src={ thumbnail } />
        <Link to={ `/product/${id}` }>Ver informações</Link>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
