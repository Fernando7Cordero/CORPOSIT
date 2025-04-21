
// Funcion Para activar barra lateral 

document.addEventListener('DOMContentLoaded', function () {

  var detonador = document.getElementById('menuResponsive');

  detonador.addEventListener('click', function () {

    var barralateral = document.getElementById('sideNavBar');

    barralateral.style.left = '0px';

  });
});

// Funcion para desactivar barra lateral 

document.addEventListener('DOMContentLoaded', function () {

  var detonador = document.getElementById('closeNavBar');

  detonador.addEventListener('click', function () {

    var barralateral = document.getElementById('sideNavBar');

    barralateral.style.left = '100vw';

  });

});


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