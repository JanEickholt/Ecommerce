import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";
import { MatIconModule } from "@angular/material/icon";

import { ProductFilterState } from "../../products.component";

@Component({
  selector: "app-product-filters",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatIconModule,
  ],
  templateUrl: "./product-filters.component.html",
  styleUrls: ["./product-filters.component.scss"],
})
export class ProductFiltersComponent {
  @Input() filterState: ProductFilterState = {
    categories: [],
    priceRange: { min: 0, max: 5000 },
    colors: [],
    materials: [],
    rating: 0,
    features: [],
    sortBy: "popular",
  };

  @Input() filterOptions: {
    categories: any[];
    priceRange: { min: number; max: number };
    colors: any[];
    materials: any[];
    ratings: any[];
    features: any[];
  } = {
      categories: [],
      priceRange: { min: 0, max: 5000 },
      colors: [],
      materials: [],
      ratings: [],
      features: [],
    };

  @Output() filterChange = new EventEmitter<ProductFilterState>();

  // Local state to track filter changes
  selectedCategories: string[] = [];
  selectedColors: string[] = [];
  selectedMaterials: string[] = [];
  selectedFeatures: string[] = [];
  selectedRating: number = 0;
  selectedPriceRange: { min: number; max: number } = { min: 0, max: 5000 };

  ngOnInit() {
    // Initialize from input filters
    this.selectedCategories = [...this.filterState.categories];
    this.selectedColors = [...this.filterState.colors];
    this.selectedMaterials = [...this.filterState.materials];
    this.selectedFeatures = [...this.filterState.features];
    this.selectedRating = this.filterState.rating;
    this.selectedPriceRange = { ...this.filterState.priceRange };
  }

  ngOnChanges() {
    // Update when filters change externally
    this.selectedCategories = [...this.filterState.categories];
    this.selectedColors = [...this.filterState.colors];
    this.selectedMaterials = [...this.filterState.materials];
    this.selectedFeatures = [...this.filterState.features];
    this.selectedRating = this.filterState.rating;
    this.selectedPriceRange = { ...this.filterState.priceRange };
  }

  updateFilters() {
    this.filterChange.emit({
      ...this.filterState,
      categories: this.selectedCategories,
      colors: this.selectedColors,
      materials: this.selectedMaterials,
      features: this.selectedFeatures,
      rating: this.selectedRating,
      priceRange: this.selectedPriceRange,
    });
  }

  toggleCategory(category: string, event: any) {
    if (event.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (c) => c !== category,
      );
    }
    this.updateFilters();
  }

  toggleColor(color: string) {
    const index = this.selectedColors.indexOf(color);
    if (index === -1) {
      this.selectedColors.push(color);
    } else {
      this.selectedColors.splice(index, 1);
    }
    this.updateFilters();
  }

  toggleMaterial(material: string, event: any) {
    if (event.checked) {
      this.selectedMaterials.push(material);
    } else {
      this.selectedMaterials = this.selectedMaterials.filter(
        (m) => m !== material,
      );
    }
    this.updateFilters();
  }

  toggleFeature(feature: string, event: any) {
    if (event.checked) {
      this.selectedFeatures.push(feature);
    } else {
      this.selectedFeatures = this.selectedFeatures.filter(
        (f) => f !== feature,
      );
    }
    this.updateFilters();
  }

  setRating(rating: number) {
    this.selectedRating = this.selectedRating === rating ? 0 : rating;
    this.updateFilters();
  }

  updatePriceRange(event: any) {
    if (event && event.value !== undefined) {
      this.selectedPriceRange = event.value;
      this.updateFilters();
    }
  }

  isColorSelected(color: string): boolean {
    return this.selectedColors.includes(color);
  }
}
