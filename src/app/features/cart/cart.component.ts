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
  styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  isLoading: boolean = true;

  // Coupon code
  couponCode = new FormControl("");
  appliedCoupon: Coupon | null = null;

  // Order summary values
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
    // Subscribe to cart items
    this.subscriptions.add(
      this.cartService.cartItems$.subscribe((items) => {
        this.cartItems = items;
        this.updateOrderSummary();
        this.isLoading = false;
      }),
    );

    // Subscribe to applied coupon
    this.subscriptions.add(
      this.cartService.appliedCoupon$.subscribe((coupon) => {
        this.appliedCoupon = coupon;
        this.updateOrderSummary();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateOrderSummary(): void {
    this.subtotal = this.calculateSubtotal();
    this.discount = this.cartService.calculateDiscount();
    this.shipping = this.cartService.calculateShipping();
    this.tax = this.cartService.calculateTax();
  }

  calculateSubtotal(): number {
    return this.cartService.calculateSubtotal();
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  increaseQuantity(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity < 10) {
      this.cartService.updateQuantity(index, item.quantity + 1);
    }
  }

  decreaseQuantity(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity > 1) {
      this.cartService.updateQuantity(index, item.quantity - 1);
    }
  }

  updateQuantity(index: number): void {
    const item = this.cartItems[index];

    // Ensure quantity is within bounds
    let quantity = item.quantity;
    if (quantity < 1) quantity = 1;
    if (quantity > 10) quantity = 10;

    this.cartService.updateQuantity(index, quantity);
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
  }

  clearCart(): void {
    if (confirm("Are you sure you want to remove all items from your cart?")) {
      this.cartService.clearCart();
    }
  }

  moveToWishlist(index: number): void {
    const item = this.cartItems[index];
    this.wishlistService.addToWishlist(item.product);
    this.cartService.removeItem(index);
  }

  applyCoupon(): void {
    const code = this.couponCode.value;
    if (!code) return;

    const success = this.cartService.applyCoupon(code);
    if (!success) {
      alert("Invalid coupon code or minimum order amount not met.");
    }
  }

  removeCoupon(): void {
    this.cartService.removeCoupon();
    this.couponCode.setValue("");
  }
}
