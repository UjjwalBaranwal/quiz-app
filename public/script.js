////////////////////////////////////////////////////////////
/////// Making the mobile navigation
const headerEl = document.querySelector(".header");
const btnNavEl = document.querySelector(".btn-mobile-nav");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});


// scroll to the top

const scrollUpbtn = document.querySelector("#scroll-up");

function scrollUp(){
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",})

}

scrollUpbtn.addEventListener("click",scrollUp)

