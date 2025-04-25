import { html, css, LitElement } from 'lit';
import "./components/form/IbanInput.js";

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
      width: 100%;
      max-width: 600px;
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

  __increment() {
    this.counter += 1;
  }

  render() {
    return html`
      <form>
        <iban-input></iban-input> 
      </form>
    `;
  }
}
