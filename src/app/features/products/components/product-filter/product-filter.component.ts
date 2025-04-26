import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSliderModule } from "@angular/material/slider";

@Component({
  selector: "app-product-filter",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
  ],
  templateUrl: "./product-filter.component.html",
  styleUrl: "./product-filter.component.scss",
})
export class ProductFilterComponent {
  @Input() categories: any[] = [];
  @Input() priceRange: { min: number; max: number } = { min: 0, max: 5000 };
  @Input() colors: any[] = [];
  @Input() materials: any[] = [];
  @Input() ratings: any[] = [];
  @Input() features: any[] = [];
  @Input() filterState: any = {};
  @Input() isMobile: boolean = false;

  @Output() filterChanged = new EventEmitter<any>();
  @Output() clearFilters = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  selectedCategories: string[] = [];
  selectedMaterials: string[] = [];
  selectedFeatures: string[] = [];
  selectedColors: string[] = [];
  selectedRating: number = 0;
  selectedPriceRange: { min: number; max: number } = { min: 0, max: 5000 };

  ngOnInit() {
    // Initialize selected values from filter state
    if (this.filterState) {
      this.selectedCategories = this.filterState.categories || [];
      this.selectedMaterials = this.filterState.materials || [];
      this.selectedFeatures = this.filterState.features || [];
      this.selectedColors = this.filterState.colors || [];
      this.selectedRating = this.filterState.rating || 0;
      this.selectedPriceRange = this.filterState.priceRange || {
        ...this.priceRange,
      };
    }
  }

  filterChange() {
    this.emitFilterChanges();
  }

  isColorSelected(color: any): boolean {
    return this.selectedColors.includes(color.value);
  }

  toggleColor(color: any) {
    const index = this.selectedColors.indexOf(color.value);
    if (index === -1) {
      this.selectedColors.push(color.value);
    } else {
      this.selectedColors.splice(index, 1);
    }
    this.emitFilterChanges();
  }

  selectRating(rating: number) {
    this.selectedRating = this.selectedRating === rating ? 0 : rating;
    this.emitFilterChanges();
  }

  emitFilterChanges() {
    this.filterChanged.emit({
      categories: this.selectedCategories,
      priceRange: this.selectedPriceRange,
      colors: this.selectedColors,
      materials: this.selectedMaterials,
      rating: this.selectedRating,
      features: this.selectedFeatures,
    });
  }

  applyFilters() {
    this.emitFilterChanges();
    if (this.isMobile) {
      this.closeFilter();
    }
  }

  closeFilter() {
    this.close.emit();
  }
}
