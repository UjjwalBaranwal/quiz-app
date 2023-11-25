function menuToggle() {
  const toggleMenu = document.querySelector(".menu");
  toggleMenu.classList.toggle("active");
}

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
