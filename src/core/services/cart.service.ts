import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product, ProductOption } from "../models/product";

export interface CartItem {
  product: Product;
  quantity: number;
  options?: ProductOption[];
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        this.cartItemsSubject.next(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage", error);
        this.cartItemsSubject.next([]);
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
    localStorage.removeItem("cart");
  }

  calculateSubtotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  calculateTax(): number {
    const taxRate = 0.0825; // Example tax rate 8.25%
    return this.calculateSubtotal() * taxRate;
  }

  calculateShipping(): number {
    // Free shipping over $999
    const subtotal = this.calculateSubtotal();
    if (subtotal >= 999) {
      return 0;
    }
    return 19.99; // Default shipping cost
  }

  calculateTotal(): number {
    return (
      this.calculateSubtotal() + this.calculateTax() + this.calculateShipping()
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
