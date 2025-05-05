import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import {
  CartService,
  CartItem,
  Coupon,
} from "../../../core/services/cart.service";
import { WishlistService } from "../../../core/services/wishlist.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  isLoading: boolean = true;

  couponCode: string = "";
  appliedCoupon: Coupon | null = null;

  subtotal: number = 0;
  discount: number = 0;
  shipping: number = 0;
  tax: number = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.cartItems$.subscribe((items) => {
        this.cartItems = items;
        this.updateOrderSummary();
        this.isLoading = false;
      }),
    );

    // Subscribe to applied coupon
    this.subscriptions.add(
      this.cartService.appliedCoupon$.subscribe((coupon: Coupon | null) => {
        this.appliedCoupon = coupon;
        this.updateOrderSummary();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // Method to update order summary values
  updateOrderSummary(): void {
    this.subtotal = this.calculateSubtotal();
    this.discount = this.cartService.calculateDiscount();
    this.shipping = this.cartService.calculateShipping();
    this.tax = this.cartService.calculateTax();
  }

  // Methods missing from the component that are used in the template
  clearCart(): void {
    this.cartService.clearCart();
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartService.updateQuantity(
        index,
        this.cartItems[index].quantity - 1,
      );
    }
  }

  increaseQuantity(index: number): void {
    if (this.cartItems[index].quantity < 10) {
      this.cartService.updateQuantity(
        index,
        this.cartItems[index].quantity + 1,
      );
    }
  }

  updateQuantity(index: number): void {
    // Ensure quantity is between 1 and 10
    const quantity = Math.max(1, Math.min(10, this.cartItems[index].quantity));
    this.cartService.updateQuantity(index, quantity);
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
  }

  moveToWishlist(index: number): void {
    const item = this.cartItems[index];
    this.wishlistService.addToWishlist(item.product);
    this.cartService.removeItem(index);
  }

  calculateSubtotal(): number {
    return this.cartService.calculateSubtotal();
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  applyCoupon(): void {
    if (!this.couponCode) return;

    const success = this.cartService.applyCoupon(this.couponCode);
    if (!success) {
      alert("Invalid coupon code or minimum order amount not met.");
    }
    this.couponCode = ""; // Clear the input field after applying
  }

  removeCoupon(): void {
    this.cartService.removeCoupon();
    this.couponCode = "";
  }
}
