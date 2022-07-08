import React from 'react';
import PropTypes from 'prop-types';

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
    const localStorage = this.readAssessments();
    this.setState({ allAssessments: localStorage }, () => {
      this.takeAssessments();
    });
  }

  takeAssessments = () => {
    const { id } = this.props;
    const { allAssessments } = this.state;
    console.log(allAssessments);
    if (allAssessments !== null) {
      const newAssessments = allAssessments.filter((assessment) => assessment.id === id);
      this.setState({ newAssessments });
    }
  };

  getEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  getEvaluation = (event) => {
    this.setState({ evaluation: event.target.value });
  }

  getRate = (event) => {
    if (event.target.checked) {
      this.setState({ rate: event.target.value });
    } else {
      this.setState({ rate: '' });
    }
  }

  saveAssessments = () => {
    const { id } = this.props;
    const { email, rate, evaluation } = this.state;
    const assessment = { email, rate, evaluation, id };
    this.addAssessments(assessment);
    this.setState({ email: '', rate: '', evaluation: '' });
    const localStorage = this.readAssessments();
    this.setState({ allAssessments: localStorage }, () => {
      this.takeAssessments();
    });
  };

  readAssessments = () => JSON.parse(localStorage.getItem('assessments_products'));

  saveLocalStorage = (assessments) => {
    const ASSESSMENTS_KEY = 'assessments_products';
    if (!JSON.parse(localStorage.getItem(ASSESSMENTS_KEY))) {
      localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify([]));
    }
    localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(assessments));
  }

  addAssessments = (assessment) => {
    const ASSESSMENTS_KEY = 'assessments_products';
    if (!JSON.parse(localStorage.getItem(ASSESSMENTS_KEY))) {
      localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify([]));
    }
    if (assessment) {
      const assessments = this.readAssessments();
      this.saveLocalStorage([...assessments, assessment]);
    }
  }

  render() {
    const { email, evaluation, newAssessments } = this.state;
    return (
      <div>
        <span> Avaliações </span>
        <form>
          <label htmlFor="email">
            <input
              data-testid="product-detail-email"
              type="text"
              placeholder="Email"
              onChange={ this.getEmail }
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
          <label htmlFor="evaluation">
            <textarea
              data-testid="product-detail-evaluation"
              name="evaluation"
              cols="30"
              rows="10"
              placeholder="Mensagem (opcional)"
              onChange={ this.getEvaluation }
              value={ evaluation }
            />
          </label>
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
