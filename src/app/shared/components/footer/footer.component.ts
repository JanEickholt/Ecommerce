import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section about">
            <h3 class="footer-heading">ComfortHaven</h3>
            <p>
              Premium quality, comfortable furniture for your home. We believe
              that your living space should be a haven of comfort.
            </p>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="copyright">
            <p>&copy; 2025 ComfortHaven. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  // Minimal implementation
}
