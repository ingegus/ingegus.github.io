const lastFocused = {};

function openModal(id) {
  const dialog = document.getElementById(id);
  lastFocused[id] = document.activeElement;
  dialog.showModal();

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(id);
    }
  });
}

function closeModal(id) {
  const dialog = document.getElementById(id);
  dialog.close();
  if (lastFocused[id]) {
    lastFocused[id].focus();
  }
}

// Enganchar dinámicamente a botones e imágenes
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-open-modal]").forEach(el => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-open-modal");
      openModal(id);
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach(el => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-close-modal");
      closeModal(id);
    });
  });
});


/* slide OLPH */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].classList.add("active");
}

// Navegación con teclado
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') {
    plusSlides(-1);
  } else if (e.key === 'ArrowRight') {
    plusSlides(1);
  }
});


(function () {
  let index = 0;
  const slides = document.querySelectorAll('.testimonials__carousel--item');
  if (!slides.length) return; // si no hay slides, no hace nada
  const total  = slides.length;
  const prevBtn = document.querySelector('.testimonials__prev');
  const nextBtn = document.querySelector('.testimonials__next');

  function showSlide(n) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('testimonials__carousel--active', i === n);
    });
  }

  function toNext() {
    index = (index + 1) % total;
    showSlide(index);
  }

  function toPrev() {
    index = (index - 1 + total) % total;
    showSlide(index);
  }

  nextBtn?.addEventListener('click', toNext);
  prevBtn?.addEventListener('click', toPrev);

  // Control por teclado para este carrusel de testimonios
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') toNext();
    if (e.key === 'ArrowLeft') toPrev();
  });

  // Mostrar la primera slide al cargar
  showSlide(index);
})();



document.addEventListener("DOMContentLoaded", function () {
  /* RSS de Medium */

  const mediumUrl = 'https://ingegus.medium.com/';
  const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${mediumUrl}/feed`;

  let items = [];
  let currentIndex = 0;
  const itemsPerPage = 2;

  function createCard(item, index) {
    const parser = new DOMParser();
    const contentDoc = parser.parseFromString(item.content, 'text/html');
    const firstImage = contentDoc.querySelector('img')?.src || 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Medium_Logo.webp';

    return `
        <div class="blog__card--wrapper">
          <div class="blog__card">
            <img src="${firstImage}" class="blog__card--img" alt="Imagen del artículo ${index + 1}">
            <div class="blog__card--body">
              <h4 class="blog__card--title">${item.title}</h4>
              <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="button__primary blog__button"
                aria-label="Leer el artículo llamado '${item.title}'">Leer más</a>
            </div>
          </div>
        </div>`;
  }

  function renderItems() {
    const container = document.getElementById('rssCards');
    const end = currentIndex + itemsPerPage;
    const itemsToRender = items.slice(currentIndex, end);
    let html = '';
    itemsToRender.forEach((item, index) => {
      html += createCard(item, currentIndex + index);
    });
    container.innerHTML += html;
    currentIndex += itemsPerPage;

    if (currentIndex >= items.length) {
      document.getElementById('loadMoreBtn').style.display = 'none';
    }
  }

  function loadRssCards() {
    fetch(feedUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          items = data.items;
          renderItems();
        } else {
          console.error("Feed no válido:", data);
        }
      })
      .catch(error => console.error("Error al cargar el feed RSS:", error));
  }

  document.getElementById('loadMoreBtn').addEventListener('click', renderItems);

  loadRssCards();


  /*--- Filtro de la sección portafolio ---*/
  document.querySelectorAll(".filter-b").forEach(button => {
    button.addEventListener("click", function () {
      const value = this.getAttribute("data-filter");

      document.querySelectorAll(".filter").forEach(item => {
        if (value === "todo" || item.classList.contains(value)) {
          item.classList.remove("hidden");
          setTimeout(() => {
            item.style.display = "block";
          }, 300); // debe coincidir con el tiempo del CSS
        } else {
          item.classList.add("hidden");
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
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
});

const toggle = document.getElementById("toggle");
    const menu = document.getElementById("menu");
    const links = document.querySelectorAll(".navbar__link");

    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
      toggle.classList.toggle("close");
    });

    // 👇 Cierra el menú al hacer clic en un link (solo en mobile)
    links.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 768) {
          menu.classList.remove("open");
          toggle.classList.remove("close");
        }
      });
    });

    const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar__link");

function setActiveLink() {
  let scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 70; // altura navbar
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("navbar__link--current");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("navbar__link--current");
        }
      });
    }
  });
}

window.addEventListener("scroll", setActiveLink);

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("navbar__link--current"));
    link.classList.add("navbar__link--current");
  });
});
