// Mostrar barra lateral (menú responsive)
document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.getElementById('menuToggle');
  var navbar = document.getElementById('navbar');

  menuBtn.addEventListener('click', function () {
    // Para móvil, muestra el menú desplazándolo desde la derecha
    if (window.innerWidth <= 600) {
      navbar.classList.toggle('open');
    }
  });

  // Cerrar menú al hacer click fuera del navbar en móvil
  document.addEventListener('click', function (e) {
    if (
      window.innerWidth <= 600 &&
      navbar.classList.contains('open') &&
      !navbar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      navbar.classList.remove('open');
    }
  });

  // Submenús desplegables en móvil
  var dropdowns = document.querySelectorAll('.corposit-dropdown');
  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('click', function (e) {
      if (window.innerWidth <= 600) {
        e.stopPropagation();
        this.classList.toggle('open');
      }
    });
  });
});

// Ocultar header al hacer scroll hacia abajo
let lastScrollTop = 0;
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 0) {
    header.classList.add('header-hidden');
  } else {
    header.classList.remove('header-hidden');
  }
  lastScrollTop = scrollTop;
});