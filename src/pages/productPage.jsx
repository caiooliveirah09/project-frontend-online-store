import React from 'react';
import PropTypes from 'prop-types';
import getProductFromId from '../services/api';

class productPage extends React.Component {
  constructor() {
    super();
    this.state = {
      productInfo: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState({ }, async () => {
      const response = await getProductFromId(id);
      this.setState({ productInfo: response });
    });
  }

  render() {
    const { productInfo } = this.state;
    return (
      <div>
        <span data-testid="product-detail-name">{ productInfo.title }</span>
      </div>
    );
  }
}

productPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default productPage;
