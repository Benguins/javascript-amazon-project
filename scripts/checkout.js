import {renderOrderSummary} from './Checkout/OrderSummary.js';
import {renderPaymentSummary} from './Checkout/PaymentSummary.js';
import { loadproducts } from '../data/products.js';
// import '../data/backend-practise.js';
// import '../data/Cart-OOP.js';
// import '../data/Cart-Class.js';

loadproducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
