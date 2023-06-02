class Header {
    HTMLelement;
    view;
    headinHTMLElement;
    headingtext;
    constructor(view, text) {
        this.view = view;
        this.HTMLelement = document.createElement("header"); // Het HTMLelement is een <header> element
        this.HTMLelement.classList = ("view__header"); // Het element krijgt de class "view__header"
        this.view.main.app.renderer.render(this.HTMLelement, view.HTMLelement); // Het element wordt weergegeven door de renderer.render functie van de main, binnen het HTMLelement van de view

        this.headingText = text; // De headingText is de ontvangen tekst
        this.headingHTMLElement = document.createElement("h1"); // Het headingHTMLElement is een <h1> element
        this.headingHTMLElement.classList = ("view__heading"); // Het element krijgt de class "view__heading"
        this.headingHTMLElement.innerText = this.headingText; // De tekst in de heading is de headingText
        this.view.main.app.renderer.render(this.headingHTMLElement, this.HTMLelement); // Het headingHTMLElement wordt weergegeven binnen het HTMLelement van de header
    }
}