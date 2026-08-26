document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".news-track");
    const prevButton = document.querySelector(".news-arrow-prev");
    const nextButton = document.querySelector(".news-arrow-next");
    const dots = document.querySelectorAll(".news-dot");

    if (!track || !prevButton || !nextButton) {
        return;
    }


    const cards = Array.from(track.querySelectorAll(".news-card"));

    let currentPage = 0;


    function getCardsPerPage() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }


    function getTotalPages() {

        return Math.ceil(cards.length / getCardsPerPage());

    }


    function updateCarousel() {

        const cardsPerPage = getCardsPerPage();
        const totalPages = getTotalPages();

        if (currentPage >= totalPages) {
            currentPage = totalPages - 1;
        }

        if (currentPage < 0) {
            currentPage = 0;
        }


        const firstCard = cards[0];

        if (!firstCard) {
            return;
        }


        const cardWidth = firstCard.getBoundingClientRect().width;

        const trackStyle = window.getComputedStyle(track);

        const gap = parseFloat(trackStyle.gap) || 0;


        const offset = currentPage * (cardWidth + gap) * cardsPerPage;


        track.style.transform = `translateX(-${offset}px)`;


        prevButton.disabled = currentPage === 0;

        nextButton.disabled = currentPage === totalPages - 1;


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "is-active",
                index === currentPage
            );

        });

    }


    prevButton.addEventListener("click", () => {

        if (currentPage > 0) {

            currentPage--;

            updateCarousel();

        }

    });


    nextButton.addEventListener("click", () => {

        if (currentPage < getTotalPages() - 1) {

            currentPage++;

            updateCarousel();

        }

    });


    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentPage = index;

            updateCarousel();

        });

    });


    window.addEventListener("resize", updateCarousel);


    updateCarousel();

});document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".news-track");
    const prevButton = document.querySelector(".news-arrow-prev");
    const nextButton = document.querySelector(".news-arrow-next");
    const dots = document.querySelectorAll(".news-dot");

    if (!track || !prevButton || !nextButton) {
        return;
    }


    const cards = Array.from(track.querySelectorAll(".news-card"));

    let currentPage = 0;


    function getCardsPerPage() {

        if (window.innerWidth <= 700) {
            return 1;
        }

        if (window.innerWidth <= 1000) {
            return 2;
        }

        return 3;
    }


    function getTotalPages() {

        return Math.ceil(cards.length / getCardsPerPage());

    }


    function updateCarousel() {

        const cardsPerPage = getCardsPerPage();
        const totalPages = getTotalPages();

        if (currentPage >= totalPages) {
            currentPage = totalPages - 1;
        }

        if (currentPage < 0) {
            currentPage = 0;
        }


        const firstCard = cards[0];

        if (!firstCard) {
            return;
        }


        const cardWidth = firstCard.getBoundingClientRect().width;

        const trackStyle = window.getComputedStyle(track);

        const gap = parseFloat(trackStyle.gap) || 0;


        const offset = currentPage * (cardWidth + gap) * cardsPerPage;


        track.style.transform = `translateX(-${offset}px)`;


        prevButton.disabled = currentPage === 0;

        nextButton.disabled = currentPage === totalPages - 1;


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "is-active",
                index === currentPage
            );

        });

    }


    prevButton.addEventListener("click", () => {

        if (currentPage > 0) {

            currentPage--;

            updateCarousel();

        }

    });


    nextButton.addEventListener("click", () => {

        if (currentPage < getTotalPages() - 1) {

            currentPage++;

            updateCarousel();

        }

    });


    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentPage = index;

            updateCarousel();

        });

    });


    window.addEventListener("resize", updateCarousel);


    updateCarousel();

});