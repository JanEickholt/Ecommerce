import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="site-header">
      <div class="toolbar">
        <div class="container header-container">
          <div class="logo-container">
            <a routerLink="/">
              <h1 class="logo">Comfort<span class="highlight">Haven</span></h1>
            </a>
          </div>
          <div class="header-actions">
            <button class="user-button">👤</button>
            <button routerLink="/cart">🛒</button>
          </div>
        </div>
      </div>
    </header>
  `,
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  // Minimal implementation
}
