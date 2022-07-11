import React from 'react';
import PropTypes from 'prop-types';
import { addAssessments, readAssessments } from '../services/storage';

class Assessments extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      rate: '',
      evaluation: '',
      allAssessments: [],
      newAssessments: [],
    };
  }

  componentDidMount() {
    const localStorage = readAssessments();
    this.setState({ allAssessments: localStorage }, () => {
      this.takeAssessments();
    });
  }

  takeAssessments = () => {
    const { id } = this.props;
    const { allAssessments } = this.state;
    if (allAssessments !== null) {
      const newAssessments = allAssessments.filter((assessment) => assessment.id === id);
      this.setState({ newAssessments });
    }
  };

  onHandleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  getRate = ({ target }) => {
    this.setState({
      rate: target.checked ? target.value : '',
    });
  }

  saveAssessments = () => {
    const { id } = this.props;
    const { email, rate, evaluation } = this.state;
    const assessment = { email, rate, evaluation, id };
    addAssessments(assessment);
    this.setState({ email: '', rate: '', evaluation: '' });
    const localStorage = readAssessments();
    this.setState({ allAssessments: localStorage }, () => {
      this.takeAssessments();
    });
  };

  render() {
    const { email, evaluation, newAssessments } = this.state;
    return (
      <div>
        <span> Avaliações </span>
        <form>
          <label htmlFor="email">
            Email
            <input
              data-testid="product-detail-email"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={ this.onHandleChange }
              value={ email }
            />
          </label>
          <label htmlFor="rate">
            <input
              data-testid="1-rating"
              value="1"
              type="checkbox"
              onChange={ this.getRate }
            />
            <input
              data-testid="2-rating"
              value="2"
              type="checkbox"
              onChange={ this.getRate }
            />
            <input
              data-testid="3-rating"
              value="3"
              type="checkbox"
              onChange={ this.getRate }
            />
            <input
              data-testid="4-rating"
              value="4"
              type="checkbox"
              onChange={ this.getRate }
            />
            <input
              data-testid="5-rating"
              value="5"
              type="checkbox"
              onChange={ this.getRate }
            />
          </label>
          <textarea
            data-testid="product-detail-evaluation"
            name="evaluation"
            cols="30"
            rows="10"
            placeholder="Mensagem (opcional)"
            onChange={ this.onHandleChange }
            value={ evaluation }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.saveAssessments }
          >
            Avaliar
          </button>
        </form>
        { newAssessments.map((assessment) => (
          <div key={ assessment.email }>
            <span>
              { assessment.email }
            </span>
            <br />
            <span>
              { assessment.evaluation }
            </span>
            <br />
            <span>
              { assessment.rate }
            </span>
          </div>
        ))}
      </div>
    );
  }
}

Assessments.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Assessments;
