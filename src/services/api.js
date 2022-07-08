const CART_PRODUCTS_KEY = 'cart_products';

if (!JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY))) {
  localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify([]));
}

export function getProductsFromCart() {
  return JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY));
}

export function saveProductsToCart(cart) {
  localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify(cart));
}

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

export default async function getProductsFromId(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}

export function addProductsToCart(productId) {
  if (productId) {
    const cartProducts = getProductsFromCart();
    saveProductsToCart([...cartProducts, productId]);
  }
}
