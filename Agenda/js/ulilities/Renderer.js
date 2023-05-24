class Renderer {
    render(placeToRender, whatToRender) {
        // Zoek het element op waarin we willen renderen
        const containerElement = document.querySelector(placeToRender);
        
        // Voeg het element dat we willen renderen toe aan het containerelement
        containerElement.appendChild(whatToRender);
    }
}
