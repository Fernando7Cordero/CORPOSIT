document.addEventListener("DOMContentLoaded", function () {

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

    const logo = document.createElement("img");
    logo.src = "img/logos/logo.png";
    logo.alt = "Logo";
    logo.style.width = "150px";
    logo.style.opacity = "0";
    logo.style.transition = "opacity 1.5s ease-in-out";

    launchAnimation.appendChild(logo);
    document.body.appendChild(launchAnimation);

    setTimeout(() => {
        logo.style.opacity = "1";
    }, 100); 

    setTimeout(() => {
        logo.style.opacity = "0";
    }, 1500); 

    setTimeout(() => {
        launchAnimation.style.opacity = "0";

        
        setTimeout(() => {
            launchAnimation.remove();
        }, 3000); 
    }, 3000);
});