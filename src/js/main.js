document.addEventListener(
    "DOMContentLoaded",
    function () {

        const header =
            document.getElementById("header");

        const navLinks =
            Array.from(
                document.querySelectorAll(
                    ".nav-link"
                )
            );

        const sections =
            navLinks.map(
                function (link) {

                    return document.querySelector(
                        link.getAttribute("href")
                    );

                }
            );


        // =========================
        // Smooth scrolling
        // =========================

        const pageLinks =
            document.querySelectorAll(
                ".nav-link, .logo, .main-button, .secondary-link"
            );


        pageLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            link.getAttribute("href");

                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const headerHeight =
                            header.offsetHeight;


                        const targetPosition =
                            target
                                .getBoundingClientRect()
                                .top
                            +
                            window.scrollY
                            -
                            headerHeight;


                        window.scrollTo({
                            top:
                                targetId === "#home"
                                    ? 0
                                    : targetPosition,

                            behavior:
                                "smooth"
                        });

                    }
                );

            }
        );


        // =========================
        // Navbar resize
        // =========================

        function resizeNavbar() {

            if (
                window.scrollY > 20
            ) {

                header.classList.add(
                    "small"
                );

            } else {

                header.classList.remove(
                    "small"
                );

            }

        }


        // =========================
        // Position indicator
        // =========================

        function updateNavigation() {

            const navBottom =
                header.offsetHeight + 10;

            let activeSection =
                sections[0].id;


            sections.forEach(
                function (section) {

                    const sectionTop =
                        section
                            .getBoundingClientRect()
                            .top;


                    if (
                        sectionTop <=
                        navBottom
                    ) {

                        activeSection =
                            section.id;

                    }

                }
            );


            const reachedBottom =
                window.innerHeight
                +
                window.scrollY
                >=
                document.documentElement
                    .scrollHeight
                -
                5;


            if (reachedBottom) {

                activeSection =
                    sections[
                        sections.length - 1
                    ].id;

            }


            navLinks.forEach(
                function (link) {

                    const target =
                        link
                            .getAttribute("href")
                            .substring(1);


                    if (
                        target ===
                        activeSection
                    ) {

                        link.classList.add(
                            "active"
                        );

                        link.setAttribute(
                            "aria-current",
                            "page"
                        );

                    } else {

                        link.classList.remove(
                            "active"
                        );

                        link.removeAttribute(
                            "aria-current"
                        );

                    }

                }
            );

        }


        function handleScroll() {

            resizeNavbar();

            updateNavigation();

        }


        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true
            }
        );


        window.addEventListener(
            "resize",
            updateNavigation
        );


        // =========================
        // Carousel
        // =========================

        const track =
            document.getElementById(
                "carouselTrack"
            );

        const slides =
            document.querySelectorAll(
                ".slide"
            );

        const previous =
            document.getElementById(
                "prevButton"
            );

        const next =
            document.getElementById(
                "nextButton"
            );

        const dots =
            document.querySelectorAll(
                ".dot"
            );


        let slideIndex = 0;


        function showSlide(index) {

            slideIndex = index;


            track.classList.remove(
                "slide-0",
                "slide-1",
                "slide-2"
            );


            track.classList.add(
                "slide-" + slideIndex
            );


            dots.forEach(
                function (dot, index) {

                    dot.classList.toggle(
                        "active",
                        index === slideIndex
                    );

                }
            );


            slides.forEach(
                function (slide, index) {

                    slide.setAttribute(
                        "aria-hidden",
                        index === slideIndex
                            ? "false"
                            : "true"
                    );

                }
            );

        }


        previous.addEventListener(
            "click",
            function () {

                slideIndex -= 1;


                if (
                    slideIndex < 0
                ) {

                    slideIndex =
                        slides.length - 1;

                }


                showSlide(
                    slideIndex
                );

            }
        );


        next.addEventListener(
            "click",
            function () {

                slideIndex += 1;


                if (
                    slideIndex >=
                    slides.length
                ) {

                    slideIndex = 0;

                }


                showSlide(
                    slideIndex
                );

            }
        );


        dots.forEach(
            function (dot) {

                dot.addEventListener(
                    "click",
                    function () {

                        showSlide(
                            Number(
                                dot.dataset.slide
                            )
                        );

                    }
                );

            }
        );


        // =========================
        // Modal
        // =========================

        const projectInfo = {

            llm: {

                title:
                    "Multi-Turn Jailbreaking Evaluation for LLMs",

                text:
                    "This project created an evaluation framework for studying LLM vulnerabilities using multi-turn attack strategies. It focused on comparing model behavior and measuring attack success across multiple conversation turns."

            },


            booking: {

                title:
                    "Booking & Admin Management System",

                text:
                    "This project is a full-stack reservation system. It includes service browsing, booking management, authentication, database operations, real-time availability, and different interfaces for customers and administrators."

            },


            leetcode: {

                title:
                    "LeetCode Practice Platform",

                text:
                    "This project is a coding practice platform using FastAPI and PostgreSQL. Users can search and filter problems by category, difficulty, and company while tracking their practice performance."

            }

        };


        const modal =
            document.getElementById(
                "projectModal"
            );

        const modalTitle =
            document.getElementById(
                "modalTitle"
            );

        const modalText =
            document.getElementById(
                "modalText"
            );

        const closeButton =
            document.getElementById(
                "closeModal"
            );

        const modalBackground =
            document.querySelector(
                ".modal-background"
            );

        const detailButtons =
            document.querySelectorAll(
                ".details-button"
            );


        let lastFocusedElement =
            null;


        function openModal(
            projectName
        ) {

            const project =
                projectInfo[
                    projectName
                ];


            if (!project) {
                return;
            }


            lastFocusedElement =
                document.activeElement;


            modalTitle.textContent =
                project.title;

            modalText.textContent =
                project.text;


            modal.classList.add(
                "open"
            );

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "modal-open"
            );


            closeButton.focus();

        }


        function closeModal() {

            modal.classList.remove(
                "open"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "modal-open"
            );


            if (
                lastFocusedElement
            ) {

                lastFocusedElement.focus();

            }

        }


        detailButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openModal(
                            button.dataset.project
                        );

                    }
                );

            }
        );


        closeButton.addEventListener(
            "click",
            closeModal
        );


        modalBackground.addEventListener(
            "click",
            closeModal
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                    &&
                    modal.classList.contains(
                        "open"
                    )
                ) {

                    closeModal();

                }

            }
        );


        // Initial state

        showSlide(0);

        handleScroll();

    }
);