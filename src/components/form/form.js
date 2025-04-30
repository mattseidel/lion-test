import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { html, LitElement } from 'lit';
import { LionForm } from '@lion/form';

export class Formulary extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'lion-form': LionForm,
    };
  }

  static get properties() {
    return {
      isSubmitting: { type: Boolean },
      serializedValue: { type: Object },
      errors: { type: Object },
    };
  }

  async submit() {
    this.isSubmitting = true;
    console.log(this._formElement.childNodes.entries);

    this.serializedValue = await this._formElement.serializeValue();
    this.dispatchEvent(
      new CustomEvent('form-submitted', {
        detail: this.serializedValue,
        bubbles: true,
        composed: true,
      }),
    );
    this.errors = await this._formElement.validate();
    this.isSubmitting = false;
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

  firstUpdated() {
    this._formElement = this.renderRoot.querySelector('lion-form');
  }

  render() {
    return html`
      <lion-form @submit="${this.submit}">
        <form>
          <slot></slot>
        </form>
      </lion-form>
    `;
  }
}

customElements.define('formulary-component', Formulary);
