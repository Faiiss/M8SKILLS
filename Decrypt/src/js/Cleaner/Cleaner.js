class Cleaner {
    clean(WhatToClean) {
        // De clean-functie ontvangt een 'WhatToClean', wat aangeeft wat er moet worden schoongemaakt

        // Zoek het element dat moet worden schoongemaakt op basis van de gegeven selector en maak de innerHTML leeg
        document.querySelector(WhatToClean).innerHTML = "";
    }
}
