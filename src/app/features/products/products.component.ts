import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Subscription } from "rxjs";

import { ProductService } from "../../../core/services/product.service";
import { Product } from "../../core/models/product";
import { ProductGridComponent } from "./components/product-grid/product-grid.component";
import { ProductSortComponent } from "./components/product-sort/product-sort.component";
import { CategoryBreadcrumbComponent } from "./components/category-breadcrumb/category-breadcrumb.component";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ProductGridComponent, // Make sure this is imported
    ProductSortComponent,
    CategoryBreadcrumbComponent,
  ],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  totalProducts: number = 0;
  isLoading: boolean = true;
  isMobile: boolean = false;
  pageSize: number = 12;
  pageIndex: number = 0;
  viewMode: "grid" | "list" = "grid";
  selectedCategory: string | null = null;
  selectedSubcategory: string | null = null;
  private isBrowser: boolean;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.checkScreenSize();
    }
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 992;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe((params) => {
        if (params["category"]) {
          this.selectedCategory = params["category"];
        } else {
          this.selectedCategory = null;
        }

        if (params["subcategory"]) {
          this.selectedSubcategory = params["subcategory"];
        } else {
          this.selectedSubcategory = null;
        }

        if (params["page"]) {
          this.pageIndex = parseInt(params["page"]) - 1;
        } else {
          this.pageIndex = 0;
        }

        if (params["pageSize"]) {
          this.pageSize = parseInt(params["pageSize"]);
        }

        if (
          params["viewMode"] &&
          (params["viewMode"] === "grid" || params["viewMode"] === "list")
        ) {
          this.viewMode = params["viewMode"] as "grid" | "list";
        }

        this.loadProducts();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadProducts(): void {
    this.isLoading = true;

    this.subscriptions.add(
      this.productService.getProducts().subscribe((products) => {
        this.totalProducts = products.length;

        const startIndex = this.pageIndex * this.pageSize;
        this.products = products.slice(startIndex, startIndex + this.pageSize);

        this.isLoading = false;
      }),
    );
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.updateQueryParams({
      page: this.pageIndex + 1,
      pageSize: this.pageSize,
    });

    this.loadProducts();
  }

  setViewMode(mode: "grid" | "list"): void {
    this.viewMode = mode;

    this.updateQueryParams({
      viewMode: mode,
    });
  }

  clearFilters(): void {
    this.pageIndex = 0;

    this.updateQueryParams(
      {
        page: 1,
        viewMode: this.viewMode,
      },
      true,
    );
  }

  addToCart(product: Product): void {
    console.log("Add to cart:", product);
  }

  addToWishlist(product: Product): void {
    console.log("Add to wishlist:", product);
  }

  quickView(product: Product): void {
    console.log("Quick view:", product);
  }

  addToCompare(product: Product): void {
    console.log("Add to compare:", product);
  }

  private updateQueryParams(params: any, replace: boolean = false): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: replace
        ? params
        : { ...this.route.snapshot.queryParams, ...params },
      queryParamsHandling: replace ? "" : "merge",
    });
  }
}
