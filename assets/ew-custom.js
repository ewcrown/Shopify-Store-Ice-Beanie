const sliders = document.querySelectorAll(".splide");
sliders.forEach((slider) => {
  const sliderName = slider.dataset.name;
  if (sliderName == "Testimonial Slider") {
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
          perPage: 1,
        },
      },
    }).mount();
  } 
  else if (sliderName == "Reviews Slider 2") {
    let reviewSlider = new Splide("#ew-review-slider", {
      type: "loop",
      perPage: 2,
      perMove: 1,
      gap: "30px",
      focus: "1",
      pagination: false,
      arrows: false,
      breakpoints: {
        980: {
          perPage: 1,
        },
      },
    }).mount();

    document
      .querySelector(".ice-slider-navigation .splide__arrow--prev")
      .addEventListener("click", () => reviewSlider.go("<"));
    document
      .querySelector(".ice-slider-navigation .splide__arrow--next")
      .addEventListener("click", () => reviewSlider.go(">"));

    function updateContent(index) {
      document.querySelectorAll(".ice-slide-content").forEach((item) => {
        item.classList.remove("active");
      });

      let activeContent = document.querySelector(
        `.ice-slide-content[data-content="${index}"]`
      );
      if (activeContent) {
        activeContent.classList.add("active");
      }
    }

    reviewSlider.on("moved", function (newIndex) {
      updateContent(newIndex);
    });

    // Set initial content
    updateContent(0);
  } 
  else if (sliderName == "Review Video Slider") {
    new Splide(slider, {
      type: "loop",
      perPage: 1,
      focus: "center",
      padding: "40rem",
      gap: "0rem",
      arrows: false,
      pagination: false,
      breakpoints: {
        1200: {
          padding: "20rem",
          gap: "0rem",
        },
        980: {
          perPage: 1,
          padding: "10rem",
        },
        600: {
          perPage: 1,
          padding: "5rem",
        },
      },
    }).mount();
    const playButtons = document.querySelectorAll(".play-button");
    playButtons?.forEach((button) => {
      button?.addEventListener("click", function () {
        const video = this.closest(".ice-video-container").querySelector(
          "video"
        );
        if (video.paused) {
          video.play();
          this.style.display = "none"; // Hide play button when video plays
        } else {
          video.pause();
          this.style.display = "flex"; // Show play button when video is paused
        }
      });
    });
  } 
  else if (sliderName == "Reviews Slider") {
    new Splide(slider, {
      type: "loop",
      perPage: 1,
      pagination: false,
      arrows: true,
    }).mount();
  } 
  else if (sliderName == "Product Gallery") {
    const isVariant =
      document.querySelector(".slider-wrap").dataset.colorVariants == "";

    if (isVariant) {
      document.addEventListener("DOMContentLoaded", function () {
        let main = new Splide("#ew-main-slider", {
          type: "fade",
          pagination: false,
          arrows: false,
          cover: true,
        });

        let thumbnails = new Splide("#ew-thumbnail-slider", {
          fixedWidth: 130,
          fixedHeight: 143,
          isNavigation: true,
          wheel: true,
          gap: 10,
          arrows: false,
          focus: "center",
          pagination: false,
          cover: true,
          perPage: 4,
          direction: "ttb",
          height: 600,
          breakpoints: {
            1500: {
              fixedWidth: 100,
              fixedHeight: 112,
            },
            980: {
              fixedWidth: 115,
              fixedHeight: 120,
              direction: "ltr",
            },
          },
        });

        main.sync(thumbnails);
        main.mount();
        thumbnails.mount();
      });
    } else {
      // start
       document.addEventListener("DOMContentLoaded", function () {
    const mainSliderEl = document.getElementById("ew-main-slider");
    const thumbnailSliderEl = document.getElementById("ew-thumbnail-slider");

    let allMedia = []; // Store all media
    let mainSlider, thumbnailSlider;

    function initSliders(media) {
        // Ensure `.splide__list` exists
        mainSliderEl.innerHTML = '<div class="splide__track"><ul class="splide__list"></ul></div>';
        thumbnailSliderEl.innerHTML = '<div class="splide__track"><ul class="splide__list"></ul></div>';

        const mainList = mainSliderEl.querySelector(".splide__list");
        const thumbList = thumbnailSliderEl.querySelector(".splide__list");

        if (media.length === 0) return;

        media.forEach(item => {
            let slide = document.createElement("li");
            slide.classList.add("splide__slide");

            let thumb = document.createElement("li");
            thumb.classList.add("splide__slide");

            if (item.media_type === "video") {
                slide.innerHTML = `
                    <video autoplay loop muted>
                        <source src="${item?.sources[1]?.url ? item.sources[1].url : item.sources[0].url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>`;
                thumb.innerHTML = `<video autoplay loop muted>
                        <source src="${item?.sources[1]?.url ? item.sources[1].url : item.sources[0].url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>`;
            } else {
                slide.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy">`;
                thumb.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy">`;
            }

            mainList.appendChild(slide);
            thumbList.appendChild(thumb);
        });

        // Destroy old sliders if they exist
        if (mainSlider) mainSlider.destroy();
        if (thumbnailSlider) thumbnailSlider.destroy();

        // Initialize Splide sliders
        mainSlider = new Splide("#ew-main-slider", {
            type: "fade",
            pagination: false,
            arrows: false,
            cover: true,
        });

        thumbnailSlider = new Splide("#ew-thumbnail-slider", {
            fixedWidth: 130,
            fixedHeight: 143,
            isNavigation: true,
            wheel: true,
            gap: 10,
            arrows: false,
            focus: "center",
            pagination: false,
            cover: true,
            perPage: 4,
            direction: "ttb",
            height: 600,
            breakpoints: {
                1500: { fixedWidth: 100, fixedHeight: 112 },
                980: { fixedWidth: 115, fixedHeight: 120, direction: "ltr" },
            },
        });

        mainSlider.sync(thumbnailSlider);
        mainSlider.mount();
        thumbnailSlider.mount();
    }

    function filterMediaByColor(color) {
        const filteredMedia = allMedia.filter(item => item.alt == color);
        initSliders(filteredMedia);
    }

    function fetchMedia() {
        const mediaElement = document.querySelector(".ew-product-media");
        if (!mediaElement) {
            console.error("No media data found.");
            return;
        }

        try {
            allMedia = JSON.parse(mediaElement.innerHTML);
            initSliders(allMedia); // Start with no images
        } catch (error) {
            console.error("Error parsing media:", error);
        }
    }

    // Add event listeners to buttons
    document.querySelectorAll('.ew-product-variant-color input').forEach(button => {
        button.addEventListener("click", function () {
            const selectedColor = this.value;
            filterMediaByColor(selectedColor);
        });
    });

    fetchMedia();
});


      // end
    }
  } 
  else {
    new Splide(slider, {
      type: "loop",
      perPage: 3,
      perMove: 1,
      gap: "1rem",
      padding: "5rem",
      autoplay: true,
      interval: 3000,
      arrows: true,
      pagination: true,
      breakpoints: {
        1024: { perPage: 2, padding: "2rem" },
        768: { perPage: 1, padding: "1rem" },
      },
    }).mount();
  }
});

// Header
const hamburger = document.querySelector(".ice-hamburger");
const navLinks = document.querySelector(".ice-nav-links");

hamburger?.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".ice-nav-links a")?.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Quantity Selector
const quantitySelector = document.querySelectorAll(".quantity-selector");

quantitySelector?.forEach((single) => {
  const minusBtn = single.querySelector(".minus");
  const plusBtn = single.querySelector(".plus");
  const quantityValue = single.querySelector(".quantity-value");
  if (quantitySelector) {
    let quantity = parseInt(quantityValue.textContent);
    minusBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
      }
      minusBtn.disabled = quantity <= 1;
    });
    plusBtn.addEventListener("click", () => {
      quantity++;
      quantityValue.textContent = quantity;
      minusBtn.disabled = false;
    });
    minusBtn.disabled = quantity <= 1;
  }
});
