import { LitElement, css, html } from 'lit';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import '@lion/ui/define/lion-input-amount.js';
import { LionInputIban } from '@lion/ui/input-iban.js';

export class IbanInput extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'lion-input-iban': LionInputIban,
    };
  }

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
