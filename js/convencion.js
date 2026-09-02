/* =========================================================
   CONTADOR CONVENCIÓN CPONET 2026
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const countdown = document.getElementById("conventionCountdown");

    if (!countdown) {
        return;
    }

    const daysElement =
        document.getElementById("conventionCountdownDays");

    const hoursElement =
        document.getElementById("conventionCountdownHours");

    const minutesElement =
        document.getElementById("conventionCountdownMinutes");

    const secondsElement =
        document.getElementById("conventionCountdownSeconds");


    /*
       21 de octubre de 2026 · 09:00 hora española
    */

    const targetDate =
        new Date("2026-10-21T09:00:00+02:00").getTime();


    function updateCountdown() {

        const now = new Date().getTime();

        const distance = targetDate - now;


        /* EVENTO ALCANZADO */

        if (distance <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            countdown.classList.add("finished");

            return;
        }


        /* CÁLCULO */

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );


        /* MOSTRAR */

        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);

});



/* =========================================================
   CARRUSEL DE PATROCINADORES
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".convention-sponsors-track");
    const cards = document.querySelectorAll(".convention-sponsor-card");

    const prevButton = document.querySelector(
        ".convention-sponsors-prev"
    );

    const nextButton = document.querySelector(
        ".convention-sponsors-next"
    );

    const dotsContainer = document.querySelector(
        ".convention-sponsors-dots"
    );


    if (
        !track ||
        !cards.length ||
        !prevButton ||
        !nextButton ||
        !dotsContainer
    ) {
        return;
    }


    let currentIndex = 0;


    function getVisibleCards() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }


    function getMaxIndex() {

        return Math.max(
            0,
            cards.length - getVisibleCards()
        );
    }


    function createDots() {

        dotsContainer.innerHTML = "";

        const maxIndex = getMaxIndex();

        for (let i = 0; i <= maxIndex; i++) {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.classList.add(
                "convention-sponsors-dot"
            );

            dot.setAttribute(
                "aria-label",
                `Ir al grupo ${i + 1}`
            );


            if (i === currentIndex) {

                dot.classList.add("is-active");

            }


            dot.addEventListener("click", () => {

                currentIndex = i;

                updateCarousel();

            });


            dotsContainer.appendChild(dot);
        }
    }


    function updateCarousel() {

        const visibleCards = getVisibleCards();

        const cardWidth = cards[0].offsetWidth;

        const gap = 20;

        const offset =
            currentIndex *
            (cardWidth + gap);


        track.style.transform =
            `translateX(-${offset}px)`;


        prevButton.disabled =
            currentIndex === 0;


        nextButton.disabled =
            currentIndex >= getMaxIndex();


        const dots =
            dotsContainer.querySelectorAll(
                ".convention-sponsors-dot"
            );


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "is-active",
                index === currentIndex
            );

        });
    }


    prevButton.addEventListener("click", () => {

        if (currentIndex > 0) {

            currentIndex--;

            updateCarousel();

        }

    });


    nextButton.addEventListener("click", () => {

        if (currentIndex < getMaxIndex()) {

            currentIndex++;

            updateCarousel();

        }

    });


    function refreshCarousel() {

        currentIndex = Math.min(
            currentIndex,
            getMaxIndex()
        );

        createDots();

        updateCarousel();

    }


    window.addEventListener(
        "resize",
        refreshCarousel
    );


    refreshCarousel();

});

/* =========================================================
   CARRUSEL DE GALERÍA · CONVENCIÓN CPONET
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".convention-gallery-track");
    const cards = document.querySelectorAll(".convention-gallery-card");

    const prevButton = document.querySelector(
        ".convention-gallery-prev"
    );

    const nextButton = document.querySelector(
        ".convention-gallery-next"
    );

    const dotsContainer = document.querySelector(
        ".convention-gallery-dots"
    );


    if (
        !track ||
        !cards.length ||
        !prevButton ||
        !nextButton ||
        !dotsContainer
    ) {
        return;
    }


    let currentIndex = 0;


    /* =====================================================
       TARJETAS VISIBLES
       ===================================================== */

    function getVisibleCards() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }


    /* =====================================================
       ÍNDICE MÁXIMO
       ===================================================== */

    function getMaxIndex() {

        return Math.max(
            0,
            cards.length - getVisibleCards()
        );
    }


    /* =====================================================
       CREAR DOTS
       ===================================================== */

    function createDots() {

        dotsContainer.innerHTML = "";

        const maxIndex = getMaxIndex();

        for (let i = 0; i <= maxIndex; i++) {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.classList.add(
                "convention-gallery-dot"
            );

            dot.setAttribute(
                "aria-label",
                `Ir al grupo ${i + 1}`
            );


            if (i === currentIndex) {

                dot.classList.add("is-active");

            }


            dot.addEventListener("click", () => {

                currentIndex = i;

                updateCarousel();

            });


            dotsContainer.appendChild(dot);

        }

    }


    /* =====================================================
       ACTUALIZAR CARRUSEL
       ===================================================== */

    function updateCarousel() {

        const cardWidth = cards[0].offsetWidth;

        const gap = 20;

        const offset =
            currentIndex *
            (cardWidth + gap);


        track.style.transform =
            `translateX(-${offset}px)`;


        /* BOTÓN ANTERIOR */

        prevButton.disabled =
            currentIndex === 0;


        /* BOTÓN SIGUIENTE */

        nextButton.disabled =
            currentIndex >= getMaxIndex();


        /* DOTS */

        const dots =
            dotsContainer.querySelectorAll(
                ".convention-gallery-dot"
            );


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "is-active",
                index === currentIndex
            );

        });

    }


    /* =====================================================
       BOTÓN ANTERIOR
       ===================================================== */

    prevButton.addEventListener("click", () => {

        if (currentIndex > 0) {

            currentIndex--;

            updateCarousel();

        }

    });


    /* =====================================================
       BOTÓN SIGUIENTE
       ===================================================== */

    nextButton.addEventListener("click", () => {

        if (currentIndex < getMaxIndex()) {

            currentIndex++;

            updateCarousel();

        }

    });


    /* =====================================================
       RESPONSIVE
       ===================================================== */

    function refreshCarousel() {

        currentIndex = Math.min(
            currentIndex,
            getMaxIndex()
        );

        createDots();

        updateCarousel();

    }


    window.addEventListener(
        "resize",
        refreshCarousel
    );


    /* =====================================================
       INICIALIZAR
       ===================================================== */

    refreshCarousel();

});