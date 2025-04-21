document.addEventListener("DOMContentLoaded", function () {
    // Crear el contenedor de la animación
    const launchAnimation = document.createElement("div");
    launchAnimation.id = "launch-animation";
    launchAnimation.style.position = "fixed";
    launchAnimation.style.top = "0";
    launchAnimation.style.left = "0";
    launchAnimation.style.width = "100vw";
    launchAnimation.style.height = "100vh";
    launchAnimation.style.backgroundColor = "#000814";
    launchAnimation.style.display = "flex";
    launchAnimation.style.justifyContent = "center";
    launchAnimation.style.alignItems = "center";
    launchAnimation.style.zIndex = "9999";
    launchAnimation.style.opacity = "1";
    launchAnimation.style.transition = "opacity 2s ease-in-out";

    // Crear la imagen del logo
    const logo = document.createElement("img");
    logo.src = "img/logos/logo.png";
    logo.alt = "Logo";
    logo.style.width = "150px"; // Ajusta el tamaño del logo según sea necesario
    logo.style.opacity = "0";
    logo.style.transition = "opacity 1.5s ease-in-out"; // Logo desaparece más rápido

    // Agregar la imagen al contenedor
    launchAnimation.appendChild(logo);
    document.body.appendChild(launchAnimation);

    // Hacer que el logo aparezca gradualmente
    setTimeout(() => {
        logo.style.opacity = "1";
    }, 100); // Pequeño retraso para asegurar que la transición se aplique

    // Hacer que el logo desaparezca antes que la pantalla negra
    setTimeout(() => {
        logo.style.opacity = "0";
    }, 1500); // Logo comienza a desaparecer después de 1.5 segundos

    // Desvanecer la pantalla negra después de que el logo desaparezca
    setTimeout(() => {
        launchAnimation.style.opacity = "0";

        // Eliminar el contenedor de la animación después de que se desvanezca
        setTimeout(() => {
            launchAnimation.remove();
        }, 3000); // Tiempo para que la transición de opacidad termine
    }, 3000); // Pantalla negra comienza a desaparecer después de 2 segundos
});