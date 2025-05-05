import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject, Observable } from "rxjs";
import { Product, ProductOption } from "../../app/core/models/product";

export interface CartItem {
  product: Product;
  quantity: number;
  options?: ProductOption[];
}

export interface Coupon {
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrderValue?: number;
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private appliedCouponSubject = new BehaviorSubject<Coupon | null>(null);
  public appliedCoupon$ = this.appliedCouponSubject.asObservable();

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          this.cartItemsSubject.next(JSON.parse(savedCart));
        } catch (error) {
          console.error("Error parsing cart from localStorage", error);
          this.cartItemsSubject.next([]);
        }
      }

      const savedCoupon = localStorage.getItem("appliedCoupon");
      if (savedCoupon) {
        try {
          this.appliedCouponSubject.next(JSON.parse(savedCoupon));
        } catch (error) {
          console.error("Error parsing coupon from localStorage", error);
          this.appliedCouponSubject.next(null);
        }
      }
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: CartItem): void {
    const currentCart = this.cartItemsSubject.value;

    const existingItemIndex = currentCart.findIndex(
      (cartItem) =>
        cartItem.product.id === item.product.id &&
        this.optionsMatch(cartItem.options, item.options),
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex].quantity += item.quantity;

      this.cartItemsSubject.next(updatedCart);
    } else {
      this.cartItemsSubject.next([...currentCart, item]);
    }

    this.saveCartToLocalStorage();
  }

  updateQuantity(index: number, quantity: number): void {
    const updatedCart = [...this.cartItemsSubject.value];

    if (index >= 0 && index < updatedCart.length) {
      updatedCart[index].quantity = quantity;
      this.cartItemsSubject.next(updatedCart);

      this.saveCartToLocalStorage();
    }
  }

  removeItem(index: number): void {
    const updatedCart = this.cartItemsSubject.value.filter(
      (_, i) => i !== index,
    );
    this.cartItemsSubject.next(updatedCart);

    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    if (this.isBrowser) {
      localStorage.removeItem("cart");
    }
  }

  calculateSubtotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  calculateDiscount(): number {
    const coupon = this.appliedCouponSubject.value;
    if (!coupon) return 0;

    const subtotal = this.calculateSubtotal();

    if (coupon.discountType === "percentage") {
      return subtotal * (coupon.discountValue / 100);
    } else {
      return coupon.discountValue;
    }
  }

  calculateTax(): number {
    const taxRate = 0.0825;
    return this.calculateSubtotal() * taxRate;
  }

  calculateShipping(): number {
    const subtotal = this.calculateSubtotal();
    if (subtotal >= 999) {
      return 0;
    }
    return 19.99;
  }

  calculateTotal(): number {
    return (
      this.calculateSubtotal() -
      this.calculateDiscount() +
      this.calculateTax() +
      this.calculateShipping()
    );
  }

  applyCoupon(code: string): boolean {
    const availableCoupons: Coupon[] = [
      {
        code: "WELCOME10",
        description: "10% off your first order",
        discountType: "percentage",
        discountValue: 10,
        minimumOrderValue: 50,
      },
      {
        code: "SAVE20",
        description: "20% off all furniture",
        discountType: "percentage",
        discountValue: 20,
        minimumOrderValue: 100,
      },
      {
        code: "FREESHIP",
        description: "Free shipping on your order",
        discountType: "fixed",
        discountValue: 19.99,
      },
    ];

    const coupon = availableCoupons.find((c) => c.code === code);

    if (!coupon) return false;

    if (
      coupon.minimumOrderValue &&
      this.calculateSubtotal() < coupon.minimumOrderValue
    ) {
      return false;
    }

    this.appliedCouponSubject.next(coupon);
    if (this.isBrowser) {
      localStorage.setItem("appliedCoupon", JSON.stringify(coupon));
    }
    return true;
  }

  removeCoupon(): void {
    this.appliedCouponSubject.next(null);
    if (this.isBrowser) {
      localStorage.removeItem("appliedCoupon");
    }
  }

  private optionsMatch(
    options1?: ProductOption[],
    options2?: ProductOption[],
  ): boolean {
    if (!options1 && !options2) return true;
    if (!options1 || !options2) return false;
    if (options1.length !== options2.length) return false;

    const sortedOptions1 = [...options1].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const sortedOptions2 = [...options2].sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    return sortedOptions1.every(
      (option, index) =>
        option.name === sortedOptions2[index].name &&
        option.value === sortedOptions2[index].value,
    );
  }

  private saveCartToLocalStorage(): void {
    if (this.isBrowser) {
      localStorage.setItem("cart", JSON.stringify(this.cartItemsSubject.value));
    }
  }
}
