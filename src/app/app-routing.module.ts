import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) }, { path: 'products', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) }, { path: 'product/:id', loadChildren: () => import('./features/product-details/product-details.module').then(m => m.ProductDetailsModule) }, { path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule) }, { path: 'checkout', loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule) }, { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) }, { path: 'contact', loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule) }, { path: 'about', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule) }, { path: 'profile', loadChildren: () => import('./features/user-profile/user-profile.module').then(m => m.UserProfileModule) }, { path: 'wishlist', loadChildren: () => import('./features/wishlist/wishlist.module').then(m => m.WishlistModule) }, { path: 'orders', loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule) }, { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) }, { path: '**', loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
