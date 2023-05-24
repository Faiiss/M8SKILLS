class AgendaApp {
    api; // instantie van de API-klasse
    switcher; // instantie van de Switcher-klasse
    month = 0; // huidige maand nummer
    cleaner; // instantie van de Cleaner-klasse

    constructor() {
        this.api = new API(); // maak een nieuwe API-instantie
        this.switcher = new Switcher(this); // maak een nieuwe Switcher-instantie en geef de huidige AgendaApp-instantie mee
        this.cleaner = new Cleaner(); // maak een nieuwe Cleaner-instantie

        // Haal gegevens op via de API en laad de agenda voor de huidige maand
        let result = this.api.getData().then((result) => {
            this.switcher.loadAgenda(result[this.month]);
        });
    }

    switchMonths = (sign) => {
        this.cleaner.cleanAgenda(); // Maak de agenda schoon voordat een nieuwe wordt geladen
        switch (sign) {
            case "+":
                this.month = this.month + 1; // Verhoog de maand bij 1
                break;
            case "-":
                this.month = this.month - 1; // Verlaag de maand bij 1
                break;
        }
        
        // Zorg ervoor dat de maand nummer binnen 0-11 blijft
        if(this.month === 12){
            this.month = 0;
        }
        if(this.month < 0){
            this.month = 11;
        }

        // Laad de agenda voor de nieuwe maand
        this.switcher.loadAgenda(this.api.dataFromAPI[this.month]);
    };
}

class API {
    dataFromAPI = []; // lege array voor opgehaalde gegevens van de API

    async getData() {
        await fetch("./data/data.json").then(response => {
            return response.json(); // converteer de API-respons naar JSON
        }).then(data => {
            this.dataFromAPI = data.months; // sla de gegevens op in de dataFromAPI-array
        });

        return this.dataFromAPI; // geef de opgehaalde gegevens terug
    }
}

class Agenda {
    renderer; // instantie van de Renderer-klasse
    header; // instantie van de Header-klasse
    month; // instantie van de Month-klasse
    HTMLElement; // HTML-element voor de agenda
    agendaApp; // instantie van de AgendaApp-klasse
    agenda;

    constructor(data, agendaApp) {
        this.agendaApp = agendaApp; // huidige AgendaApp-instantie
        this.HTMLElement = document.createElement("article"); // maak een nieuw artikel-element
        this.HTMLElement.classList.add("agenda"); // voeg de "agenda"-klasse toe aan het element
        this.data = data; // gegevens voor de agenda
        this.renderer = new Renderer(); // maak een nieuwe Renderer-instantie
        this.renderer.render("body", this.HTMLElement); // render de agenda in het body-element
        this.header = new Header(this, data.name, this.agendaApp); // maak een nieuwe Header-instantie
        this.month = new Month(this, data.days); // maak een nieuwe Month-instantie
    }

    render(placeToRender, whatToRender) {
        this.renderer.render(placeToRender, whatToRender); // render een element op de opgegeven plaats
    }
}

class Header {
    nameOfMonth; // naam van de maand
    HTMLElement; // HTML-element voor de header
    agenda;
    leftButton; // knop voor vorige maand
    rightButton; // knop voor volgende maand

    constructor(agenda, nameOfMonth, agendaApp) {
        this.agenda = agenda; // huidige Agenda-instantie
        this.agendaApp = agendaApp; // huidige AgendaApp-instantie
        this.nameOfMonth = nameOfMonth; // naam van de maand
        this.HTMLElement = document.createElement("header"); // maak een nieuw header-element
        this.HTMLElement.classList.add("agenda__header"); // voeg de "agenda__header"-klasse toe aan het element
        this.text = document.createElement("h2"); // maak een nieuw h2-element
        this.agenda.render(".agenda", this.HTMLElement); // render de header in de agenda
        this.leftButton = new Button("previous", "<", "agenda--left", this, this.agendaApp); // maak een nieuwe vorige-knop
        this.agenda.render(".agenda__header", this.text); // render de tekst in de header
        this.rightButton = new Button("next", ">", "agenda--right", this, this.agendaApp); // maak een nieuwe volgende-knop
        this.text.innerText = this.nameOfMonth; // stel de tekst in op de naam van de maand
    }

    render(placeToRender, whatToRender) {
        this.agenda.render(placeToRender, whatToRender); // render een element op de opgegeven plaats
    }
}

class Button {
    HTMLElement; // HTML-element voor de knop
    innerText; // innerlijke tekst van de knop
    extraClass; // extra klasse voor de knop
    switcher; // instantie van de Switcher-klasse
    header; // instantie van de Header-klasse
    type; // type van de knop

    constructor(type, innerText, extraClass, header, agendaApp) {
        this.type = type; // type van de knop
        this.agendaApp = agendaApp; // huidige AgendaApp-instantie
        this.HTMLElement = document.createElement("button"); // maak een nieuw button-element
        this.HTMLElement.classList.add("agenda__button"); // voeg de "agenda__button"-klasse toe aan het element
        this.extraClass = extraClass; // extra klasse voor de knop
        this.HTMLElement.classList.add(this.extraClass); // voeg de extra klasse toe aan het element
        this.innerText = innerText; // innerlijke tekst van de knop
        this.HTMLElement.innerText = this.innerText; // stel de innerlijke tekst in voor het element
        this.switcher = agendaApp.switcher; // huidige Switcher-instantie
        this.header = header; // huidige Header-instantie
        this.render();

        this.HTMLElement.onclick = this.buttonClicked; // wijs de buttonClicked-functie toe aan de onclick-gebeurtenis van het element
    }

    buttonClicked = () => {
        if(this.type === "previous"){
            this.agendaApp.switchMonths("-"); // schakel naar de vorige maand
            return
        }
        this.agendaApp.switchMonths("+"); // schakel naar de volgende maand
    }

    render() {
        this.header.render("header", this.HTMLElement); // render de knop in de header
    }

}

class Switcher {
    agendaApp; // instantie van de AgendaApp-klasse
    agenda;

    constructor(agendaApp) {
        this.agendaApp = agendaApp; // huidige AgendaApp-instantie
    }

    loadAgenda = (data) => {
        this.agenda = new Agenda(data, this.agendaApp); // laad de agenda met de opgegeven gegevens
    }
}

class Month {
    days = []; // array voor de dagen van de maand
    agenda; // huidige Agenda-instantie
    numberOfDays; // aantal dagen in de maand
    HTMLElement;

    constructor(agenda, numberOfDays) {
        this.HTMLElement = document.createElement("ul"); // maak een nieuw ul-element
        this.HTMLElement.classList.add("agenda__month"); // voeg de "agenda__month"-klasse toe aan het element
        this.numberOfDays = numberOfDays; // aantal dagen in de maand
        this.agenda = agenda; // huidige Agenda-instantie
        this.agenda.render(".agenda", this.HTMLElement); // render de maand in de agenda

        for (let i = 1; i <= numberOfDays; i++) {
            this.days.push(new Day(this, i)); // maak nieuwe Day-instanties voor elke dag en voeg ze toe aan de days-array
        }
    }

    renderDays(placeToRender, whatToRender) {
        this.agenda.render(placeToRender, whatToRender); // render een element op de opgegeven plaats
    }
}

class Day {
    month; // huidige Month-instantie
    HTMLElement; // HTML-element voor de dag
    dayNumber; // dagnummer

    constructor(month, dayNumber) {
        this.dayNumber = dayNumber; // dagnummer
        this.HTMLElement = document.createElement("li"); // maak een nieuw li-element
        this.HTMLElement.classList.add("agenda__day"); // voeg de "agenda__day"-klasse toe aan het element
        this.HTMLElement.innerText = this.dayNumber; // stel de innerlijke tekst in op het dagnummer
        this.month = month; // huidige Month-instantie
        this.month.renderDays(".agenda__month", this.HTMLElement); // render de dag in de maand
    }
}


