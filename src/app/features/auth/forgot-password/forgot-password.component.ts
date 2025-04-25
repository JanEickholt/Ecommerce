import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthService } from "../../../../core/services/auth.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  errorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Initialize forgot password form
    this.forgotPasswordForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    // Stop if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = "";

    this.authService
      .forgotPassword(this.forgotPasswordForm.value.email)
      .pipe(first())
      .subscribe({
        next: () => {
          this.isSubmitted = true;
          this.isSubmitting = false;
        },
        error: (error) => {
          this.errorMessage = error.message || "Request failed";
          this.isSubmitting = false;
        },
      });
  }
}
