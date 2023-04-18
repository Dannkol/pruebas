export default {
    content() {
        fetch('./compenets/boton/custom_elements.html')
            .then(resp => resp.text())
            .then(html => this.coustom_elements(html))
    },

    coustom_elements(element) {
        
        class BotonStatus extends HTMLElement {

            constructor() {
                super();
                let currentStatus = this.getAttribute('status');
                if (currentStatus) {
                    this.status = currentStatus;
                    this.attributeChangedCallback();
                } else {
                    this.status = 'neutral';
                }
                let shadowRoot = this.attachShadow({ mode: 'open' });
                shadowRoot.innerHTML = element;
            }
            //metodos necesario 
            static get observedAttributes() {
                return ['status'];
            }

            attributeChangedCallback() {
                this.shadowRoot !== null ? 
                    this.shadowRoot.querySelector('div').setAttribute('class' , this.status)
                    : null;

            }


        }

        window.customElements.define('boton-status', BotonStatus);
    }
}