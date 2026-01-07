import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'produit',
    loadComponent: () => import('./produit/produit.component').then(m => m.ProduitComponent)
  },
  {
    path: 'store',
    loadComponent: () => import('./store/store.component').then(m => m.StoreComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'your-order',
    loadComponent: () => import('./your-order/your-order.component').then(m => m.YourOrderComponent)
  },

  {
    path: 'order-details',
    loadComponent: () => import('./order-details/order-details.component').then(m => m.OrderDetailsComponent)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./edit-profile/edit-profile.component').then(m => m.EditProfileComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'edit-address/:id',
    loadComponent: () => import('./addresses/edit-address.component').then(m => m.EditAddressComponent)
  },
  {
    path: 'addresses',
    loadComponent: () => import('./addresses/addresses.component').then(m => m.AddressesComponent)
  },
  {
    path: 'order-confirm',
    loadComponent: () => import('./order-confirm/order-confirm.component').then(m => m.OrderConfirmComponent)
  },
  {
    path: 'add-card',
    loadComponent: () => import('./add-card/add-card.component').then(m => m.AddCardComponent)
  },
  {
    path: 'coupons',
    loadComponent: () => import('./coupons/coupons.component').then(m => m.CouponsComponent)
  },
  {
    path: 'enable-location',
    loadComponent: () => import('./enable-location/enable-location.component').then(m => m.EnableLocationComponent)
  },
  {
    path: 'notification-settings',
    loadComponent: () => import('./notification-settings/notification-settings.component').then(m => m.NotificationSettingsComponent)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent)
  },
  {
    path: 'offers',
    loadComponent: () => import('./offers/offers.component').then(m => m.OffersComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'support',
    loadComponent: () => import('./support/support.component').then(m => m.SupportComponent)
  },
  {
    path: 'wallet',
    loadComponent: () => import('./wallet/wallet.component').then(m => m.WalletComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'add-address',
    loadComponent: () => import('./add-address/add-address.component').then(m => m.AddAddressComponent)
  }

  ,{
    path: 'payment',
    loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent)
  }
];
