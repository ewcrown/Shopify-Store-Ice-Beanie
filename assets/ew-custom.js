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
        1600: {
          padding: "30rem",
          gap: "1.5rem",
        },
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


    let reviewSlider = new Splide('#ew-review-slider', {
      type: "loop",
      perPage: 2,
      perMove: 1,
      gap: '30px',
      focus: '1',
      pagination: false,
      arrows: false,
      breakpoints: {
        980: {
          perPage: 1
        }
      }
    }).mount();

    document.querySelector('.ice-slider-navigation .splide__arrow--prev').addEventListener('click', () => reviewSlider.go('<'));
    document.querySelector('.ice-slider-navigation .splide__arrow--next').addEventListener('click', () => reviewSlider.go('>'));
  
    function updateContent(index) {
      document.querySelectorAll('.ice-slide-content').forEach((item) => {
        item.classList.remove('active');
      });

      let activeContent = document.querySelector(`.ice-slide-content[data-content="${index}"]`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    }

    reviewSlider.on('moved', function (newIndex) {
      updateContent(newIndex);
    });

    // Set initial content
    updateContent(0);

  } else if (sliderName == "Review Video Slider") {
    new Splide(slider, {
      type: 'loop',
      perPage: 1,
      focus: 'center',
      padding: "40rem",
      gap: '0rem',
      arrows: false,
      pagination: false,
      breakpoints: {
        1200: {
          padding: "20rem",
          gap: '0rem',
        },
        980: {
          perPage: 1,
          padding: "10rem",
        },
        600: {
          perPage: 1,
          padding: "5rem",
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
        pagination: false,
        arrows: false,
        cover: true,
      });

      let thumbnails = new Splide('#ew-thumbnail-slider', {
        fixedWidth: 130,
        fixedHeight: 143,
        isNavigation: true,
        wheel: true,
        gap: 10,
        arrows: false,
        focus: 'center',
        pagination: false,
        cover: true,
        perPage: 4,
        direction: 'ttb', // Vertical mode
        height: 600, // Ensuring it fits inside the container
        breakpoints: {
          1500: {
            fixedWidth: 100,
            fixedHeight: 112,
          },
          980: {
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
const quantitySelector = document.querySelectorAll('.quantity-selector')

quantitySelector?.forEach((single)=>{
  const minusBtn = single.querySelector('.minus');
  const plusBtn = single.querySelector('.plus');
  const quantityValue = single.querySelector('.quantity-value');
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
})