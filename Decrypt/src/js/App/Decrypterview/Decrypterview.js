class DecryptorView {
    header;
    body;
    footer;
    HTMLelement;
    main;
    type;

    constructor(main, object) {
        this.main = main;
        this.type = "DECRYPT"; // Het type is "DECRYPT" (decryptie)

        this.HTMLelement = document.createElement("article"); // Het HTMLelement is een <article> element
        this.HTMLelement.classList = ("view"); // Het element krijgt de class "view"
        this.HTMLelement.classList.add("view--right"); // Er wordt een extra class "view--right" toegevoegd

        this.main.app.renderer.render(this.HTMLelement, this.main.HTMLelement); // Het element wordt weergegeven door de renderer.render functie van de main, binnen het HTMLelement van de main

        this.header = new Header(this, "Decryptor"); // Er wordt een Header aangemaakt met de DecryptorView en de tekst "Decryptor"
        this.body = new Body(this, object); // Er wordt een Body aangemaakt met de DecryptorView en een object
        this.footer = new Footer(this, "start decrypting"); // Er wordt een Footer aangemaakt met de DecryptorView en de tekst "start decrypting"
    }

    getDataFromBody = () => {
        this.main.cipher(this.body.text, this.type); // De getDataFromBody functie roept de cipher functie van de main aan met de tekst uit de body en het type
    }

    changeBody = (decryptedText) => {
        this.body.changeBody(decryptedText); // De changeBody functie geeft de gedecodeerde tekst door aan de changeBody functie van de body
    }
}