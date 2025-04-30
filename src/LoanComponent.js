import { html, css, LitElement } from 'lit';
import '@webcomponents/scoped-custom-element-registry';
import './components/form/IbanInput.js';
import './components/form/form.js';
import './components/button.js';

export class LoanComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--loan-component-text-color, #000);
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: var(--loan-component-bg-color, #fff);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      height: 100%;
      margin: 0 auto;
    }
  `;

  static properties = {
    header: { type: String },
    counter: { type: Number },
  };

  constructor() {
    super();
    this.header = 'Hey there';
    this.counter = 5;
  }

  submit() {
    const form = this.renderRoot.querySelector('formulary-component');
    if (!form) {
      throw new Error('Form not found');
    }
    form.submit();
  }

  render() {
    return html`
      <formulary-component @form-submitted="${console.log}">
        <iban-input></iban-input>
        <loan-button
          type="submit"
          label="Submit"
          @click="${this.submit}"
          className="submit-button"
        ></loan-button>
      </formulary-component>
    `;
  }
}
