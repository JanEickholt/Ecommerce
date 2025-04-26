import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-product-sort",
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: "./product-sort.component.html",
  styleUrl: "./product-sort.component.scss",
})
export class ProductSortComponent {
  @Input() sortOption: string = "popular";
  @Output() sortChanged = new EventEmitter<string>();

  onSortChange(event: MatSelectChange): void {
    this.sortChanged.emit(event.value);
  }
}
