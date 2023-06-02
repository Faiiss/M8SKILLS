class Main {
    encryptorView;
    decryptorView;
    data;
    HTMLelement;
    app;

    constructor(data, app) {
        this.data = data;
        this.app = app;

        this.HTMLelement = document.createElement("main"); // Het HTMLelement is een <main> element
        this.HTMLelement.classList = ("main"); // Het element krijgt de class "main"
        this.app.renderer.render(this.HTMLelement, document.querySelector("body")); // Het HTMLelement wordt weergegeven door de renderer.render functie van de app, binnen het body element van de pagina

        this.encryptorView = new EncryptorView(this, this.data.encrypt); // Een nieuwe EncryptorView wordt aangemaakt, met de huidige main en de encryptiegegevens als parameters
        this.decryptorView = new DecryptorView(this, this.data.decrypt); // Een nieuwe DecryptorView wordt aangemaakt, met de huidige main en de decryptiegegevens als parameters
    }

    cipher = (textToCipher, type) => {
        if (type === "ENCRYPT") {
            this.app.encrypt(textToCipher); // Als het type "ENCRYPT" is, wordt de encrypt functie van de app aangeroepen met de tekst om te versleutelen
        } else {
            this.app.decrypt(textToCipher); // Anders wordt de decrypt functie van de app aangeroepen met de tekst om te ontsleutelen
        }
    }

    changeEncrypter = (encryptedText) => {
        this.encryptorView.changeBody(encryptedText); // De encryptorView wordt geüpdatet met de versleutelde tekst
    }

    changeDecrypter = (decryptedText) => {
        this.decryptorView.changeBody(decryptedText); // De decryptorView wordt geüpdatet met de ontsleutelde tekst
    }
}