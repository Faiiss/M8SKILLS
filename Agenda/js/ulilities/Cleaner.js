class Cleaner {
    cleanAgenda() {
        const agendaElement = document.querySelector(".agenda");
        if (agendaElement) {
            agendaElement.remove(); // verwijder het agenda-element als het bestaat
        }
    }
}
