class App {
    api;
    decryptor;
    encryptor;
    cleaner;
    renderer;
    main;
    
    constructor() {
        this.decryptor = new Decryptor(); // De Decryptor class wordt aangeroepen
        this.encryptor = new Encryptor(); // De Encryptor class wordt aangeroepen
        this.cleaner = new Cleaner(); // De Cleaner class wordt aangeroepen
        this.renderer = new Renderer(); // De Renderer class wordt aangeroepen
        this.api = new Api(); // De Api class wordt aangeroepen

        this.api.getData("/src/data/data.json").then((data) => {
            this.main = new Main(data, this); // Nadat de data is opgehaald, wordt de Main class aangeroepen met de verkregen data en de huidige App instantie als parameters
        });
    }

    encrypt = (textToEncrypt) => {
        const encrypted = this.encryptor.encrypt(textToEncrypt); // De tekst wordt versleuteld met behulp van de Encryptor class
        this.main.changeEncrypter(encrypted); // De versleutelde tekst wordt doorgegeven aan de main om de weergave te wijzigen
    }

    decrypt = (textToDecrypt) => {
        const decrypted = this.decryptor.decrypt(textToDecrypt); // De tekst wordt ontsleuteld met behulp van de Decryptor class
        this.main.changeDecrypter(decrypted); // De ontsleutelde tekst wordt doorgegeven aan de main om de weergave te wijzigen
    }
}