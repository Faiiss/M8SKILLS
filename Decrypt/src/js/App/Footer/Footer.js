class Footer {
    HTMLelement;
    view;
    buttonHtmlElement;
    buttonText;

    constructor(view, text) {
        this.view = view;
        this.HTMLelement = document.createElement("footer"); // Het HTMLelement is een <footer> element
        this.HTMLelement.classList = ("view__footer"); // Het element krijgt de class "view__footer"
        this.view.main.app.renderer.render(this.HTMLelement, view.HTMLelement); // Het element wordt weergegeven door de renderer.render functie van de main, binnen het HTMLelement van de view

        this.buttonText = text; // De buttonText is de ontvangen tekst
        this.buttonHtmlElement = document.createElement("button"); // Het buttonHtmlElement is een <button> element
        this.buttonHtmlElement.classList = "view__button"; // Het element krijgt de class "view__button"
        this.buttonHtmlElement.innerText = this.buttonText; // De tekst op de knop is de buttonText
        this.view.main.app.renderer.render(this.buttonHtmlElement, this.HTMLelement); // Het buttonHtmlElement wordt weergegeven binnen het HTMLelement van de footer

        this.buttonHtmlElement.onclick = this.buttonClicked; // Als er op de buttonHtmlElement wordt geklikt, wordt de functie buttonClicked uitgevoerd
    }

    buttonClicked = () => {
        this.view.getDataFromBody(); // De buttonClicked functie roept de getDataFromBody functie van de view aan
    }
}