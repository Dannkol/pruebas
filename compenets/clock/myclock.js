export default {
    content() {
        //fetch a la plantilla html
        fetch('./compenets/clock/my_clock.html')
            .then(resp => resp.text())
            .then(html => this.coustom_elements(html))
    },
    coustom_elements(element) {
        //se crea y se define el componenete en el mismo momento
        customElements.define(
            "my-clock",
            class extends HTMLElement {
                constructor() {
                    super();
                    let shadowRoot = this.attachShadow({ mode: 'open' });
                    shadowRoot.innerHTML = element;
                    const shadow = shadowRoot;
                    this.hours = shadow.querySelector("#hour");
                    this.minutes = shadow.querySelector("#min");
                    this.seconds = shadow.querySelector("#sec");
                    this.style = shadow.querySelector("style");
                    this.style_display = document.getElementById("style");

                }


                connectedCallback() {
                    this.update();
                    this.interval = setInterval(() => this.update(), 1000);
                }

                disconnectedCallback() {
                    clearInterval(this.interval);
                }

                update() {
                    const pad = (v) => {
                        return String(v).padStart(2, "0");
                    };
                    const d = new Date();
                    this.hours.textContent = pad(d.getHours());
                    this.minutes.textContent = pad(d.getMinutes());
                    this.seconds.textContent = pad(d.getSeconds());

                }
            }
        );
    }
}