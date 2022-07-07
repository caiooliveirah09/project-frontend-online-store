import React from 'react';
import { getCategories } from '../services/api';

class Home extends React.Component {
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
    // const { categorias } = this.state;
    const response = await getCategories();
    this.setState({
      categorias: response,
    });
  };

  render() {
    const { categorias } = this.state;

    return (
      <div data-testid="home-initial-message">
        <span>Digite algum termo de pesquisa ou escolha uma categoria.</span>
        <aside>
          {categorias.map((categoria) => (
            <button data-testid="category" type="button" key={ categoria.id }>
              {categoria.name}
            </button>
          ))}
        </aside>
      </div>
    );
  }
}

export default Home;
