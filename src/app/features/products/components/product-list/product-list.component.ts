import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { Product } from "../../../../core/models/product";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Input() isLoading: boolean = false;
  @Input() viewMode: "grid" | "list" = "grid";
  @Input() emptyMessage: string = "No products found.";

  @Output() productAdded = new EventEmitter<Product>();
  @Output() productWishlisted = new EventEmitter<Product>();
  @Output() productQuickViewed = new EventEmitter<Product>();
  @Output() productCompared = new EventEmitter<Product>();
  @Output() clearFilters = new EventEmitter<void>();

  trackById(index: number, product: Product): string {
    return product.id;
  }

  addToCart(event: Event, product: Product): void {
    event.preventDefault();
    event.stopPropagation();
    this.productAdded.emit(product);
  }

  addToWishlist(event: Event, product: Product): void {
    event.preventDefault();
    event.stopPropagation();
    this.productWishlisted.emit(product);
  }

  quickView(event: Event, product: Product): void {
    event.preventDefault();
    event.stopPropagation();
    this.productQuickViewed.emit(product);
  }

  addToCompare(event: Event, product: Product): void {
    event.preventDefault();
    event.stopPropagation();
    this.productCompared.emit(product);
  }

  onClearFilters(): void {
    this.clearFilters.emit();
  }
}
