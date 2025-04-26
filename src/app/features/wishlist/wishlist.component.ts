import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { WishlistService } from "../../../core/services/wishlist.service";
import { CartService } from "../../../core/services/cart.service";
import { Product } from "../../../core/services/product.service";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";

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
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.wishlistItems = [
        {
          id: "1",
          name: "Example Product",
          price: 199.99,
          category: "Example Category",
          inStock: true,
          rating: 4.5,
          reviewCount: 10,
        },
      ];
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  removeFromWishlist(productId: string): void {
    this.wishlistItems = this.wishlistItems.filter(
      (item) => item.id !== productId,
    );
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({
      product,
      quantity: 1,
    });
  }

  clearWishlist(): void {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      this.wishlistItems = [];
    }
  }
}
