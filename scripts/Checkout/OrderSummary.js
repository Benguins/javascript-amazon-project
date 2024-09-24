import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOptions, calculateDeliveryDate} from '../../data/deliveroptions.js';
import {renderPaymentSummary} from './PaymentSummary.js';
import {isWeekend as isSatSun} from '../utils/DateFunctions.js';
import {renderCheckoutHeader} from '../Checkout/CheckoutHeader.js';


export function renderOrderSummary(){
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
  
    const matchingProduct = getProduct(productId);
  
    const deliveryOptionId = cartItem.deliveryOptionId;
  
    const deliveryOption = getDeliveryOptions(deliveryOptionId);

    const dataString = calculateDeliveryDate(deliveryOption);
  
    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dataString}
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
  
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${productId}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${productId}">
              <span class="save-quantity-link link-primary js-save-quantity" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
  
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });
  
  function deliveryOptionsHTML(matchingProduct, cartItem){
  
    let html = '';
  
    deliveryOptions.forEach((deliveryOption) => {
  
    const dataString = calculateDeliveryDate(deliveryOption);
    
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `${formatCurrency(deliveryOption.priceCents)} -`;
  
    const IsChecked = deliveryOption.id === cartItem.deliveryOptionId
  
    html += `
    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" ${IsChecked ? 'checked' : ''}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dataString}
          </div>
          <div class="delivery-option-price">
          $${priceString} - Shipping
        </div>
      </div>
    </div>
    `
    });
    return html;
  }
  
  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;
  
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderOrderSummary();
        renderCheckoutHeader();
        renderPaymentSummary();
      });
    });
  
    document.querySelectorAll('.js-update-link').forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
      });
    });
  
    document.querySelectorAll('.js-save-quantity').forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        let quantityInput = document.querySelector(`.js-quantity-input-${productId}`).value;
        quantityInput = Number(quantityInput);
        updateQuantity(productId, quantityInput);
        container.classList.remove('is-editing-quantity');
        renderPaymentSummary();
      });
    });
  
    renderCheckoutHeader();
  
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

// console.log(isSatSun(dayjs()));




