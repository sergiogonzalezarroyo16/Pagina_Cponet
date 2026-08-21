document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const target = document.querySelector(a.getAttribute('href')); if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }) } }));

/* =========================================
   HERO CAROUSEL
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");

  const prevButton = document.getElementById("heroPrev");
  const nextButton = document.getElementById("heroNext");

  if (!slides.length) return;

  let currentSlide = 0;
  let autoplay;


  /* -----------------------------------------
     CAMBIAR SLIDE
     ----------------------------------------- */

  function showSlide(index) {

    if (index < 0) {
      index = slides.length - 1;
    }

    if (index >= slides.length) {
      index = 0;
    }

    currentSlide = index;


    /* Slides */

    slides.forEach((slide, i) => {

      slide.classList.toggle(
        "active",
        i === currentSlide
      );

    });


    /* Indicadores */

    dots.forEach((dot, i) => {

      const active = i === currentSlide;

      dot.classList.toggle(
        "active",
        active
      );

      dot.setAttribute(
        "aria-selected",
        active ? "true" : "false"
      );

    });

  }


  /* -----------------------------------------
     SIGUIENTE
     ----------------------------------------- */

  function nextSlide() {

    showSlide(currentSlide + 1);

  }


  /* -----------------------------------------
     ANTERIOR
     ----------------------------------------- */

  function previousSlide() {

    showSlide(currentSlide - 1);

  }


  /* -----------------------------------------
     BOTONES
     ----------------------------------------- */

  nextButton?.addEventListener(
    "click",
    () => {

      nextSlide();

      restartAutoplay();

    }
  );


  prevButton?.addEventListener(
    "click",
    () => {

      previousSlide();

      restartAutoplay();

    }
  );


  /* -----------------------------------------
     DOTS
     ----------------------------------------- */

  dots.forEach((dot) => {

    dot.addEventListener(
      "click",
      () => {

        const slideIndex =
          Number(dot.dataset.slideTo);

        showSlide(slideIndex);

        restartAutoplay();

      }
    );

  });


  /* -----------------------------------------
     AUTOPLAY
     ----------------------------------------- */

  function startAutoplay() {

    autoplay = setInterval(
      nextSlide,
      7000
    );

  }


  function restartAutoplay() {

    clearInterval(autoplay);

    startAutoplay();

  }


  /* -----------------------------------------
     INICIO
     ----------------------------------------- */

  showSlide(0);

  startAutoplay();


  /* -----------------------------------------
     PAUSAR AL PASAR EL RATÓN
     ----------------------------------------- */

  const hero =
    document.querySelector(".hero");

  hero?.addEventListener(
    "mouseenter",
    () => {
      clearInterval(autoplay);
    }
  );


  hero?.addEventListener(
    "mouseleave",
    () => {
      startAutoplay();
    }
  );


  /* -----------------------------------------
     SOPORTE PARA TECLADO
     ----------------------------------------- */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "ArrowRight"
      ) {

        nextSlide();

        restartAutoplay();

      }

      if (
        event.key === "ArrowLeft"
      ) {

        previousSlide();

        restartAutoplay();

      }

    }
  );


});