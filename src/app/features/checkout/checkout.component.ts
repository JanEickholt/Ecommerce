import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  CartService,
  CartItem,
  Coupon,
} from "../../../core/services/cart.service";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild("stepper") stepper: any;

  // Form groups for each step
  shippingForm!: FormGroup;
  paymentForm!: FormGroup;

  // Cart data
  cartItems: CartItem[] = [];
  appliedCoupon: Coupon | null = null;

  // Order summary values
  subtotal: number = 0;
  discount: number = 0;
  tax: number = 0;

  // Shipping costs
  standardShippingCost: number = 0;
  expressShippingCost: number = 29.99;
  overnightShippingCost: number = 49.99;

  // States for UI
  isSubmitting: boolean = false;
  termsAgreed: boolean = false;

  // Order confirmation data
  orderNumber: string = "";
  orderDate: Date = new Date();
  estimatedDelivery: Date = new Date();

  // Form options
  states = [
    { name: "Alabama", value: "AL" },
    { name: "Alaska", value: "AK" },
    { name: "Arizona", value: "AZ" },
    { name: "Arkansas", value: "AR" },
    { name: "California", value: "CA" },
    { name: "Colorado", value: "CO" },
    { name: "Connecticut", value: "CT" },
    { name: "Delaware", value: "DE" },
    { name: "Florida", value: "FL" },
    { name: "Georgia", value: "GA" },
    { name: "Hawaii", value: "HI" },
    { name: "Idaho", value: "ID" },
    { name: "Illinois", value: "IL" },
    { name: "Indiana", value: "IN" },
    { name: "Iowa", value: "IA" },
    { name: "Kansas", value: "KS" },
    { name: "Kentucky", value: "KY" },
    { name: "Louisiana", value: "LA" },
    { name: "Maine", value: "ME" },
    { name: "Maryland", value: "MD" },
    { name: "Massachusetts", value: "MA" },
    { name: "Michigan", value: "MI" },
    { name: "Minnesota", value: "MN" },
    { name: "Mississippi", value: "MS" },
    { name: "Missouri", value: "MO" },
    { name: "Montana", value: "MT" },
    { name: "Nebraska", value: "NE" },
    { name: "Nevada", value: "NV" },
    { name: "New Hampshire", value: "NH" },
    { name: "New Jersey", value: "NJ" },
    { name: "New Mexico", value: "NM" },
    { name: "New York", value: "NY" },
    { name: "North Carolina", value: "NC" },
    { name: "North Dakota", value: "ND" },
    { name: "Ohio", value: "OH" },
    { name: "Oklahoma", value: "OK" },
    { name: "Oregon", value: "OR" },
    { name: "Pennsylvania", value: "PA" },
    { name: "Rhode Island", value: "RI" },
    { name: "South Carolina", value: "SC" },
    { name: "South Dakota", value: "SD" },
    { name: "Tennessee", value: "TN" },
    { name: "Texas", value: "TX" },
    { name: "Utah", value: "UT" },
    { name: "Vermont", value: "VT" },
    { name: "Virginia", value: "VA" },
    { name: "Washington", value: "WA" },
    { name: "West Virginia", value: "WV" },
    { name: "Wisconsin", value: "WI" },
    { name: "Wyoming", value: "WY" },
  ];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Initialize forms
    this.initForms();

    // Subscribe to cart items
    this.subscriptions.add(
      this.cartService.cartItems$.subscribe((items) => {
        this.cartItems = items;
        this.updateOrderSummary();

        // Redirect to cart if empty
        if (items.length === 0) {
          this.router.navigate(["/cart"]);
        }
      }),
    );

    // Subscribe to applied coupon
    this.subscriptions.add(
      this.cartService.appliedCoupon$.subscribe((coupon) => {
        this.appliedCoupon = coupon;
        this.updateOrderSummary();
      }),
    );

    // Get shipping cost
    this.standardShippingCost = this.cartService.calculateShipping();

    // Check if user is logged in and pre-fill forms
    if (this.authService.isLoggedIn()) {
      const user = this.authService.currentUserValue;
      if (user) {
        this.shippingForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initForms(): void {
    // Shipping form
    this.shippingForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      address1: ["", [Validators.required]],
      address2: [""],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      zipCode: ["", [Validators.required]],
      country: ["US", [Validators.required]],
      shippingMethod: ["standard", [Validators.required]],
    });

    // Payment form
    this.paymentForm = this.formBuilder.group({
      paymentType: [0, [Validators.required]],
      cardNumber: ["", [Validators.required]],
      cardholderName: ["", [Validators.required]],
      expirationDate: ["", [Validators.required]],
      cvv: ["", [Validators.required]],
      sameAsShipping: [true, [Validators.required]],
      billingAddress: [""],
      billingCity: [""],
      billingState: [""],
      billingZipCode: [""],
      billingCountry: ["US"],
    });

    // Add conditional validators for billing address fields
    this.paymentForm
      .get("sameAsShipping")
      ?.valueChanges.subscribe((sameAsShipping) => {
        const billingControls = [
          "billingAddress",
          "billingCity",
          "billingState",
          "billingZipCode",
          "billingCountry",
        ];

        billingControls.forEach((control) => {
          if (!sameAsShipping) {
            this.paymentForm.get(control)?.setValidators([Validators.required]);
          } else {
            this.paymentForm.get(control)?.clearValidators();
            this.paymentForm.get(control)?.updateValueAndValidity();
          }
        });
      });
  }

  updateOrderSummary(): void {
    this.subtotal = this.calculateSubtotal();
    this.discount = this.cartService.calculateDiscount();
    this.tax = this.calculateTax();
  }

  calculateSubtotal(): number {
    return this.cartService.calculateSubtotal();
  }

  calculateTax(): number {
    return this.cartService.calculateTax();
  }

  getStateName(stateCode: string): string {
    const state = this.states.find((s) => s.value === stateCode);
    return state ? state.name : "";
  }

  getCountryName(countryCode: string): string {
    // Simplified for now with only US
    return countryCode === "US" ? "United States" : countryCode;
  }

  getShippingCost(): number {
    const shippingMethod = this.shippingForm.get("shippingMethod")?.value;

    switch (shippingMethod) {
      case "express":
        return this.expressShippingCost;
      case "overnight":
        return this.overnightShippingCost;
      case "standard":
      default:
        return this.standardShippingCost;
    }
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  nextStep(): void {
    if (this.stepper) {
      this.stepper.next();
    }
  }

  prevStep(): void {
    if (this.stepper) {
      this.stepper.previous();
    }
  }

  editStep(index: number): void {
    if (this.stepper) {
      this.stepper.selectedIndex = index;
    }
  }

  onSameAsShippingChange(): void {
    const sameAsShipping = this.paymentForm.get("sameAsShipping")?.value;

    if (sameAsShipping) {
      // Copy shipping address to billing address
      this.paymentForm.patchValue({
        billingAddress: this.shippingForm.get("address1")?.value,
        billingCity: this.shippingForm.get("city")?.value,
        billingState: this.shippingForm.get("state")?.value,
        billingZipCode: this.shippingForm.get("zipCode")?.value,
        billingCountry: this.shippingForm.get("country")?.value,
      });
    }
  }

  openTerms(event: Event): void {
    event.preventDefault();
    // Open terms modal or navigate to terms page
    alert("Terms & Conditions");
  }

  openPrivacy(event: Event): void {
    event.preventDefault();
    // Open privacy modal or navigate to privacy page
    alert("Privacy Policy");
  }

  completeOrder(): void {
    if (!this.termsAgreed) {
      return;
    }

    this.isSubmitting = true;

    // Generate a random order number
    this.orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    // Set order date to today
    this.orderDate = new Date();

    // Calculate estimated delivery date based on shipping method
    const shippingMethod = this.shippingForm.get("shippingMethod")?.value;
    const estDelivery = new Date();

    switch (shippingMethod) {
      case "overnight":
        estDelivery.setDate(estDelivery.getDate() + 1);
        break;
      case "express":
        estDelivery.setDate(estDelivery.getDate() + 3);
        break;
      case "standard":
      default:
        estDelivery.setDate(estDelivery.getDate() + 7);
    }

    this.estimatedDelivery = estDelivery;

    // Simulate API call
    setTimeout(() => {
      if (this.stepper) {
        this.stepper.next();
      }
      this.isSubmitting = false;

      // Clear cart after successful order
      this.cartService.clearCart();
    }, 2000);
  }
}
