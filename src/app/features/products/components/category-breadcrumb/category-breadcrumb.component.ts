import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-category-breadcrumb",
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: "./category-breadcrumb.component.html",
  styleUrls: ["./category-breadcrumb.component.scss"],
})
export class CategoryBreadcrumbComponent {
  @Input() category: string | null = null;
  @Input() subcategory: string | null = null;

  getCategoryTitle(): string {
    return this.category ? this.toTitleCase(this.category) : "All Products";
  }

  getSubcategoryTitle(): string {
    return this.subcategory ? this.toTitleCase(this.subcategory) : "";
  }

  private toTitleCase(str: string): string {
    return str.replace(/-/g, " ").replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
