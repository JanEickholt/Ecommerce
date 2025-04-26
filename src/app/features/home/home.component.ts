import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "../../../core/services/product.service";
import { Product } from "../../../core/models/product";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  newArrivals: Product[] = [];
  bestSellers: Product[] = [];
  isLoading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Load featured products
    this.subscriptions.add(
      this.productService
        .getFeaturedProducts()
        .subscribe((products: Product[]) => {
          this.featuredProducts = products;
          this.isLoading = false;
        }),
    );

    // Load new arrivals
    this.subscriptions.add(
      this.productService.getNewArrivals().subscribe((products: Product[]) => {
        this.newArrivals = products;
      }),
    );

    // Load best sellers
    this.subscriptions.add(
      this.productService.getBestSellers().subscribe((products: Product[]) => {
        this.bestSellers = products;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
