class EncryptorView {
    header;
    body;
    footer;
    HTMLelement;
    main;
    type;

    constructor(main, object) {
        this.main = main;
        this.type = "ENCRYPT"; // Het type is "ENCRYPT" (encryptie)

        this.HTMLelement = document.createElement("article"); // Het HTMLelement is een <article> element
        this.HTMLelement.classList = ("view"); // Het element krijgt de class "view"
        this.HTMLelement.classList.add("view--left"); // Er wordt een extra class "view--left" toegevoegd

        this.main.app.renderer.render(this.HTMLelement, this.main.HTMLelement); // Het element wordt weergegeven door de renderer.render functie van de main, binnen het HTMLelement van de main

        this.header = new Header(this, "Encryptor"); // Er wordt een Header aangemaakt met de EncryptorView en de tekst "Encryptor"
        this.body = new Body(this, object); // Er wordt een Body aangemaakt met de EncryptorView en een object
        this.footer = new Footer(this, "start encrypting"); // Er wordt een Footer aangemaakt met de EncryptorView en de tekst "start encrypting"
    }

    getDataFromBody = () => {
        this.main.cipher(this.body.text, this.type); // De getDataFromBody functie roept de cipher functie van de main aan met de tekst uit de body en het type
    }

    changeBody = (encryptedText) => {
        this.body.changeBody(encryptedText); // De changeBody functie geeft de geëncodeerde tekst door aan de changeBody functie van de body
    }
}
