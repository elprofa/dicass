
/*
Template Name: Dailycart - Multipurpose eCommerce Food & Grocery Delivery Mobile Template
Author: Askbootstrap
Author URI: https://themeforest.net/user/askbootstrap
Version: 0.1
*/

/*
- Password visibility toggle for Login form
- Password visibility toggle for Signup form 
- Tap to Copy Coupon Code 
- Swipe to Delete for Cart Items
 */

// Password visibility toggle for Login form
const toggleLoginPassword = document.querySelector('#password-toggle-icon-login');
const loginPassword = document.querySelector('#loginPassword');
if (toggleLoginPassword) {
  toggleLoginPassword.addEventListener('click', function (e) {
    const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPassword.setAttribute('type', type);
    this.querySelector('i').classList.toggle('bi-eye');
    this.querySelector('i').classList.toggle('bi-eye-slash');
  });
}

// Password visibility toggle for Signup form
const toggleSignupPassword = document.querySelector('#password-toggle-icon-signup');
const signupPassword = document.querySelector('#signupPassword');
if (toggleSignupPassword) {
  toggleSignupPassword.addEventListener('click', function (e) {
    const type = signupPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    signupPassword.setAttribute('type', type);
    this.querySelector('i').classList.toggle('bi-eye');
    this.querySelector('i').classList.toggle('bi-eye-slash');
  });
}

// Tap to Copy Coupon Code
document.addEventListener('DOMContentLoaded', function () {
  const couponButtons = document.querySelectorAll('.coupon-code-btn');

  couponButtons.forEach(button => {
    // Only add click listener to non-expired coupons
    if (!button.closest('.coupon-ticket.expired')) {
      button.addEventListener('click', function () {
        const couponCode = this.dataset.coupon;
        navigator.clipboard.writeText(couponCode).then(() => {
          // Provide feedback to the user
          const originalText = this.querySelector('small').innerText;
          this.querySelector('small').innerText = 'Copied!';

          setTimeout(() => {
            this.querySelector('small').innerText = originalText;
          }, 2000); // Revert back after 2 seconds
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      });
    }
  });
});

// Swipe to Delete for Cart Items
document.addEventListener('DOMContentLoaded', function () {
  const cartItems = document.querySelectorAll('.cart-item');

  cartItems.forEach(item => {
    let startX = 0;
    let dist = 0;
    const threshold = 50; // Minimum swipe distance

    item.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      // Remove swiped class from all other items
      cartItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('swiped');
        }
      });
    });

    item.addEventListener('touchmove', function (e) {
      dist = e.touches[0].clientX - startX;
    });

    item.addEventListener('touchend', function (e) {
      // If swiped left enough
      if (dist < -threshold) {
        item.classList.add('swiped');
      }
      // If swiped right enough (to close)
      else if (dist > threshold) {
        item.classList.remove('swiped');
      }
      dist = 0; // Reset distance
    });
  });
});