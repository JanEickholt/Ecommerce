import { ApplicationConfig } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { ProductService } from "../core/services/product.service";
import { CartService } from "../core/services/cart.service";
import { WishlistService } from "../core/services/wishlist.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideAnimations(),
    provideRouter(routes),
    ProductService,
    CartService,
    WishlistService,
  ],
};
