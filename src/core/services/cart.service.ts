import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product, ProductOption } from "./product.service";

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
  minOrderValue?: number;
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private appliedCouponSubject = new BehaviorSubject<Coupon | null>(null);
  public appliedCoupon$ = this.appliedCouponSubject.asObservable();

  private availableCoupons: Coupon[] = [
    {
      code: "WELCOME10",
      description: "10% off your first order",
      discountType: "percentage",
      discountValue: 10,
    },
    {
      code: "SAVE20",
      description: "20% off orders over $500",
      discountType: "percentage",
      discountValue: 20,
      minOrderValue: 500,
    },
    {
      code: "FLAT50",
      description: "$50 off orders over $200",
      discountType: "fixed",
      discountValue: 50,
      minOrderValue: 200,
    },
  ];

  constructor() {
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
    this.appliedCouponSubject.next(null);

    localStorage.removeItem("cart");
    localStorage.removeItem("appliedCoupon");
  }

  applyCoupon(code: string): boolean {
    const coupon = this.availableCoupons.find((c) => c.code === code);

    if (!coupon) {
      return false;
    }

    if (
      coupon.minOrderValue &&
      this.calculateSubtotal() < coupon.minOrderValue
    ) {
      return false;
    }

    this.appliedCouponSubject.next(coupon);
    localStorage.setItem("appliedCoupon", JSON.stringify(coupon));
    return true;
  }

  removeCoupon(): void {
    this.appliedCouponSubject.next(null);
    localStorage.removeItem("appliedCoupon");
  }

  calculateSubtotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  calculateDiscount(): number {
    const coupon = this.appliedCouponSubject.value;
    const subtotal = this.calculateSubtotal();

    if (!coupon) {
      return 0;
    }

    if (coupon.discountType === "percentage") {
      return subtotal * (coupon.discountValue / 100);
    } else {
      return coupon.discountValue;
    }
  }

  calculateShipping(): number {
    const subtotal = this.calculateSubtotal();

    if (subtotal >= 999) {
      return 0;
    }

    const baseShipping = 19.99;
    const itemCount = this.cartItemsSubject.value.reduce(
      (count, item) => count + item.quantity,
      0,
    );

    return baseShipping + (itemCount > 1 ? (itemCount - 1) * 5 : 0);
  }

  calculateTax(): number {
    const taxRate = 0.0825;
    return (this.calculateSubtotal() - this.calculateDiscount()) * taxRate;
  }

  calculateTotal(): number {
    return (
      this.calculateSubtotal() -
      this.calculateDiscount() +
      this.calculateShipping() +
      this.calculateTax()
    );
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.value.reduce(
      (count, item) => count + item.quantity,
      0,
    );
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
    localStorage.setItem("cart", JSON.stringify(this.cartItemsSubject.value));
  }
}
