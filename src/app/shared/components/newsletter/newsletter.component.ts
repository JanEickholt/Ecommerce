import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-newsletter",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-wrapper neumorph-card">
          <div class="newsletter-content">
            <h2 class="newsletter-title">Subscribe to Our Newsletter</h2>
            <p class="newsletter-text">
              Stay updated with our latest products, exclusive offers and
              interior design tips.
            </p>
            <div class="newsletter-form">
              <input
                type="email"
                placeholder="Your Email Address"
                class="neumorph-input"
              />
              <button class="neumorph-button primary">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./newsletter.component.scss"],
})
export class NewsletterComponent {
  // Minimal implementation
}
