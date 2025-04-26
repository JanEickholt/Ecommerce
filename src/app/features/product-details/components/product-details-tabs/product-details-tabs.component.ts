import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Product, ProductReview } from "../../../../core/models/product";

@Component({
  selector: "app-product-details-tabs",
  templateUrl: "./product-details-tabs.component.html",
  styleUrls: ["./product-details-tabs.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ProductDetailsTabsComponent implements OnInit {
  @Input() product!: Product;
  @Input() activeTabIndex: number = 0;
  @Output() activeTabIndexChange = new EventEmitter<number>();
  @Output() reviewsTabChange = new EventEmitter<number>();
  @Output() reviewSubmitted = new EventEmitter<ProductReview>();

  showReviewForm: boolean = false;
  userRating: number = 0;
  reviewTitle: string = "";
  reviewContent: string = "";

  ngOnInit(): void {
    // Initialize component
  }

  onTabChange(index: number): void {
    this.activeTabIndex = index;
    this.activeTabIndexChange.emit(index);
    this.reviewsTabChange.emit(index);
  }

  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm;
    if (!this.showReviewForm) {
      // Reset form when closing
      this.userRating = 0;
      this.reviewTitle = "";
      this.reviewContent = "";
    }
  }

  setRating(rating: number): void {
    this.userRating = rating;
  }

  submitReview(): void {
    if (this.userRating === 0 || !this.reviewTitle || !this.reviewContent) {
      return;
    }

    const newReview: ProductReview = {
      id: `review-${Date.now()}`,
      name: "Current User", // In a real app, get the user's name
      rating: this.userRating,
      date: new Date().toISOString().split("T")[0],
      title: this.reviewTitle,
      content: this.reviewContent,
      helpfulCount: 0,
    };

    this.reviewSubmitted.emit(newReview);

    // Reset the form
    this.toggleReviewForm();
  }

  calculateRatingPercentage(rating: number): number {
    if (!this.product.reviews || this.product.reviews.length === 0) {
      return 0;
    }

    const ratingCount = this.getRatingCount(rating);
    return (ratingCount / this.product.reviews.length) * 100;
  }

  getRatingCount(rating: number): number {
    if (!this.product.reviews) return 0;
    return this.product.reviews.filter(
      (review) => Math.floor(review.rating) === rating,
    ).length;
  }

  markReviewHelpful(review: ProductReview): void {
    review.helpfulCount += 1;
  }
}
