import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { Subscription } from "rxjs";

import {
  ProductService,
  Product,
} from "../../../../core/services/product.service";
import { ProductCardComponent } from "../product-card/product-card.component";
import { inject } from "@angular/core";

@Component({
  selector: "app-featured-products",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    ProductCardComponent,
  ],
  templateUrl: "./featured-products.component.html",
  styleUrls: ["./featured-products.component.scss"],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  newArrivals: Product[] = [];
  bestSellers: Product[] = [];
  isLoading: boolean = true;
  activeTab: number = 0;
  isBrowser: boolean;

  private subscriptions: Subscription = new Subscription();
  private productService: ProductService = inject(ProductService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Set empty arrays first to avoid hydration mismatch
    this.featuredProducts = [];
    this.newArrivals = [];
    this.bestSellers = [];

    // Only fetch data client-side to avoid hydration issues
    if (this.isBrowser) {
      // Use setTimeout to ensure hydration completes first
      setTimeout(() => {
        this.loadProducts();
      }, 0);
    } else {
      // For server-side, just set loading to false after a brief delay
      setTimeout(() => {
        this.isLoading = false;
      }, 0);
    }
  }

  // Extract loading logic to a separate method
  private loadProducts(): void {
    this.isLoading = true;

    this.subscriptions.add(
      this.productService
        .getFeaturedProducts()
        .subscribe((products: Product[]) => {
          // Make sure we have valid images for all products
          this.featuredProducts = products.map((product) => ({
            ...product,
            imageUrl: product.imageUrl || "/api/placeholder/300/300",
          }));
          this.isLoading = false;
        }),
    );

    this.subscriptions.add(
      this.productService.getNewArrivals().subscribe((products: Product[]) => {
        // Make sure we have valid images for all products
        this.newArrivals = products.map((product) => ({
          ...product,
          imageUrl: product.imageUrl || "/api/placeholder/300/300",
        }));
      }),
    );

    this.subscriptions.add(
      this.productService.getBestSellers().subscribe((products: Product[]) => {
        // Make sure we have valid images for all products
        this.bestSellers = products.map((product) => ({
          ...product,
          imageUrl: product.imageUrl || "/api/placeholder/300/300",
        }));
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onTabChange(index: number): void {
    this.activeTab = index;

    // Trigger a re-render of the current tab's content when switching tabs
    if (this.isBrowser) {
      switch (index) {
        case 0:
          this.featuredProducts = [...this.featuredProducts];
          break;
        case 1:
          this.newArrivals = [...this.newArrivals];
          break;
        case 2:
          this.bestSellers = [...this.bestSellers];
          break;
      }
    }
  }

  openQuickView(product: Product): void {
    console.log("Quick view", product);
  }
}
