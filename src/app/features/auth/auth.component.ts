import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.scss",
})
export class AuthComponent {
  // This is a wrapper component for auth routes
  // The router outlet will render the child routes (login, register, forgot-password)
}
