import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-product-grid",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  templateUrl: "./product-grid.component.html",
  styleUrl: "./product-grid.component.scss",
})
export class ProductGridComponent {
  @Input() products: any[] = [];
  @Input() totalProducts: number = 0;
  @Input() isLoading: boolean = false;
  @Input() viewMode: "grid" | "list" = "grid";
  @Input() pageSize: number = 12;

  @Output() viewModeChanged = new EventEmitter<"grid" | "list">();
  @Output() pageChanged = new EventEmitter<any>();
  @Output() productAdded = new EventEmitter<any>();
  @Output() productWishlisted = new EventEmitter<any>();
  @Output() productQuickViewed = new EventEmitter<any>();
  @Output() productCompared = new EventEmitter<any>();
  @Output() clearAllFilters = new EventEmitter<void>();

  sortOption: string = "popular";

  setViewMode(mode: "grid" | "list"): void {
    this.viewMode = mode;
    this.viewModeChanged.emit(mode);
  }

  onPageChange(event: any): void {
    this.pageChanged.emit(event);
  }

  addToCart(product: any): void {
    this.productAdded.emit(product);
  }

  addToWishlist(product: any): void {
    this.productWishlisted.emit(product);
  }

  quickView(product: any): void {
    this.productQuickViewed.emit(product);
  }

  addToCompare(product: any): void {
    this.productCompared.emit(product);
  }

  clearFilters(): void {
    this.clearAllFilters.emit();
  }

  sortProducts(): void {
    // Emit sort change through parent component
  }
}
