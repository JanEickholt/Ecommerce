import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { ProductFilterState } from "../../products.component";

@Component({
  selector: "app-active-filters",
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule, MatButtonModule],
  templateUrl: "./active-filters.component.html",
  styleUrls: ["./active-filters.component.scss"],
})
export class ActiveFiltersComponent {
  @Input() filterState!: ProductFilterState;
  @Input() categories: any[] = [];
  @Input() colors: any[] = [];
  @Input() materials: any[] = [];
  @Input() features: any[] = [];

  @Output() removeFilter = new EventEmitter<{ type: string; value: string }>();
  @Output() clearAllFilters = new EventEmitter<void>();

  getCategoryLabel(value: string): string {
    const category = this.categories.find((c) => c.value === value);
    return category ? category.label : value;
  }

  getColorLabel(value: string): string {
    const color = this.colors.find((c) => c.value === value);
    return color ? color.name : value;
  }

  getColorCode(value: string): string {
    const color = this.colors.find((c) => c.value === value);
    return color ? color.code : "#cccccc";
  }

  getMaterialLabel(value: string): string {
    const material = this.materials.find((m) => m.value === value);
    return material ? material.label : value;
  }

  getFeatureLabel(value: string): string {
    const feature = this.features.find((f) => f.value === value);
    return feature ? feature.label : value;
  }

  onRemoveFilter(type: string, value: string): void {
    this.removeFilter.emit({ type, value });
  }

  onClearAll(): void {
    this.clearAllFilters.emit();
  }

  formatPriceRange(): string {
    const { min, max } = this.filterState.priceRange;
    return `$${min} - $${max}`;
  }

  isPriceRangeModified(): boolean {
    return (
      this.filterState.priceRange.min > 0 ||
      this.filterState.priceRange.max < 5000
    );
  }
}
