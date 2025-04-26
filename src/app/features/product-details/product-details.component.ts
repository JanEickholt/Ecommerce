import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  ProductService,
  Product,
  ProductReview,
} from "../../../core/services/product.service";
import { CartService } from "../../../core/services/cart.service";
import { WishlistService } from "../../../core/services/wishlist.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("reviewsTab") reviewsTab?: ElementRef;

  // Product data
  product?: Product;
  relatedProducts: Product[] = [];

  // UI state
  isLoading: boolean = true;
  errorMessage: string = "";
  activeTabIndex: number = 0;
  showReviewForm: boolean = false;

  // Selected options
  selectedImage: string = "";
  selectedColor: string = "";
  selectedMaterial: string = "";
  quantity: number = 1;

  // Review form
  userRating: number = 0;
  reviewTitle: string = "";
  reviewContent: string = "";

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => {
        const id = params.get("id");
        if (id) {
          this.loadProduct(id);
        } else {
          this.errorMessage = "Product ID not found";
          this.isLoading = false;
        }
      }),
    );

    // Check if there's a hash fragment for reviews
    if (this.route.snapshot.fragment === "reviews") {
      this.activeTabIndex = 2; // Set the reviews tab as active
    }
  }

  ngAfterViewInit(): void {
    // If the URL had a #reviews fragment, scroll to the reviews section
    if (this.route.snapshot.fragment === "reviews" && this.reviewsTab) {
      setTimeout(() => {
        this.reviewsTab?.nativeElement.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadProduct(id: string): void {
    this.isLoading = true;
    this.errorMessage = "";

    this.subscriptions.add(
      this.productService.getProduct(id).subscribe({
        next: (product) => {
          if (product) {
            this.product = product;

            // Set default selected options
            if (product.images && product.images.length > 0) {
              this.selectedImage = product.images[0];
            } else if (product.imageUrl) {
              this.selectedImage = product.imageUrl;
            }

            if (product.colors && product.colors.length > 0) {
              this.selectedColor = product.colors[0].name;
            }

            if (product.materials && product.materials.length > 0) {
              this.selectedMaterial = product.materials[0];
            }

            // Load related products
            this.loadRelatedProducts(id);
          } else {
            this.errorMessage = "Product not found";
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = "Error loading product: " + error.message;
          this.isLoading = false;
        },
      }),
    );
  }

  loadRelatedProducts(productId: string): void {
    this.subscriptions.add(
      this.productService
        .getRelatedProducts(productId)
        .subscribe((products) => {
          this.relatedProducts = products;
        }),
    );
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  increaseQuantity(): void {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.product) return;

    const options = [];

    if (this.selectedColor) {
      options.push({ name: "Color", value: this.selectedColor });
    }

    if (this.selectedMaterial) {
      options.push({ name: "Material", value: this.selectedMaterial });
    }

    this.cartService.addToCart({
      product: this.product,
      quantity: this.quantity,
      options: options,
    });

    this.snackBar
      .open(`${this.product.name} added to cart`, "View Cart", {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: "success-snackbar",
      })
      .onAction()
      .subscribe(() => {
        this.router.navigate(["/cart"]);
      });
  }

  addToWishlist(): void {
    if (!this.product) return;

    const isAlreadyInWishlist = this.isInWishlist();

    if (isAlreadyInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id);
      this.snackBar.open(
        `${this.product.name} removed from wishlist`,
        "Close",
        {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
        },
      );
    } else {
      this.wishlistService.addToWishlist(this.product);
      this.snackBar
        .open(`${this.product.name} added to wishlist`, "View Wishlist", {
          duration: 3000,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: "success-snackbar",
        })
        .onAction()
        .subscribe(() => {
          this.router.navigate(["/wishlist"]);
        });
    }
  }

  isInWishlist(): boolean {
    if (!this.product) return false;
    return this.wishlistService.isInWishlist(this.product.id);
  }

  setRating(rating: number): void {
    this.userRating = rating;
  }

  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm;
    if (!this.showReviewForm) {
      // Reset form when hiding
      this.userRating = 0;
      this.reviewTitle = "";
      this.reviewContent = "";
    }
  }

  submitReview(): void {
    if (
      !this.product ||
      !this.userRating ||
      !this.reviewTitle ||
      !this.reviewContent
    ) {
      return;
    }

    // Create new review
    const newReview: ProductReview = {
      id: Date.now().toString(), // Generate a unique ID
      name: "You", // In a real app, this would be the user's name
      rating: this.userRating,
      date: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
      title: this.reviewTitle,
      content: this.reviewContent,
      helpfulCount: 0,
    };

    // In a real app, you would send this to the server
    // For now, just add it to the product's reviews array
    if (!this.product.reviews) {
      this.product.reviews = [];
    }
    this.product.reviews.unshift(newReview);

    // Update the rating and review count
    if (this.product.reviews.length > 0) {
      const totalRating = this.product.reviews.reduce(
        (sum, review) => sum + review.rating,
        0,
      );
      this.product.rating = totalRating / this.product.reviews.length;
      this.product.reviewCount = this.product.reviews.length;
    }

    // Hide the form and reset the fields
    this.toggleReviewForm();

    // Show a success message
    this.snackBar.open("Your review has been submitted. Thank you!", "Close", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: "success-snackbar",
    });
  }

  markReviewHelpful(review: ProductReview): void {
    // In a real app, you would send this to the server
    // For now, just increment the helpful count
    review.helpfulCount++;

    this.snackBar.open("You marked this review as helpful", "Close", {
      duration: 2000,
      horizontalPosition: "end",
      verticalPosition: "bottom",
    });
  }

  calculateRatingPercentage(stars: number): number {
    if (
      !this.product ||
      !this.product.reviews ||
      this.product.reviews.length === 0
    ) {
      return 0;
    }

    const starsCount = this.product.reviews.filter(
      (review) => Math.floor(review.rating) === stars,
    ).length;

    return (starsCount / this.product.reviews.length) * 100;
  }

  getRatingCount(stars: number): number {
    if (!this.product || !this.product.reviews) {
      return 0;
    }

    return this.product.reviews.filter(
      (review) => Math.floor(review.rating) === stars,
    ).length;
  }

  onTabChange(index: number): void {
    this.activeTabIndex = index;
  }

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

  scrollToReviews(): void {
    this.activeTabIndex = 2; // Set to reviews tab

    setTimeout(() => {
      // Scroll to the reviews section
      document
        .getElementById("reviews-tab")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  quickView(product: Product): void {
    // Load the product details page for the selected product
    this.router.navigate(["/product", product.id]);
  }
}
