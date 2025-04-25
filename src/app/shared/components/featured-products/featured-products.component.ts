import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-featured-products",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="featured-products-section section-padding">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Collection</h2>
          <p class="section-subtitle">
            Discover our handpicked selection of premium comfort furniture
          </p>
        </div>
        <div class="section-footer">
          <a routerLink="/products" class="neumorph-button view-all-btn">
            View All Collection
          </a>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./featured-products.component.scss"],
})
export class FeaturedProductsComponent {
  // Minimal implementation
}
