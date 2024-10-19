/*---- Feed RSS ----*/
const mediumUrl = 'https://ingegus.medium.com'; // URL de Medium
const numPostsToShow = 6; // Número de posts a mostrar
// Construir la URL del feed de Medium
const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${mediumUrl}/feed`;
// Función para crear las tarjetas
function createCard(item, index) {
    // Obtener la primera imagen del contenido
    const firstImage = $(item.content).find('img').first().attr('src');
    const thumbnail = firstImage ? firstImage : 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Medium_Logo.webp'; // Si no hay imagen, usar una imagen de marcador de posición

    const card = `
            <div class="col-md-4 mb-4">
                <div class="blog__card h-100">
                    <img src="${thumbnail}" class="blog__card--img " alt="Imagen del artículo ${index + 1}">
                    <div class="blog__card--body">
                        <h4 class="blog__card--title">${item.title}</h4>
                        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-bd-primary mt-auto">Leer más</a>
                    </div>
                </div>
            </div>
        `;

    return card;
}
// Función para cargar y mostrar las tarjetas
function loadRssCards() {
    $.getJSON(feedUrl, function (data) {
        if (data.status === 'ok') {
            const items = data.items.slice(0, numPostsToShow);

            const rssCardsContainer = $('#rssCards');
            let html = '';
            let indicatorsHtml = '';
            let active = 'active';
            for (let i = 0; i < items.length; i += 3) {
                html += `<div class="carousel-item ${active}"><div class="row">`;
                for (let j = i; j < i + 3 && j < items.length; j++) {
                    const cardHtml = createCard({
                        title: items[j].title,
                        content: items[j].content,
                        link: items[j].link,
                        guid: j,
                    }, j);
                    html += cardHtml;
                }
                html += '</div></div>';
                indicatorsHtml += `<li data-bs-target="#carouselExampleControls" data-bs-slide-to="${i / 3}" class="${active}" aria-label="Slide ${i / 3 + 1}"></li>`;
                active = '';
            }
            rssCardsContainer.html(html);
            $('#carouselIndicators').html(indicatorsHtml);

            // Ocultar los controles si hay 3 o menos posts
            if (items.length <= 3) {
                $('.carousel-control-prev, .carousel-control-next').hide();
            }
        }
    });
}
// Cargar y mostrar las tarjetas al cargar la página
$(document).ready(function () {
    loadRssCards();
});

/*--- Filtro de la sección portafolio---*/
$(document).ready(function () {

    $(".filter-b").click(function () {
        var value = $(this).attr('data-filter');
        if (value == "todo") {
            $('.filter').show('1000');
        }
        else {
            $(".filter").not('.' + value).hide('3000');
            $('.filter').filter('.' + value).show('3000');
        }
        // Agrega la clase active al botón seleccionado
        $(".filter-b").removeClass("active");
        $(this).addClass("active");
    });
});

/*--- Botón ir hacia arriba ---*/

$(document).ready(function(){

	$('.go-to-top').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});

	$(window).scroll(function(){
		if( $(this).scrollTop() > 600 ){
			$('.go-to-top').slideDown(300);
		} else {
			$('.go-to-top').slideUp(300);
		}
	});

});

/*---- Enlaces activos al hacer clic en el menú ----*/

$(document).ready(function () {
    // Agregar clase 'nav-link--active' al enlace activo y eliminarla de los demás enlaces
    $('.nav-link').on('click', function () {
        $('.nav-link').removeClass('nav-link--active');
        $(this).addClass('nav-link--active');
    });
});

$(document).ready(function () {
    // Función para activar el enlace basado en la posición del desplazamiento
    function activateNavLink() {
        var scrollPosition = $(window).scrollTop();
        $('.nav-link').each(function () {
            var target = $(this).attr('href');
            var targetSection = $(target);

            // Verifica si la sección está en la vista
            if (targetSection.offset().top <= scrollPosition + 60 &&
                targetSection.offset().top + targetSection.outerHeight() > scrollPosition) {
                $('.nav-link').removeClass('nav-link--active');
                $(this).addClass('nav-link--active');
            }
        });
    }

    // Activar el enlace cuando se desplaza
    $(window).on('scroll', activateNavLink);

    // Activar el enlace al cargar la página si ya se está en una sección
    activateNavLink();
});
