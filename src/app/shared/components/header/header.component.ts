import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatBadgeModule } from "@angular/material/badge";
import { MatMenuModule } from "@angular/material/menu";
import { AuthService } from "../../../core/services/auth.service";
import { CartService } from "../../../core/services/cart.service";
import { WishlistService } from "../../../core/services/wishlist.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;
  wishlistCount: number = 0;
  isMobileMenuOpen: boolean = false;
  isScrolled: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Subscribe to auth state
    this.subscriptions.add(
      this.authService.currentUser$.subscribe((user) => {
        this.isLoggedIn = !!user;
      }),
    );

    // Subscribe to cart items
    this.subscriptions.add(
      this.cartService.cartItems$.subscribe((items) => {
        this.cartItemCount = this.cartService.getCartItemCount();
      }),
    );

    // Subscribe to wishlist items
    this.subscriptions.add(
      this.wishlistService.wishlistItems$.subscribe((items) => {
        this.wishlistCount = items.length;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
  }
}
