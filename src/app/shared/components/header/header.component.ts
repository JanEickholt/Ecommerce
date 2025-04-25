import { Component, OnInit, HostListener } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;
  wishlistCount: number = 0;
  isMobileMenuOpen: boolean = false;
  isScrolled: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Mock data for the initial view
    this.cartItemCount = 2;
    this.wishlistCount = 3;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    // Mock logout function
    this.isLoggedIn = false;
    this.router.navigate(["/auth/login"]);
  }
}
