import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "./product.service";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private wishlistItemsSubject = new BehaviorSubject<Product[]>([]);
  public wishlistItems$ = this.wishlistItemsSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Load wishlist from localStorage on service initialization
    if (this.isBrowser) {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        try {
          this.wishlistItemsSubject.next(JSON.parse(savedWishlist));
        } catch (error) {
          console.error("Error parsing wishlist from localStorage", error);
          this.wishlistItemsSubject.next([]);
        }
      }
    }
  }

  getWishlistItems(): Product[] {
    return this.wishlistItemsSubject.value;
  }

  addToWishlist(product: Product): void {
    const currentWishlist = this.wishlistItemsSubject.value;

    // Check if product is already in wishlist
    if (!this.isInWishlist(product.id)) {
      this.wishlistItemsSubject.next([...currentWishlist, product]);
      // Save to localStorage
      if (this.isBrowser) {
        localStorage.setItem(
          "wishlist",
          JSON.stringify(this.wishlistItemsSubject.value),
        );
      }
    }
  }

  removeFromWishlist(productId: string): void {
    const updatedWishlist = this.wishlistItemsSubject.value.filter(
      (item) => item.id !== productId,
    );
    this.wishlistItemsSubject.next(updatedWishlist);

    // Save to localStorage
    if (this.isBrowser) {
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  }

  clearWishlist(): void {
    this.wishlistItemsSubject.next([]);
    // Remove from localStorage
    if (this.isBrowser) {
      localStorage.removeItem("wishlist");
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistItemsSubject.value.some(
      (item) => item.id === productId,
    );
  }
}
