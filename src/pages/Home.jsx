import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <span>Digite algum termo de pesquisa ou escolha uma categoria.</span>
      </div>
    );
  }
}

export default Home;
