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
      window.location.href = "/cart";
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
    const response = await fetch(
      `${window.Shopify.routes.root}cart/add.js`,
      options
    );
    if (!response.ok) throw new Error("Failed to add item to the cart.");
    console.log("Cart updated successfully");
  } catch (error) {
    console.error("Error in cartAdd:", error);
  }
};



// Product Page

const inputs = document.querySelectorAll('[data-cart-input]')

if (inputs.length > 0) {
  inputs.forEach((input) => {
    input.addEventListener('change', (e) => {
      const currElem = e.target
      if (currElem.tagName === "INPUT") {
        const submitButton = document.querySelector('[data-product-add-to-cart]')
        submitButton.dataset.id = currElem.dataset.variant
      }
    })
  })
}

const submitButton = document.querySelector('[data-product-add-to-cart]')

if (submitButton) {
  submitButton.addEventListener('click', async (e) => {
    const variant_id = submitButton.dataset.id
    const quantity = document.querySelector('.quantity-value')
    e.target.innerHTML = "Adding...";
    await cartAdd(variant_id, quantity.innerText);
    e.target.innerHTML = "Added";
    setTimeout(() => {
      e.target.innerHTML = "Add To Cart";
    }, 2000)
  })
}