import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { Subscription } from "rxjs";

import {
  ProductService,
  Product,
} from "../../../core/services/product.service";
import { ProductCardComponent } from "../product-card/product-card.component";

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

  private subscriptions: Subscription = new Subscription();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Load featured products
    this.subscriptions.add(
      this.productService.getFeaturedProducts().subscribe((products) => {
        this.featuredProducts = products;
        this.isLoading = false;
      }),
    );

    // Load new arrivals
    this.subscriptions.add(
      this.productService.getNewArrivals().subscribe((products) => {
        this.newArrivals = products;
      }),
    );

    // Load best sellers
    this.subscriptions.add(
      this.productService.getBestSellers().subscribe((products) => {
        this.bestSellers = products;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onTabChange(index: number): void {
    this.activeTab = index;
  }

  openQuickView(product: Product): void {
    // This would typically open a dialog to show a quick view of the product
    console.log("Quick view", product);
  }
}
