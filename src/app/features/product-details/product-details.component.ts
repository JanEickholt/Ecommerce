import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import {
  ProductService,
  Product,
} from "../../../core/services/product.service";
import { CartService } from "../../../core/services/cart.service";
import { WishlistService } from "../../../core/services/wishlist.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product?: Product;
  relatedProducts: Product[] = [];
  isLoading: boolean = true;
  errorMessage: string = "";

  // Selected options
  selectedImage: string = "";
  selectedColor: string = "";
  selectedMaterial: string = "";
  quantity: number = 1;

  // Reviews
  userRating: number = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
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
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadProduct(id: string): void {
    this.isLoading = true;

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
  }

  addToWishlist(): void {
    if (!this.product) return;
    this.wishlistService.addToWishlist(this.product);
  }

  setRating(rating: number): void {
    this.userRating = rating;
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
}
