////////////////////////////////////////////////////////////
/////// Making the mobile navigation
const headerEl = document.querySelector(".header");
const btnNavEl = document.querySelector(".btn-mobile-nav");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// scroll to the top

const scrollUpbtn = document.querySelector("#scroll-up");

function scrollUp() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

scrollUpbtn.addEventListener("click", scrollUp);
/////////////////////////////////////////////////////////////////
////////////////// Making FAQs
// let items = document.querySelectorAll(".item");
let icons = document.querySelectorAll(".icon");
let hdb = document.querySelectorAll(".hidden-box");

for (let i = 0; i < icons.length; i++) {
  icons[i].addEventListener("click", function () {
    hdb[i].classList.toggle("open");
    if (hdb[i].classList.contains("open")) {
      icons[
        i
      ].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>`;
    } else {
      icons[
        i
      ].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
`;
    }
    console.log(`${i} is clicked`);
  });
}

//////////////////////////////////////////////////////////////////
////////////// LOGIN/SIGNUP form
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});
