import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-testimonials",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="testimonials-section section-padding">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">What Our Customers Say</h2>
          <p class="section-subtitle">
            Hear from our satisfied customers about their ComfortHaven
            experience
          </p>
        </div>
        <!-- Simplified testimonial section -->
        <div class="testimonial-cta">
          <h3>Experience the ComfortHaven Difference</h3>
          <div class="cta-buttons">
            <a routerLink="/products" class="neumorph-button primary"
              >Shop Now</a
            >
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./testimonials.component.scss"],
})
export class TestimonialsComponent {
  // Minimal implementation
}
