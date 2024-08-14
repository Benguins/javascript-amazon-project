export const cart = [];

export function addToCart(productId){
  let matchingItem;
    cart.forEach( (cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    let quantity = document.querySelector(`.js-quantity-selector-${productId}`).value
    quantity = Number(quantity);

    if(matchingItem){
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId,
        quantity
      });
    }
}