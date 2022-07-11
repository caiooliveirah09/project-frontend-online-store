export const readAssessments = () => (
  JSON.parse(localStorage.getItem('assessments_products')));

export const saveLocalStorage = (assessments) => {
  const ASSESSMENTS_KEY = 'assessments_products';
  if (!JSON.parse(localStorage.getItem(ASSESSMENTS_KEY))) {
    localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify([]));
  }
  localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(assessments));
};

export const addAssessments = (assessment) => {
  const ASSESSMENTS_KEY = 'assessments_products';
  if (!JSON.parse(localStorage.getItem(ASSESSMENTS_KEY))) {
    localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify([]));
  }
  if (assessment) {
    const assessments = readAssessments();
    saveLocalStorage([...assessments, assessment]);
  }
};
