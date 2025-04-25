import { LitElement, css, html } from 'lit';
import '@lion/ui/define/lion-input-amount.js';

export class IbanInput extends LitElement {
  static styles = css`
    input {
      font-size: 16px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `;
  
  render() {
    return html`
      <lion-input-iban label="Account" name="account"></lion-input-iban>
    `;
  }
}

customElements.define('iban-input', IbanInput);
