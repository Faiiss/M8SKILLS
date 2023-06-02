class Api {

    async getData(url) {
        // Maak een leeg object aan om de data in op te slaan
        let dataToBeReturned = {};

        // Wacht op het ophalen van de data via een fetch-request naar de opgegeven URL
        await fetch(url).then(
            // Wanneer de response binnenkomt, converteer deze naar JSON
            (response) => {
                return response.json();
            }

        ).then( (data) => {
            // Sla de data die is verkregen uit de JSON-response op in de dataToBeReturned variabele
            dataToBeReturned = data.data;
        })

        // Geef de opgeslagen data terug
        return dataToBeReturned;
    }
}
