const sliders = document.querySelectorAll('.splide');
sliders.forEach(slider => {
  const sliderName = slider.dataset.name
  if (sliderName == 'Testimonial Slider') {
    new Splide(slider, {
      type: "loop",
      padding: "50rem",
      gap: "7rem",
      pagination: false,
      arrows: false,
      breakpoints: {
        1200: {
          padding: "10rem",
          gap: "1.5rem",
        },
        992: {
          padding: "5rem",
          gap: "1rem",
        },
        768: {
          padding: "5rem",
          gap: "0.5rem",
        },
        480: {
          padding: "5rem",
          gap: "0.2rem",
        },
      },
    }).mount();
  } else if (sliderName == "Reviews Slider") {
    new Splide(slider, {
      type: "loop",
      perPage: 1,
      pagination: false,
      arrows: true,
    }).mount();
  } else if (sliderName == "Review Video Slider") {
    new Splide(slider, {
      type: 'loop',
      perPage: 1,
      padding: "30rem",
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
  }
  else {
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

document.addEventListener('DOMContentLoaded', function () {
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
});






const initialContent = document.querySelector('.ice-slide-content[data-slide="0"]');
if (initialContent) {
  initialContent.classList.add('active');
}
const imageSlider = document.querySelector("#image-slider")

if (imageSlider) {
  const reviewCustomSlider = new Splide(imageSlider, {
    type: 'slide',
    perPage: 2,
    focus: 'right',
    direction: 'rtl',
    gap: '1rem',
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
