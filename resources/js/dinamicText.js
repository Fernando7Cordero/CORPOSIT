document.addEventListener("DOMContentLoaded", function () {
    const banners = document.querySelectorAll('.banner_element');
    let currentIndex = 0;

    function showNextBanner() {
        banners[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % banners.length;
        banners[currentIndex].classList.add('active');
    }

    setInterval(showNextBanner, 5000);

    banners[currentIndex].classList.add('active');

    const dynamicText = document.getElementById('dynamic-text');
    const textOptions = ['Experiencia', 'Compromiso', 'Seguridad', 'Profesionalismo'];
    let textIndex = 0;

    const maxTextWidth = Math.max(...textOptions.map(text => text.length)) + "ch";
    dynamicText.style.display = "inline-block";
    dynamicText.style.width = maxTextWidth;
    dynamicText.style.textAlign = "center";

    function typeText(text, callback) {
        let i = 0;
        dynamicText.innerHTML = '';
        const interval = setInterval(() => {
            if (i < text.length) {
                dynamicText.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(callback, 2000);
            }
        }, 100);
    }

    function deleteText(callback) {
        const interval = setInterval(() => {
            if (dynamicText.innerHTML.length > 0) {
                dynamicText.innerHTML = dynamicText.innerHTML.slice(0, -1);
            } else {
                clearInterval(interval);
                callback();
            }
        }, 50);
    }

    function loopText() {
        typeText(textOptions[textIndex], () => {
            deleteText(() => {
                textIndex = (textIndex + 1) % textOptions.length;
                loopText();
            });
        });
    }

    loopText();
});