const hamburger = document.getElementById("hamburger");
const modal = document.querySelector(".menu-modal");
const modalNav = document.querySelector(".modal-nav");
const wrapper = document.querySelector(".wrapper");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  modal.classList.toggle("active");
  modalNav.classList.toggle("active");
  wrapper.classList.toggle("active");
});

window.addEventListener("click", (e) => {
  if (e.target === modal || e.target.classList[0] === "container") {
    hamburger.classList.remove("active");
    modal.classList.remove("active");
    modalNav.classList.remove("active");
    wrapper.classList.remove("active");
  }
});

const form = document.querySelector("form");
const input = document.querySelector("input");
const submit = document.getElementById("submit");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  input.value = "";
  form.classList.remove("invalid");
  window.scroll({ top: 0, behavior: "smooth" });
});

submit.addEventListener("click", () => {
  !input.validity.valid && form.classList.add("invalid");
  setTimeout(() => {
    form.classList.remove("invalid");
  }, 5000);
});

const slides = [...document.querySelectorAll(".testimonial")];
const slidesContainer = document.getElementById("slides-container");
const container = document.getElementById("slider");
const bulletsContainer = document.getElementById("bullets-container");
const bullets = [...document.querySelectorAll(".bullet")];
const prevBtn = document.getElementById("btnPrev");
const nextBtn = document.getElementById("btnNext");

let counter = 0;
let clickable = true;
let active = null;

let size = slides[0].clientWidth;
const gap = 32;
let containerWidth = size * 3 + gap * 2;
container.style.width = `${containerWidth}px`;
slidesContainer.style.gap = `${gap}px`;

window.addEventListener("resize", () => {
  size = slides[0].clientWidth;
  containerWidth = size * 3 + gap * 2;
  container.style.width = `${containerWidth}px`;

  if (window.innerWidth > 664) {
    hamburger.classList.remove("active");
    modal.classList.remove("active");
    modalNav.classList.remove("active");
    wrapper.classList.remove("active");
  }
});

slides.forEach((slide) => {
  slide.setAttribute("style", "order:1");
});

const handleBullets = () => {
  bullets.map((bullet, id) => {
    bullet.classList.remove("active");
    if (id === active + 2) {
      bullet.classList.add("active");
    }
    if (active > 1 && id === active - 2) {
      bullet.classList.add("active");
    }
  });
};

nextBtn.addEventListener("click", () => {
  if (clickable) {
    clickable = false;
    container.style.justifyContent = "flex-start";
    slidesContainer.style.transition = ".5s ease";
    slidesContainer.style.transform = "translateX(" + (-size - gap) + "px)";

    counter >= slides.length ? (counter = 1) : counter++;
    active = counter - 1;

    slidesContainer.addEventListener("transitionend", function handleNext() {
      slidesContainer.style.transition = "";

      slides.map((item, id) => {
        if (id > active) {
          item.setAttribute("style", "order:1");
        } else {
          item.setAttribute("style", "order:2");
        }
      });

      slidesContainer.style.transform = "";
      clickable = true;
      slidesContainer.removeEventListener("transitionend", handleNext);
    });
  }

  handleBullets();
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) counter = slides.length;

  if (clickable) {
    clickable = false;
    container.style.justifyContent = "flex-end";
    slidesContainer.style.transition = ".5s ease";
    slidesContainer.style.transform = "translateX(" + (size + gap) + "px)";

    counter < slides.length - 2 ? (counter = slides.length) : counter--;
    active = counter - 1;

    slides.map((item, id) => {
      if (id <= active) {
        item.setAttribute("style", "order:2");
      } else {
        item.setAttribute("style", "order:1");
      }
    });

    slidesContainer.addEventListener("transitionend", function handlePrev() {
      container.style.justifyContent = "flex-start";
      slidesContainer.style.transition = "";
      slidesContainer.style.transform = "";
      clickable = true;
      slidesContainer.removeEventListener("transitionend", handlePrev);
    });
  }

  handleBullets();
});

bulletsContainer.addEventListener("click", (e) => {
  if (e.target.classList[1] === "active") return;
  bullets.forEach((bullet) => {
    bullet.classList.remove("active");
  });

  e.target.classList.add("active");

  bullets.map((bullet, id) => {
    if (bullet.classList[1] === "active") {
      counter = id - 1;
      if (counter < 0) counter = 3;
      if (counter === 0) counter = 4;
    }
  });

  slides.map((item, id) => {
    if (id > counter - 1) {
      item.setAttribute("style", "order:1");
    } else {
      item.setAttribute("style", "order:2");
    }
  });
});
