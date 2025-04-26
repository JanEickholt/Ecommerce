import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  wishlistCount = 0;
  cartItemCount = 0;
}
