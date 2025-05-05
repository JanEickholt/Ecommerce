import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Product } from "../../../../core/models/product";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ProductListComponent } from "../product-list/product-list.component";

@Component({
  selector: "app-product-grid",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ProductListComponent,
  ],
  templateUrl: "./product-grid.component.html",
  styleUrls: ["./product-grid.component.scss"],
})
export class ProductGridComponent {
  // Inputs needed based on the error messages
  @Input() products: Product[] = [];
  @Input() totalProducts: number = 0;
  @Input() isLoading: boolean = false;
  @Input() viewMode: "grid" | "list" = "grid";
  @Input() pageSize: number = 12;

  // Outputs needed based on the error messages
  @Output() viewModeChanged = new EventEmitter<"grid" | "list">();
  @Output() pageChanged = new EventEmitter<any>();
  @Output() productAdded = new EventEmitter<Product>();
  @Output() productWishlisted = new EventEmitter<Product>();
  @Output() productQuickViewed = new EventEmitter<Product>();
  @Output() productCompared = new EventEmitter<Product>();
  @Output() clearAllFilters = new EventEmitter<void>();

  onViewModeChange(mode: "grid" | "list"): void {
    this.viewModeChanged.emit(mode);
  }

  onPageChange(event: any): void {
    this.pageChanged.emit(event);
  }

  addToCart(product: Product): void {
    this.productAdded.emit(product);
  }

  addToWishlist(product: Product): void {
    this.productWishlisted.emit(product);
  }

  quickView(product: Product): void {
    this.productQuickViewed.emit(product);
  }

  addToCompare(product: Product): void {
    this.productCompared.emit(product);
  }

  clearFilters(): void {
    this.clearAllFilters.emit();
  }
}
