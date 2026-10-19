
document.addEventListener("DOMContentLoaded", function () {


// HERO IMAGE SLIDER


    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slider-dot");
    const prevButton = document.getElementById("prevSlide");
    const nextButton = document.getElementById("nextSlide");

    if (slides.length > 0) {
        let currentSlide = 0;
        let sliderInterval;

        function showSlide(index) {
            currentSlide = (index + slides.length) % slides.length;

            slides.forEach(function (slide, i) {
                slide.classList.toggle("active", i === currentSlide);
            });

            dots.forEach(function (dot, i) {
                dot.classList.toggle("active", i === currentSlide);
            });
        }

        function startSlider() {
            clearInterval(sliderInterval);

            sliderInterval = setInterval(function () {
                showSlide(currentSlide + 1);
            }, 3000);
        }

        if (prevButton) {
            prevButton.addEventListener("click", function () {
                showSlide(currentSlide - 1);
                startSlider();
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", function () {
                showSlide(currentSlide + 1);
                startSlider();
            });
        }

        dots.forEach(function (dot, index) {
            dot.addEventListener("click", function () {
                showSlide(index);
                startSlider();
            });
        });

        showSlide(0);
        startSlider();
    }



// COLLECTIONS: SEARCH AND FILTER

    const searchInput = document.getElementById("searchInput");

    const categoryFilters = document.querySelectorAll(
        ".category-filter"
    );

    const productCards = document.querySelectorAll(
        "#productGrid .product-card"
    );

    const resultCount = document.getElementById("resultCount");
    const noResults = document.getElementById("noResults");
    const clearFilters = document.getElementById("clearFilters");

    function filterProducts() {
        if (!searchInput || productCards.length === 0) {
            return;
        }

        const searchText = searchInput.value.trim().toLowerCase();

        const selectedCategories = Array.from(categoryFilters)
            .filter(function (checkbox) {
                return checkbox.checked;
            })
            .map(function (checkbox) {
                return checkbox.value;
            });

        let visibleCount = 0;

        productCards.forEach(function (card) {
            const productName = card.querySelector("h3")
                .textContent.toLowerCase();

            const productCategory = card.dataset.category;

            const matchesSearch = productName.includes(searchText);

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(productCategory);

            if (matchesSearch && matchesCategory) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (resultCount) {
            resultCount.textContent =
                visibleCount + " product(s) found";
        }

        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }
    }

    if (searchInput) {
           searchInput.addEventListener("input", filterProducts);
        const params = new URLSearchParams(window.location.search);
        const categoryFromURL = params.get("category");

        if (categoryFromURL) {
            categoryFilters.forEach(function (checkbox) {
                checkbox.checked =
                    checkbox.value === categoryFromURL;
            });
        }

        filterProducts();
    }


    categoryFilters.forEach(function (checkbox) {
        checkbox.addEventListener("change", filterProducts);
    });

    if (clearFilters) {
        clearFilters.addEventListener("click", function () {
            if (searchInput) {
                searchInput.value = "";
            }

            categoryFilters.forEach(function (checkbox) {
                checkbox.checked = false;
            });

            filterProducts();
        });
    }

    //CONTACT FORM


    const contactForm = document.getElementById("contactForm");
    const contactMessage = document.getElementById("contactMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            contactMessage.textContent =
                "Thank you! Your form has been validated.";

            contactForm.reset();
        });
    }

    // 4. NEWSLETTER FORM


    const newsletterForm = document.getElementById("newsletterForm");

    const newsletterMessage =
        document.getElementById("newsletterMessage");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (event) {
            event.preventDefault();

            newsletterMessage.textContent =
                "Thank you for subscribing!";

            newsletterForm.reset();
        });
    }

});
