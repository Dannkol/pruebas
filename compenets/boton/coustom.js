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
                let currenthola = this.getAttribute('hola');
                console.log(currenthola)
                let shadowRoot = this.attachShadow({ mode: 'open' });
                shadowRoot.innerHTML = element;
            }
            //metodos necesario 
            static get observedAttributes() {
                return ['status', 'hola'];
            }

            attributeChangedCallback() {
                console.log(BotonStatus.observedAttributes)
                this.shadowRoot.querySelector('div').setAttribute('class' , this.getAttribute(BotonStatus.observedAttributes[0]))
              
              
                
                
            }


        }

        window.customElements.define('boton-status', BotonStatus);
    }
}