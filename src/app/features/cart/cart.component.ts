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

  applyCoupon(): void {
    if (!this.couponCode) return;

    const success = this.cartService.applyCoupon(this.couponCode);
    if (!success) {
      alert("Invalid coupon code or minimum order amount not met.");
    }
  }

  removeCoupon(): void {
    this.cartService.removeCoupon();
    this.couponCode = "";
  }
}
