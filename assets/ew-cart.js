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
const cartAdd = async (id) => {
  try {
    const formData = {
      items: [
        {
          id: +id,
          quantity: 1,
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