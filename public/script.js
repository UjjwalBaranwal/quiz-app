////////////////////////////////////////////////////////////
/////// Making the mobile navigation
const headerEl = document.querySelector(".header");
const btnNavEl = document.querySelector(".btn-mobile-nav");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});
