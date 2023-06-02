class Body {
    HTMLelement;
    view;
    inputHTMLElement;
    text;

    constructor(view, object) {
        // De constructor van de Body-klasse ontvangt een view en een object als parameters
        this.view = view;

        // Maak een HTML-element van het type "section" aan
        this.HTMLelement = document.createElement("section");
        // Stel de class van het HTML-element in op "view__body"
        this.HTMLelement.classList = "view__body";
        // Render het HTML-element binnen de HTMLelement van de view met behulp van de render-functie van de renderer
        this.view.main.app.renderer.render(this.HTMLelement, view.HTMLelement);

        // Maak een HTML-element van het type "textarea" aan
        this.inputHTMLElement = document.createElement("textarea");
        // Stel de class van het inputHTML-element in op "view__input"
        this.inputHTMLElement.classList = "view__input";
        // Stel de placeholder van het inputHTML-element in op de waarde die wordt meegegeven in het object
        this.inputHTMLElement.placeholder = object.placeholder;
        // Stel de waarde van het inputHTML-element in op de waarde die wordt meegegeven in het object
        this.inputHTMLElement.value = object.value;
        // Stel de text-variabele in op de waarde die wordt meegegeven in het object
        this.text = object.value;

        // Voeg een event listener toe aan het inputHTML-element, luisterend naar het "input" event en activeer de "typed" functie
        this.inputHTMLElement.oninput = this.typed;

        // Render het inputHTML-element binnen de HTMLelement met behulp van de render-functie van de renderer
        this.view.main.app.renderer.render(this.inputHTMLElement, this.HTMLelement);
    }

    // Definieer de typed functie als een arrow functie, die een event ontvangt
    typed = (event) => {
        // Update de text-variabele naar de waarde van het event target
        this.text = event.target.value;
    }

    // Definieer de changeBody functie, die een newText parameter ontvangt
    changeBody = (newText) => {
        // Stel de waarde van het inputHTML-element in op newText
        this.inputHTMLElement.value = newText;
    }
}
