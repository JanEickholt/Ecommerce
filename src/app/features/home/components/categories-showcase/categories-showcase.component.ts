import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-categories-showcase",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="categories-showcase-section section-padding">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Browse By Category</h2>
          <p class="section-subtitle">
            Find the perfect comfort piece to match your style and needs
          </p>
        </div>
        <div class="categories-grid">
          <!-- Simplified categories grid -->
          <div class="category-card neumorph-card">
            <div class="category-content">
              <h3 class="category-title">Sofas & Couches</h3>
              <a routerLink="/products" class="category-link">
                Browse Collection
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./categories-showcase.component.scss"],
})
export class CategoriesShowcaseComponent {
  // Minimal implementation
}
