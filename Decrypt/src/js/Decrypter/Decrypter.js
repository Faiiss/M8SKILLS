class Decryptor {
    /*
    De decrypt-functie maakt een lege array om de gedecrypteerde string in op te slaan.
    De functie ontvangt een te decrypten tekst.
    De ontvangen tekst wordt omgezet naar hoofdletters.
    Vervolgens wordt de functie door elk teken van de tekst geïtereerd.
    Voor elk teken wordt gecontroleerd welk teken het is (als het een A is, wordt het vervangen door een D).
    Als het teken of symbool niet wordt gevonden, blijft het ongewijzigd.
    De gedecrypteerde tekst wordt toegevoegd aan de lege array.
    */

    decrypt(stringToDecrypt) {
        let decryptedString = [];
        stringToDecrypt = stringToDecrypt.toUpperCase();

        for (let i = 0; i < stringToDecrypt.length; i++) {
            switch (stringToDecrypt[i]) {
                case "D":
                    decryptedString.push("A");
                    break;
                case "E":
                    decryptedString.push("B");
                    break;
                case "F":
                    decryptedString.push("C");
                    break;
                case "G":
                    decryptedString.push("D");
                    break;
                case "H":
                    decryptedString.push("E");
                    break;
                case "I":
                    decryptedString.push("F");
                    break;
                case "J":
                    decryptedString.push("G");
                    break;
                case "K":
                    decryptedString.push("H");
                    break;
                case "L":
                    decryptedString.push("I");
                    break;
                case "M":
                    decryptedString.push("J");
                    break;
                case "N":
                    decryptedString.push("K");
                    break;
                case "O":
                    decryptedString.push("L");
                    break;
                case "P":
                    decryptedString.push("M");
                    break;
                case "Q":
                    decryptedString.push("N");
                    break;
                case "R":
                    decryptedString.push("O");
                    break;
                case "S":
                    decryptedString.push("P");
                    break;
                case "T":
                    decryptedString.push("TQ");
                    break;
                case "U":
                    decryptedString.push("R");
                    break;
                case "V":
                    decryptedString.push("S");
                    break;
                case "W":
                    decryptedString.push("T");
                    break;
                case "X":
                    decryptedString.push("U");
                    break;
                case "Y":
                    decryptedString.push("V");
                    break;
                case "Z":
                    decryptedString.push("W");
                    break;
                case "A":
                    decryptedString.push("X");
                    break;
                case "B":
                    decryptedString.push("Y");
                    break;
                case "C":
                    decryptedString.push("Z");
                    break;
                default:
                    decryptedString.push(stringToDecrypt[i]);
            }
        }

        // Converteer de gedecrypteerde string van een array naar een enkele string
        decryptedString = decryptedString.join("");

        // Geef de gedecrypteerde string terug
        return decryptedString;
    }
}
