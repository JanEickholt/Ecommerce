import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { WishlistService } from "../../../core/services/wishlist.service";
import { CartService } from "../../../core/services/cart.service";
import { Product } from "../../../core/services/product.service";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrl: "./wishlist.component.scss",
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistItems: Product[] = [];
  isLoading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.wishlistService.wishlistItems$.subscribe((items) => {
        this.wishlistItems = items;
        this.isLoading = false;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({
      product,
      quantity: 1,
    });
    // Optionally remove from wishlist after adding to cart
    // this.wishlistService.removeFromWishlist(product.id);
  }

  clearWishlist(): void {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      this.wishlistService.clearWishlist();
    }
  }
}
