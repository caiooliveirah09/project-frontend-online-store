import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';
import style from './categoriesList.module.scss';

export default class CategoriesList extends React.Component {
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

  render() {
    const { categorias } = this.state;
    const { redirectToCategory } = this.props;
    return (
      <div className={ style.sidebarContainer }>
        <aside>
          {categorias.map(({ name, id }) => (
            <button
              data-testid="category"
              type="button"
              id={ id }
              key={ id }
              onClick={ redirectToCategory }
            >
              {name}
            </button>
          ))}
        </aside>
      </div>
    );
  }
}

CategoriesList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  redirectToCategory: PropTypes.func,
}.isRequired;
