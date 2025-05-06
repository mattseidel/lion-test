import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { html, LitElement } from 'lit';
import { LionForm } from '@lion/form';

export class Formulary extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'lion-form': LionForm,
    };
  }

  constructor() {
    super();
    this.isSubmitting = false;
    this.serializedValue = {};
    this.errors = {};
    this.validate = this.validate.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  firstUpdated() {
    this._formElement = this.renderRoot.querySelector('lion-form');
    this._formElement.addEventListener('reset', e => {
      e.preventDefault();
      this.reset();
    });
  }

  static get properties() {
    return {
      isSubmitting: { type: Boolean },
      serializedValue: { type: Object },
      errors: { type: Object },
    };
  }

  async submit() {
    const errors = await this._formElement.validate();
    if (errors.length > 0) {
      this.errors = errors;
      return;
    }
    this.serializedValue = await this._formElement.serializeValue();
    this.dispatchEvent(/* evento */);
  }

  async isValid() {
    await this.updateComplete;
    const form = this.renderRoot.querySelector('lion-form');
    if (!form) {
      throw new Error('Form not found');
    }
    await form.validate();
    return !form.hasFeedbackFor.includes('error');
  }

  reset() {
    this._formElement.resetGroup();
    this.serializedValue = {};
    this.errors = {};
  }

  async validate() {
    await this._formElement.validate();
    return !this._formElement.hasFeedbackFor.includes('error');
  }

  render() {
    return html`
      <lion-form>
        <form @submit="${this.submit}">
          <slot></slot>
        </form>
      </lion-form>
    `;
  }
}

customElements.define('formulary-component', Formulary);
