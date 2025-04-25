import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductService } from "../core/services/product.service";
import { CartService } from "../core/services/cart.service";
import { WishlistService } from "../core/services/wishlist.service";

@NgModule({
  imports: [CommonModule],
  providers: [ProductService, CartService, WishlistService],
})
export class CoreModule { }
