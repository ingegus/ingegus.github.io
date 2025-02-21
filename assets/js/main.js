document.addEventListener("DOMContentLoaded", function () {
    /*---- Feed RSS ----*/
    const mediumUrl = 'https://ingegus.medium.com/';
    const numPostsToShow = 6;
    const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${mediumUrl}/feed`;

    // Crear tarjetas de feed RSS
    function createCard(item, index) {
        const parser = new DOMParser();
        const contentDoc = parser.parseFromString(item.content, 'text/html');
        const firstImage = contentDoc.querySelector('img')?.src || 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Medium_Logo.webp';

        return `
            <div class="col-md-4 mb-4">
                <div class="blog__card h-100">
                    <img src="${firstImage}" class="blog__card--img" alt="Imagen del artículo ${index + 1}">
                    <div class="blog__card--body">
                        <h4 class="blog__card--title">${item.title}</h4>
                        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-bd-primary mt-auto" 
                           aria-label="Leer el artículo llamado '${item.title}'">Leer más</a>
                    </div>
                </div>
            </div>`;
    }

    // Crear indicadores del carrusel
    function createIndicators(numSlides) {
        let indicatorsHtml = '<div class="carousel-indicators" role="tablist">';
        for (let i = 0; i < numSlides; i++) {
            indicatorsHtml += `<button 
                type="button" 
                data-bs-target="#carouselExampleControls" 
                data-bs-slide-to="${i}" 
                class="${i === 0 ? 'active' : ''}" 
                role="tab" 
                aria-label="Slide ${i + 1}" 
                aria-selected="${i === 0 ? 'true' : 'false'}">
            </button>`;
        }
        indicatorsHtml += '</div>';
        return indicatorsHtml;
    }

    // Cargar y mostrar tarjetas RSS
    function loadRssCards() {
        fetch(feedUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    const items = data.items.slice(0, numPostsToShow);
                    const rssCardsContainer = document.getElementById('rssCards');
                    const carouselIndicators = document.getElementById('carouselIndicators');
                    let html = '';
                    for (let i = 0; i < items.length; i += 3) {
                        html += `<div class="carousel-item ${i === 0 ? 'active' : ''}" role="tabpanel" id="slide-${i + 1}">
                                    <div class="row">`;
                        for (let j = i; j < i + 3 && j < items.length; j++) {
                            html += createCard(items[j], j);
                        }
                        html += '</div></div>';
                    }
                    rssCardsContainer.innerHTML = html;
                    carouselIndicators.innerHTML = createIndicators(Math.ceil(items.length / 3));

                    if (items.length <= 3) {
                        document.querySelector('.carousel-control-prev').style.display = 'none';
                        document.querySelector('.carousel-control-next').style.display = 'none';
                    }
                }
            })
            .catch(error => console.error("Error al cargar el feed RSS:", error));
    }

    loadRssCards();

    /*--- Filtro de la sección portafolio ---*/
    document.querySelectorAll(".filter-b").forEach(button => {
        button.addEventListener("click", function () {
            const value = this.getAttribute("data-filter");
            document.querySelectorAll(".filter").forEach(item => {
                if (value === "todo" || item.classList.contains(value)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

            document.querySelectorAll(".filter-b").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });

    /*--- Botón ir hacia arriba ---*/
    const goToTopBtn = document.querySelector('.go-to-top');
    if (goToTopBtn) {
        goToTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        window.addEventListener("scroll", function () {
            goToTopBtn.style.display = window.scrollY > 600 ? "block" : "none";
        });
    }

    /*--- Año actual ---*/
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /*--- Activar clase en menú al hacer scroll ---*/
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('nav-link--active'));
                this.classList.add('nav-link--active');
            }
        });
    });

});
