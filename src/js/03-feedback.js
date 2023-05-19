import throttle from 'lodash.throttle';

const refs = {
  email: document.querySelector('[name="email"]'),
  textarea: document.querySelector('[name="message"]'),
  form: document.querySelector('form'),
};

const FEEDBACK_DATA = 'feedback-form-state';
let feedbackData = JSON.parse(localStorage.getItem(FEEDBACK_DATA)) || {};

const recoverData = () => {
  refs.email.value = feedbackData.email || '';
  refs.textarea.value = feedbackData.message || '';
};

recoverData();

const updateFeedbackData = event => {
  feedbackData[event.target.name] = event.target.value;
  localStorage.setItem(FEEDBACK_DATA, JSON.stringify(feedbackData));
};

const onFormSubmitting = event => {
  event.preventDefault();

  if (refs.email.value && refs.textarea.value) {
    console.log(feedbackData);

    localStorage.removeItem(FEEDBACK_DATA);
    event.currentTarget.reset();
    feedbackData = {};
  } else {
    console.log('Please fill in all fields');
  }
};

refs.form.addEventListener('input', throttle(updateFeedbackData, 500));
refs.form.addEventListener('submit', onFormSubmitting);