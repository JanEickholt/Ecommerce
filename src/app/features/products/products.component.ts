import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
  PLATFORM_ID,
  Inject,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  ProductService,
  Product,
  ProductFilterState,
} from "../../../core/services/product.service";
import { MatDrawer } from "@angular/material/sidenav";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild("filterDrawer") filterDrawer!: MatDrawer;

  products: Product[] = [];
  totalProducts: number = 0;
  isLoading: boolean = true;
  isMobile: boolean = false;
  private isBrowser: boolean;
  pageSize: number = 12;
  pageIndex: number = 0;
  categories: any[] = [];
  priceRange: { min: number; max: number } = { min: 0, max: 5000 };
  colors: any[] = [];
  materials: any[] = [];
  ratings: any[] = [
    { value: 5, count: 0 },
    { value: 4, count: 0 },
    { value: 3, count: 0 },
    { value: 2, count: 0 },
    { value: 1, count: 0 },
  ];
  features: any[] = [
    { label: "Featured", value: "featured", count: 0 },
    { label: "New Arrivals", value: "new", count: 0 },
    { label: "Best Sellers", value: "bestseller", count: 0 },
    { label: "In Stock", value: "inStock", count: 0 },
  ];

  filterState: ProductFilterState = {
    categories: [],
    priceRange: { min: 0, max: 5000 },
    colors: [],
    materials: [],
    rating: 0,
    features: [],
    sortBy: "popular",
  };

  private subscriptions: Subscription = new Subscription();

  viewMode: "grid" | "list" = "grid";

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

  @HostListener("window:resize")
  onResize() {
    if (this.isBrowser) {
      this.checkScreenSize();
    }
  }

  checkScreenSize(): void {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth < 992;
    }
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe((params) => {
        const filterState: Partial<ProductFilterState> = {};

        if (params["category"]) {
          filterState.categories = Array.isArray(params["category"])
            ? params["category"]
            : [params["category"]];
        }

        if (params["minPrice"] && params["maxPrice"]) {
          filterState.priceRange = {
            min: parseInt(params["minPrice"]),
            max: parseInt(params["maxPrice"]),
          };
        }

        if (params["color"]) {
          filterState.colors = Array.isArray(params["color"])
            ? params["color"]
            : [params["color"]];
        }

        if (params["material"]) {
          filterState.materials = Array.isArray(params["material"])
            ? params["material"]
            : [params["material"]];
        }

        if (params["rating"]) {
          filterState.rating = parseInt(params["rating"]);
        }

        if (params["feature"]) {
          filterState.features = Array.isArray(params["feature"])
            ? params["feature"]
            : [params["feature"]];
        }

        if (params["sortBy"]) {
          filterState.sortBy = params["sortBy"];
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
          this.viewMode = params["viewMode"];
        }

        this.productService.updateFilterState(filterState);
        this.filterState = this.productService.getFilterState();

        this.loadProducts();
      }),
    );

    this.subscriptions.add(
      this.productService.categories$.subscribe((categories) => {
        this.categories = categories;
      }),
    );

    this.subscriptions.add(
      this.productService.colors$.subscribe((colors) => {
        this.colors = colors;
      }),
    );

    this.subscriptions.add(
      this.productService.materials$.subscribe((materials) => {
        this.materials = materials;
      }),
    );

    this.subscriptions.add(
      this.productService.priceRange$.subscribe((priceRange) => {
        this.priceRange = priceRange;
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

  applyFilters(filters: Partial<ProductFilterState>): void {
    this.pageIndex = 0;

    const queryParams: any = {
      page: 1,
    };

    if (filters.categories && filters.categories.length > 0) {
      queryParams.category = filters.categories;
    }

    if (filters.priceRange) {
      queryParams.minPrice = filters.priceRange.min;
      queryParams.maxPrice = filters.priceRange.max;
    }

    if (filters.colors && filters.colors.length > 0) {
      queryParams.color = filters.colors;
    }

    if (filters.materials && filters.materials.length > 0) {
      queryParams.material = filters.materials;
    }

    if (filters.rating) {
      queryParams.rating = filters.rating;
    }

    if (filters.features && filters.features.length > 0) {
      queryParams.feature = filters.features;
    }

    if (filters.sortBy) {
      queryParams.sortBy = filters.sortBy;
    }

    if (this.isMobile && this.filterDrawer) {
      this.filterDrawer.close();
    }

    this.updateQueryParams(queryParams);
  }

  sortProducts(sortOption: string): void {
    this.applyFilters({ sortBy: sortOption });
  }

  clearFilters(): void {
    this.productService.resetFilters();

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
