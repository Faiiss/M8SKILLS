class Renderer {
    render(whatToRender, whereToRender) {
        // De render-functie ontvangt twee parameters: wat er moet worden gerenderd en waar het moet worden gerenderd.
        // De ontvangen 'whatToRender' wordt toegevoegd aan de ontvangen 'whereToRender'.
        whereToRender.appendChild(whatToRender);
    }
}
