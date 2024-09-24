class Cart {
  cartItems; // Public
  #localStorageKey; // Private

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage(); // Private method
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  }
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }
  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItem.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
  
    this.cartItem = newCart;
  
    this.saveToStorage();
  }
  calculateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItem.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  }
  updateQuantity(productId, newQuantity){
    let matchingItem;
   
    this.cartItem.forEach((entry) => {
      if(entry.productId === productId){
        matchingItem = entry
      }
    });
    if(matchingItem){
      matchingItem.quantity += newQuantity;
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = matchingItem.quantity;
      document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} Items`;
    } 
    this.saveToStorage();
  }
  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
  
    this.cartItem.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }

}

const cart = new Cart('cart-oop');
const buisnessCart = new Cart('cart-buinsess');

console.log(cart);
console.log(buisnessCart);











