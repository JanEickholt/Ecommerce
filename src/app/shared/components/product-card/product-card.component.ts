import { Component, Input, Output, EventEmitter } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Product } from "src/core/services/product.service";
import { CartService } from "src/core/services/cart.service";
import { WishlistService } from "src/core/services/wishlist.service";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() quickViewClicked = new EventEmitter<Product>();

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
  ) { }

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.cartService.addToCart({
      product: this.product,
      quantity: 1,
    });
  }

  addToWishlist(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.wishlistService.addToWishlist(this.product);
  }

  quickView(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.quickViewClicked.emit(this.product);
  }

  isInWishlist(): boolean {
    return this.wishlistService.isInWishlist(this.product.id);
  }
}
