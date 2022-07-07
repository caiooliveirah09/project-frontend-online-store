export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';
  const fullUrl = url.concat(categoryId, query);

  return fetch(fullUrl)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));
}
