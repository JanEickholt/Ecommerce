import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";

@Component({
  selector: "app-filter-sidebar",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSliderModule,
  ],
  templateUrl: "./filter-sidebar.component.html",
  styleUrls: ["./filter-sidebar.component.scss"],
})
export class FilterSidebarComponent {
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

  clearAllFilters(): void {
    this.clearFilters.emit();
  }

  closeFilter(): void {
    this.close.emit();
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

  toggleMaterial(value: string, event: any) {
    if (event.checked) {
      this.selectedMaterials.push(value);
    } else {
      const index = this.selectedMaterials.indexOf(value);
      if (index !== -1) {
        this.selectedMaterials.splice(index, 1);
      }
    }
    this.emitFilterChanges();
  }

  toggleFeature(value: string, event: any) {
    if (event.checked) {
      this.selectedFeatures.push(value);
    } else {
      const index = this.selectedFeatures.indexOf(value);
      if (index !== -1) {
        this.selectedFeatures.splice(index, 1);
      }
    }
    this.emitFilterChanges();
  }

  selectRating(rating: number) {
    this.selectedRating = this.selectedRating === rating ? 0 : rating;
    this.emitFilterChanges();
  }

  updatePriceRange(event: any) {
    // Update price range
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
}
