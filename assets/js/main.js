$(document).ready(function () {
    /*---- Feed RSS ----*/
    const mediumUrl = 'https://ingegus.medium.com';
    const numPostsToShow = 6;
    const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${mediumUrl}/feed`;

    // Crear tarjetas de feed RSS
    function createCard(item, index) {
        const firstImage = $(item.content).find('img').first().attr('src');
        const thumbnail = firstImage || 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Medium_Logo.webp';

        return `
            <div class="col-md-4 mb-4">
                <div class="blog__card h-100">
                    <img src="${thumbnail}" class="blog__card--img" alt="Imagen del artículo ${index + 1}">
                    <div class="blog__card--body">
                        <h4 class="blog__card--title">${item.title}</h4>
                        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-bd-primary mt-auto">Leer más</a>
                    </div>
                </div>
            </div>`;
    }

    // Crear indicadores del carrusel
    function createIndicators(numSlides) {
        let indicatorsHtml = '';
        for (let i = 0; i < numSlides; i++) {
            indicatorsHtml += `<li data-bs-target="#carouselExampleControls" data-bs-slide-to="${i}" class="${i === 0 ? 'active' : ''}" aria-label="Slide ${i + 1}"></li>`;
        }
        return indicatorsHtml;
    }

    // Cargar y mostrar tarjetas RSS
    function loadRssCards() {
        $.getJSON(feedUrl)
            .done(function (data) {
                if (data.status === 'ok') {
                    const items = data.items.slice(0, numPostsToShow);
                    const rssCardsContainer = $('#rssCards');
                    let html = '';
                    for (let i = 0; i < items.length; i += 3) {
                        html += `<div class="carousel-item ${i === 0 ? 'active' : ''}"><div class="row">`;
                        for (let j = i; j < i + 3 && j < items.length; j++) {
                            html += createCard(items[j], j);
                        }
                        html += '</div></div>';
                    }
                    rssCardsContainer.html(html);
                    $('#carouselIndicators').html(createIndicators(Math.ceil(items.length / 3)));
                    if (items.length <= 3) $('.carousel-control-prev, .carousel-control-next').hide();
                }
            })
            .fail(function () {
                console.error("Error al cargar el feed RSS.");
            });
    }

    loadRssCards();

    /*--- Filtro de la sección portafolio ---*/
    $(".filter-b").click(function () {
        const value = $(this).attr('data-filter');
        $('.filter').toggle(value === 'todo').filter(`.${value}`).show('9000');
        $(".filter-b").removeClass("active");
        $(this).addClass("active");
    });

    /*--- Botón ir hacia arriba ---*/
    $('.go-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    $(window).scroll(function () {
        $('.go-to-top').toggle($(this).scrollTop() > 600);
    });

    /*--- Año actual ---*/
    $('#year').text(new Date().getFullYear());

    /*--- Activar clase en menú ---*/
    function activateSectionOnScroll() {
            var scrollPosition = $(window).scrollTop();
    
            $('.section').each(function () {
                var sectionOffset = $(this).offset().top;
                var sectionHeight = $(this).outerHeight();
                var sectionId = $(this).attr('id');
                var $link = $('a[href="#' + sectionId + '"]')
            });
        }
               
        // Al hacer clic en un enlace, activa la sección correspondiente y la clase
        $('.nav-link').on('click', function (e) {
            e.preventDefault();
    
            var target = $(this).attr('href');
            var offset = $(target).offset().top;
    
            $('html, body').animate({ scrollTop: offset }, 500, function () {
                $('.nav-link').removeClass('nav-link--active');
                $(e.target).addClass('nav-link--active');
                
                
            });
        });          
});
