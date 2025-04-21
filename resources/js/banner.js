document.addEventListener("DOMContentLoaded", function() {
  const banners = document.querySelectorAll('.banner_element');
  let currentIndex = 0;

  function showNextBanner() {
      banners[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % banners.length;
      banners[currentIndex].classList.add('active');
  }

  setInterval(showNextBanner, 5000);

  banners[currentIndex].classList.add('active');
});