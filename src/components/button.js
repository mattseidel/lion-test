import { LionButton } from '@lion/ui/button.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { html, LitElement, css } from 'lit';

export class Button extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'lion-button': LionButton,
    };
  }

  static styles = css`
    lion-button {
      font-size: 16px;
      padding: 10px 20px;
      border: none;
      border-radius: 12px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      width: 100%;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-weight: bold;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition:
        box-shadow 0.3s ease,
        transform 0.3s ease;
      margin: 20px 0;
      transition: background-color 0.3s ease;
    }
    lion-button:hover {
      background-color: #0056b3;
    }
    lion-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    lion-button.loading {
      background-color: #007bff;
      cursor: wait;
    }
  `;

  static get properties() {
    return {
      type: { type: String },
      label: { type: String },
      disabled: { type: Boolean },
      loading: { type: Boolean },
      className: { type: String },
    };
  }

  constructor() {
    super();
    this.label = 'Submit';
    this.disabled = false;
    this.loading = false;
  }

  _handleClick(event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent('click', {
        detail: { label: this.label },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <lion-button
        ?disabled="${this.disabled}"
        .loading="${this.loading}"
        .className="${this.className}"
        @click="${this._handleClick}"
      >
        ${this.label}
      </lion-button>
    `;
  }
}

customElements.define('loan-button', Button);
