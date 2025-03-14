const cartButtons = document.querySelectorAll("[data-add-to-cart]");
if (cartButtons.length > 0) {
  cartButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const variant_id = e.target.dataset.variant;
      e.target.innerHTML = "Adding...";
      await cartAdd(variant_id);
      e.target.innerHTML = "Add To Cart";
    });
  });

}
const cartAdd = async (id, qty = 1) => {
  console.log()
  try {
    const formData = {
      items: [
        {
          id: +id,
          quantity: +qty,
        },
      ],
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, options);
    if (!response.ok) throw new Error("Failed to add item to the cart.");
    console.log("Cart updated successfully");
    window.location.href = '/cart'
  } catch (error) {
    console.error("Error in cartAdd:", error);
  }
};

// Product Page

document.addEventListener("DOMContentLoaded", () => {
  const productInfo = document.querySelectorAll('.ew-product-info')

  productInfo?.forEach((single) => {
    const inputs = single.querySelectorAll("[data-cart-input]");
    const variantSelect = single.querySelector("#ew-variant-ids");
    const submitButton = single.querySelector("[data-product-add-to-cart]");

    // Function to check variant availability
    function checkVariantAvailability() {
      console.log('single==>', single)
      const selectedValues = [...single.querySelectorAll("[data-cart-input]:checked")].map(input => input.value);
      let matchedOption = null;

      // Loop through select options and find a match
      Array.from(variantSelect.options).forEach((option) => {
        const optionValues = Object.values(option.dataset).map(val => val.trim()).filter(Boolean);
        const isMatch = selectedValues.every(val => optionValues.includes(val));

        if (isMatch) {
          matchedOption = option;
          option.selected = true;
          console.log(`Matched Option: ${option.value}`);
        } else {
          option.selected = false;
        }
      });

      // Handle out-of-stock scenario
      if (matchedOption) {
        console.log("Final Selected Variant:", matchedOption.value);
        submitButton.dataset.id = matchedOption.dataset.id;

        if (matchedOption.disabled) {
          submitButton.disabled = true;
          submitButton.textContent = "Out of Stock";
        } else {
          submitButton.disabled = false;
          submitButton.textContent = "Add to Cart";
        }
      } else {
        console.log("No matching variant found!");
        submitButton.disabled = true;
        submitButton.textContent = "Select a Variant";
      }
    }

    // Attach event listeners to inputs
    if (inputs.length > 0) {
      inputs.forEach((input) => {
        input.addEventListener("change", checkVariantAvailability);
      });
    }

    // Run the function on page load
    checkVariantAvailability();
  })
});


const submitButton = document.querySelectorAll('[data-product-add-to-cart]')

submitButton?.forEach((button) => {
  button.addEventListener('click', async (e) => {
    const variant_id = button.dataset.id
    const quantity = button.closest('.ew-product-add-to-cart-block').querySelector('.quantity-value')
    e.target.innerHTML = "Adding...";
    await cartAdd(variant_id, quantity.innerText);
    e.target.innerHTML = "Added";
    setTimeout(() => {
      e.target.innerHTML = "Add To Cart";
    }, 2000)
  })
})


// Shop Tabs

const shopSubmitButton = document.querySelector('[data-featured-add-to-cart]')

if (shopSubmitButton) {
  shopSubmitButton.addEventListener('click', async (e) => {
    const variant_id = shopSubmitButton.dataset.id
    e.target.innerHTML = "Adding...";
    await cartAdd(variant_id, 1);
    e.target.innerHTML = "Added";
    setTimeout(() => {
      e.target.innerHTML = "Add To Cart";
    }, 2000)
  })
}
const updateProductDetails = async (productInput) => {
  if (!productInput) return;

  const url = `${productInput.dataset.url}.json`;
  const index = productInput.dataset.index;

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const { product: fetchedProduct } = data;

    // Update Price 
    const sale_price = document.querySelector('.price-item.price-item--sale.price-item--last')
    const regular_price = document.querySelector('s.price-item.price-item--regular')

    sale_price.innerHTML = `$${fetchedProduct.variants[0].price}`
    regular_price.innerHTML = ` $${fetchedProduct.variants[0].compare_at_price}`

    // Hide all images
    const imagesBox = document.querySelectorAll('.ew-featured-product-image img');
    imagesBox.forEach((img) => img.classList.remove('ew-featured-product-show'));

    // Show the selected image
    const imageBox = document.querySelector(`.ew-featured-product-image img[data-index="${index}"]`);
    if (imageBox) {
      imageBox.classList.add('ew-featured-product-show');
    }

    // Update product title
    const titleBox = document.querySelector('.ew-product-content-title');
    if (titleBox) {
      titleBox.innerHTML = fetchedProduct.title || '';
    }

    // Update submit button with the first variant ID
    const submitButton = document.querySelector('[data-featured-add-to-cart]');
    if (submitButton) {
      submitButton.dataset.id = fetchedProduct.variants[0]?.id || '';
    }

    // Remove existing color variant radios if they exist
    const radiosInner = document.querySelector('.ew-product-content-color-radio');
    if (radiosInner) {
      radiosInner.remove();
    }

    const radiosWrap = document.querySelector('.ew-product-content-color-radios');
    if (radiosWrap) {
      const radiosContainer = document.createElement('div');
      radiosContainer.classList.add('ew-product-content-color-radio');

      fetchedProduct.variants.forEach((variant, index) => {
        const variantLower = variant.title.toLowerCase();

        const radioWrapper = document.createElement('div');
        radioWrapper.classList.add(
          'ew-product-content-color-radio-single',
          `ew-product-content-color-radio-single-${variantLower}`
        );

        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `${variantLower}-${variant.id}`;
        input.setAttribute('data-variant', variant.id);
        input.name = 'color';
        input.value = variant.title;
        if (index === 0) {
          input.checked = true;
        }

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = variant.title;

        // Attach event listener to update the submit button
        input.addEventListener('change', () => {
          if (submitButton) {
            submitButton.dataset.id = variant.id;
          }
        });

        radioWrapper.appendChild(input);
        radioWrapper.appendChild(label);
        radiosContainer.appendChild(radioWrapper);
      });

      radiosWrap.appendChild(radiosContainer);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Attach event listeners on change
const products = document.querySelectorAll('.ew-product-content-radios input');
products.forEach((product) => {
  product.addEventListener('change', () => updateProductDetails(product));
});

// Run function on page load for the first selected product
document.addEventListener("DOMContentLoaded", () => {
  const firstChecked = document.querySelector('.ew-product-content-radios input:checked');
  updateProductDetails(firstChecked);
});
