/* =========================================
   HEADER + NAVEGACIÓN + CARRUSEL PONENTES
   ========================================= */


/* =========================================
   HEADER
   ========================================= */

const header = document.getElementById("siteHeader");
const toggle = document.getElementById("navToggle");
const mobile = document.getElementById("mobileNav");


/* =========================================
   CAMBIO DE HEADER AL HACER SCROLL
   ========================================= */

function updateHeader() {

    /*
     * Cuando el usuario baja más de 40px,
     * añadimos la clase "is-scrolled".
     *
     * Esta clase está definida en header.css
     * y cambia el fondo, color y sombra del header.
     */

    if (header) {

        header.classList.toggle(
            "is-scrolled",
            window.scrollY > 40
        );

    }

}


/*
 * Detectamos el scroll de la página.
 */

window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


/*
 * Ejecutamos la función una primera vez
 * para comprobar el estado inicial.
 */

updateHeader();



/* =========================================
   MENÚ MÓVIL
   ========================================= */

if (toggle && mobile) {

    /*
     * Abrir / cerrar menú móvil
     * al pulsar el botón hamburguesa.
     */

    toggle.addEventListener(
        "click",
        function () {

            const open = mobile.classList.toggle(
                "is-open"
            );

            /*
             * Actualizamos aria-expanded
             * para mejorar la accesibilidad.
             */

            toggle.setAttribute(
                "aria-expanded",
                open
            );

        }
    );


    /*
     * Cuando se pulsa un enlace del menú móvil,
     * cerramos automáticamente el menú.
     */

    mobile
        .querySelectorAll("a")
        .forEach(function (a) {

            a.addEventListener(
                "click",
                function () {

                    mobile.classList.remove(
                        "is-open"
                    );

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}



/* =========================================
   CARRUSEL DE PONENTES
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /*
         * Contenedor principal que se desplaza.
         */

        const track = document.querySelector(
            ".speakers-track"
        );


        /*
         * Todas las tarjetas de ponentes.
         */

        const cards = document.querySelectorAll(
            ".speaker-card"
        );


        /*
         * Botón anterior.
         */

        const prevButton = document.querySelector(
            ".speakers-arrow-prev"
        );


        /*
         * Botón siguiente.
         */

        const nextButton = document.querySelector(
            ".speakers-arrow-next"
        );


        /*
         * Indicadores inferiores del carrusel.
         */

        const dots = document.querySelectorAll(
            ".speakers-dot"
        );


        /*
         * Si la página no contiene el carrusel,
         * simplemente no hacemos nada.
         *
         * Esto permite utilizar este mismo
         * navigation.js en el resto de páginas.
         */

        if (!track || !cards.length) {
            return;
        }


        /*
         * Índice de la posición actual.
         */

        let currentIndex = 0;



        /* =========================================
           TARJETAS VISIBLES SEGÚN EL DISPOSITIVO
           ========================================= */

        function getCardsPerView() {

            /*
             * Móvil:
             * mostramos 1 ponente.
             */

            if (window.innerWidth <= 700) {

                return 1;

            }


            /*
             * Tablet:
             * mostramos 2 ponentes.
             */

            if (window.innerWidth <= 1000) {

                return 2;

            }


            /*
             * Escritorio:
             * mostramos 3 ponentes.
             */

            return 3;

        }



        /* =========================================
           ACTUALIZAR CARRUSEL
           ========================================= */

        function updateCarousel() {


            /*
             * Calculamos cuántas tarjetas
             * podemos mostrar según el ancho.
             */

            const cardsPerView =
                getCardsPerView();


            /*
             * Calculamos el índice máximo
             * al que podemos desplazarnos.
             */

            const maxIndex = Math.max(
                0,
                cards.length - cardsPerView
            );


            /*
             * Si al cambiar de tamaño de pantalla
             * el índice actual deja de ser válido,
             * lo corregimos.
             */

            if (currentIndex > maxIndex) {

                currentIndex = maxIndex;

            }


            /*
             * Obtenemos el ancho real de la primera tarjeta.
             *
             * Esto permite que el carrusel funcione
             * aunque el tamaño de las tarjetas cambie
             * mediante CSS.
             */

            const cardWidth =
                cards[0].getBoundingClientRect().width;


            /*
             * Obtenemos el espacio entre tarjetas
             * definido en CSS mediante "gap".
             */

            const gap =
                parseFloat(
                    window.getComputedStyle(track).gap
                ) || 0;


            /*
             * Calculamos cuánto tenemos que desplazar
             * horizontalmente el carrusel.
             */

            const offset =
                currentIndex *
                (cardWidth + gap);


            /*
             * Aplicamos el desplazamiento.
             */

            track.style.transform =
                `translateX(-${offset}px)`;



            /* =========================================
               ACTUALIZAR LOS PUNTOS
               ========================================= */

            dots.forEach(
                function (dot, index) {

                    /*
                     * Solo el punto correspondiente
                     * a la posición actual queda activo.
                     */

                    dot.classList.toggle(
                        "is-active",
                        index === currentIndex
                    );

                }
            );

        }



        /* =========================================
           BOTÓN SIGUIENTE
           ========================================= */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {


                    const cardsPerView =
                        getCardsPerView();


                    const maxIndex =
                        Math.max(
                            0,
                            cards.length -
                            cardsPerView
                        );


                    /*
                     * Avanzamos una posición.
                     */

                    if (currentIndex < maxIndex) {

                        currentIndex++;

                    } else {

                        /*
                         * Cuando llegamos al final,
                         * volvemos al principio.
                         */

                        currentIndex = 0;

                    }


                    /*
                     * Actualizamos el carrusel.
                     */

                    updateCarousel();

                }
            );

        }



        /* =========================================
           BOTÓN ANTERIOR
           ========================================= */

        if (prevButton) {

            prevButton.addEventListener(
                "click",
                function () {


                    const cardsPerView =
                        getCardsPerView();


                    const maxIndex =
                        Math.max(
                            0,
                            cards.length -
                            cardsPerView
                        );


                    /*
                     * Retrocedemos una posición.
                     */

                    if (currentIndex > 0) {

                        currentIndex--;

                    } else {

                        /*
                         * Si estamos al principio,
                         * saltamos al último grupo.
                         */

                        currentIndex = maxIndex;

                    }


                    /*
                     * Actualizamos el carrusel.
                     */

                    updateCarousel();

                }
            );

        }



        /* =========================================
           BOTONES DE PUNTOS
           ========================================= */

        dots.forEach(
            function (dot, index) {

                dot.addEventListener(
                    "click",
                    function () {


                        /*
                         * El índice del punto determina
                         * la posición del carrusel.
                         */

                        currentIndex = index;


                        /*
                         * Actualizamos el carrusel.
                         */

                        updateCarousel();

                    }
                );

            }
        );



        /* =========================================
           RESPONSIVE
           ========================================= */

        window.addEventListener(
            "resize",
            function () {

                /*
                 * Cuando cambia el tamaño de la ventana,
                 * recalculamos el carrusel.
                 */

                updateCarousel();

            }
        );



        /* =========================================
           INICIALIZAR CARRUSEL
           ========================================= */

        updateCarousel();

    }
);

document.addEventListener("DOMContentLoaded", function () {

    const targetDate =
        new Date("2026-09-24T15:00:00+02:00").getTime();


    const daysElement =
        document.getElementById("countdownDays");

    const hoursElement =
        document.getElementById("countdownHours");

    const minutesElement =
        document.getElementById("countdownMinutes");

    const secondsElement =
        document.getElementById("countdownSeconds");

    const countdownElement =
        document.getElementById("webinarCountdown");


    function updateCountdown() {

        const now =
            new Date().getTime();

        const difference =
            targetDate - now;


        /* WEBINAR FINALIZADO O COMENZADO */

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            countdownElement.classList.add(
                "webinar-countdown-finished"
            );

            return;
        }


        /* DÍAS */

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        /* HORAS */

        const hours =
            Math.floor(
                (difference %
                    (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            );


        /* MINUTOS */

        const minutes =
            Math.floor(
                (difference %
                    (1000 * 60 * 60))
                /
                (1000 * 60)
            );


        /* SEGUNDOS */

        const seconds =
            Math.floor(
                (difference %
                    (1000 * 60))
                /
                1000
            );


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


    setInterval(
        updateCountdown,
        1000
    );

});