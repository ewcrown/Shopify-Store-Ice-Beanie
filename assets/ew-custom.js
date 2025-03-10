const sliders = document.querySelectorAll('.splide');
sliders.forEach(slider => {
  const sliderName = slider.dataset.name
  if (sliderName == 'Testimonial Slider') {
    new Splide(slider, {
      type: "loop",
      padding: "48rem",
      gap: 34,
      pagination: false,
      arrows: false,
      breakpoints: {
        1200: {
          padding: "10rem",
          gap: "1.5rem",
        },
        992: {
          padding: "1rem",
          gap: "1rem",
          perPage: 1
        }
      },
    }).mount();
  } else if (sliderName == "Reviews Slider 2") {
    const initialContent = document.querySelector('.ice-slide-content[data-slide="0"]');
    if (initialContent) {
      initialContent.classList.add('active');
      initialContent.querySelector('.ice-prev-slide').classList.add('disabled')
    }
    const imageSlider = document.querySelector("#image-slider")

    if (imageSlider) {
      const reviewCustomSlider = new Splide(imageSlider, {
        type: 'slide',
        perPage: 2,
        focus: 'right',
        direction: 'rtl',
        gap: '2rem',
        pagination: false,
        breakpoints: {
          767: {
            perPage: 1
          }
        }
      })

      reviewCustomSlider.mount();

      reviewCustomSlider.on('active', function (slide) {
        document.querySelectorAll('.ice-slide-content').forEach(content => {
          content.classList.remove('active');
          content.querySelector('.ice-prev-slide').classList.remove('disabled');
          content.querySelector('.ice-next-slide').classList.remove('disabled');
        });

        const currentIndex = slide.index;
        const currentContent = document.querySelector(`.ice-slide-content[data-slide="${currentIndex}"]`);
        if (currentContent) {
          currentContent.classList.add('active');
        }
      });

      reviewCustomSlider.on('click', function (slide, event) {
        const clickedSlide = event.target.closest('#image-slider .splide__slide');
        if (clickedSlide && !clickedSlide.classList.contains('is-active')) {
          const slideIndex = slide.index;
          reviewCustomSlider.go(slideIndex);
        }
      });

      reviewCustomSlider.on('mounted', function () {
        const activeContent = document.querySelector('.ice-slide-content[data-slide="0"]');
        if (activeContent && !activeContent.classList.contains('active')) {
          activeContent.classList.add('active');
          activeContent.querySelector('.ice-prev-slide').classList.add('disabled')
        }
      });

      document.querySelectorAll('.ice-prev-slide').forEach(button => {
        button.addEventListener('click', function () {
          reviewCustomSlider.go('<');
        });
      });

      document.querySelectorAll('.ice-next-slide').forEach(button => {
        button.addEventListener('click', function () {
          reviewCustomSlider.go('>');
        });
      });
    }
  } else if (sliderName == "Review Video Slider") {
    new Splide(slider, {
      type: 'loop',
      perPage: 1,
      padding: "50rem",
      focus: 'center',
      gap: '10rem',
      arrows: false,
      pagination: false,
      breakpoints: {
        767: {
          perPage: 1,
          padding: "0rem",
        }
      }
    }).mount();
    const playButtons = document.querySelectorAll('.play-button');
    playButtons?.forEach(button => {
      button?.addEventListener('click', function () {
        const video = this.closest('.ice-video-container').querySelector('video');
        if (video.paused) {
          video.play();
          this.style.display = 'none'; // Hide play button when video plays
        } else {
          video.pause();
          this.style.display = 'flex'; // Show play button when video is paused
        }
      });
    });
  } else if (sliderName == "Product Gallery") {
    document.addEventListener('DOMContentLoaded', function () {
      let main = new Splide('#ew-main-slider', {
        type: 'fade',
        heightRatio: 0.5,
        pagination: false,
        arrows: false,
        cover: true,
      });

      let thumbnails = new Splide('#ew-thumbnail-slider', {
        fixedWidth: 160,
        fixedHeight: 143,
        isNavigation: true,
        wheel    : true,
        gap: 10,
        arrows: false,
        focus: 'center',
        pagination: false,
        cover: true,
        perPage: 4,
        direction: 'ttb', // Vertical mode
        height: 600, // Ensuring it fits inside the container
        breakpoints: {
          767: {
            fixedWidth: 115,
            fixedHeight: 120,
            direction: 'ltr', // Vertical mode
          },
        },
      });

      main.sync(thumbnails);
      main.mount();
      thumbnails.mount();
    })
  } else if (sliderName == "Reviews Slider") {
    new Splide(slider, {
      type: "loop",
      perPage: 1,
      pagination: false,
      arrows: true,
    }).mount();
  } else {
    new Splide(slider, {
      type: 'loop',
      perPage: 3,
      perMove: 1,
      gap: '1rem',
      padding: '5rem',
      autoplay: true,
      interval: 3000,
      arrows: true,
      pagination: true,
      breakpoints: {
        1024: { perPage: 2, padding: '2rem' },
        768: { perPage: 1, padding: '1rem' }
      }
    }).mount();
  }
});

// Header
const hamburger = document.querySelector('.ice-hamburger');
const navLinks = document.querySelector('.ice-nav-links');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.ice-nav-links a')?.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Quantity Selector
const quantitySelector = document.querySelector('.quantity-selector')
const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const quantityValue = document.querySelector('.quantity-value');
if (quantitySelector) {
  let quantity = parseInt(quantityValue.textContent);
  minusBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
    }
    minusBtn.disabled = quantity <= 1;
  });
  plusBtn.addEventListener('click', () => {
    quantity++;
    quantityValue.textContent = quantity;
    minusBtn.disabled = false;
  });
  minusBtn.disabled = quantity <= 1;
}