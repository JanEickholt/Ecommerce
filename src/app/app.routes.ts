import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./features/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "products",
    loadChildren: () =>
      import("./features/products/products.module").then(
        (m) => m.ProductsModule,
      ),
  },
  {
    path: "product/:id",
    loadChildren: () =>
      import("./features/product-details/product-details.module").then(
        (m) => m.ProductDetailsModule,
      ),
  },
  {
    path: "cart",
    loadChildren: () =>
      import("./features/cart/cart.module").then((m) => m.CartModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./features/orders/orders.module").then((m) => m.OrdersModule),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./features/not-found/not-found.module").then(
        (m) => m.NotFoundModule,
      ),
  },
];
