////////////////////////////////////////////////////////////
/////// Making the mobile navigation
const headerEl = document.querySelector(".header");
const btnNavEl = document.querySelector(".btn-mobile-nav");
btnNavEl.addEventListener("click", function () {
  console.log("ujjwal");
  headerEl.classList.toggle("nav-open");
});
///////////////////////////////////////////////////////
//////////////////// creating a mouse hover event
function menuToggle() {
  // const toggleMenu = document.querySelector(".menu");
  // toggleMenu.classList.toggle("active");
}

const profileBox = document.querySelector(".profile");
profileBox.addEventListener("mouseover", () => {
  const toggleMenu = document.querySelector(".menu");
  toggleMenu.classList.toggle("active");
});

// student dashboard

const allIndicator = document.querySelectorAll(".indicator li");
const allContent = document.querySelectorAll(".tab-content li");

allIndicator.forEach((item) => {
  item.addEventListener("click", function () {
    const content = document.querySelector(this.dataset.target);

    allIndicator.forEach((i) => {
      i.classList.remove("active");
    });

    allContent.forEach((i) => {
      i.classList.remove("active");
    });

    content.classList.add("active");
    this.classList.add("active");
  });
});

////////////////////////////////////////// scroll to the top

const scrollUpbtn = document.querySelector("#scroll-up");

function scrollUp() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

window.addEventListener("scrollY", function () {
  if (this.window.pageYOffset < 300) {
    scroll - up.classList.add("hidden");
  }
});

scrollUpbtn.addEventListener("click", scrollUp);

// smooth scrolling effect for links

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

///////////////////////////////////////////////////////////
// Making the sitcky navigation after the Hero section
const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
      scrollUpbtn.style.display = "block";
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
      scrollUpbtn.style.display = "none";
    }
  },
  {
    //in the viewport
    root: null, //root : null for enabling viewport
    threshold: 0, //this mean the event happen as soon as the 0% of the hero-section inside of the viewport
    rootMargin: "-80px", //height of sticky bar is 8 rem
  }
);
obs.observe(sectionHeroEl);

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

/////////////////////////////////////////////////////////////////////
// ////////////////////// Button for contact us form
