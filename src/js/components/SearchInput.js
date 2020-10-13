export class SearchInput {
  constructor(form) {
    this.form = form;
    this._inputValidate = this._inputValidate.bind(this);
    this.form.addEventListener('input', this.inputValidate);
  }

  _inputValidate() {
    const inputs = Array.from(this.form.querySelectorAll('.search__input'));
    const submitButton = this.form.querySelector('.button_submit');
    const spanError = this.form.querySelector('.search__error');
    const isValid = inputs.every(function (input) {
      return (!(input.value.length === 0) && !(input.value.replace(/\s/g, '') === ''));
    });
    if (isValid) {
      submitButton.classList.add('button_active');
      submitButton.removeAttribute('disabled');
      spanError.setAttribute('style', `display: none`);
    } else {
      submitButton.classList.remove('button_active');
      submitButton.setAttribute('disabled', true);
      spanError.setAttribute('style', `display: block`);
    }
  }

  lockButton() {
    const submitButton = this.form.querySelector('.button_submit');
    submitButton.classList.remove('button_active');
    submitButton.setAttribute('disabled', true);
  }

  unlockButton() {
    const submitButton = this.form.querySelector('.button_submit');
    submitButton.classList.add('button_active');
    submitButton.removeAttribute('disabled');
  }
}