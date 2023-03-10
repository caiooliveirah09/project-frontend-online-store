const CART_PRODUCTS_KEY = 'cart_products';

if (!JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY))) {
  localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify([]));
}

export const getProductsFromCart = () => (
  JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY)));

export const saveProductsToCart = (cart) => {
  cart.forEach(({ quantity }, index) => {
    if (quantity === 0) cart.splice(index, 1);
  });
  (localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify(cart)));
};

const findProductPosition = (productId) => {
  const storage = getProductsFromCart();
  const product = storage.find(({ id }) => id === productId);
  return storage.indexOf(product);
};

const checkProductQuantity = (productId) => {
  const SINGLE_PRODUCT = 1;
  const storage = getProductsFromCart();
  if (storage.some(({ id }) => id === productId)) {
    const productPosition = findProductPosition(productId);
    const { quantity } = storage[productPosition];
    return quantity + 1;
  }
  return SINGLE_PRODUCT;
};

const updateProductQuantity = (productId, newQuantity) => {
  const storage = getProductsFromCart();
  const productPosition = findProductPosition(productId);
  storage[productPosition] = {
    ...storage[productPosition],
    quantity: newQuantity,
  };
  return storage;
};

export function addProductsToCart({
  id,
  title,
  thumbnail,
  price,
  available_quantity: inStock,
}) {
  const cartProducts = getProductsFromCart();
  const productQuantity = checkProductQuantity(id);
  const newProduct = {
    id,
    inStock,
    title,
    thumbnail,
    price,
    quantity: productQuantity,
  };
  if (productQuantity === 1) {
    saveProductsToCart([...cartProducts, newProduct]);
    return;
  }
  const updatedCart = updateProductQuantity(id, productQuantity);
  saveProductsToCart(updatedCart);
}
export const readAssessments = () => (
  JSON.parse(localStorage.getItem('assessments_products')));

export const saveLocalStorage = (assessments) => {
  const ASSESSMENTS_KEY = 'assessments_products';
  if (!JSON.parse(localStorage.getItem(ASSESSMENTS_KEY))) {
    localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify([]));
  }
  localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(assessments));
};

export const addAssessments = (assessment) => {
  const ASSESSMENTS_KEY = 'assessments_products';
  if (!JSON.parse(localStorage.getItem(ASSESSMENTS_KEY))) {
    localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify([]));
  }
  if (assessment) {
    const assessments = readAssessments();
    saveLocalStorage([...assessments, assessment]);
  }
};
