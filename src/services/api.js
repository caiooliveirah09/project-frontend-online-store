const CART_PRODUCTS_KEY = 'cart_products';

const getProductsFromCart = () => JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY));

const saveProductsToCart = (cart) => localStorage
  .setItem(CART_PRODUCTS_KEY, JSON.stringify(cart));

export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}

export async function getProductsFromCategory(categoryId) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}

export async function getProductsFromQuery(query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}

export default async function getProductFromId(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}

export async function addProductsToCart(productId) {
  if (productId) {
    const cartProducts = getProductsFromCart();
    saveProductsToCart([...cartProducts, productId]);
  }
}
