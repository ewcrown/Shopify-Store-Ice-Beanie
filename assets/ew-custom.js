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