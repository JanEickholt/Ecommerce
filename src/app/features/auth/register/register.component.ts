import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthService } from "../../../../core/services/auth.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isSubmitting = false;
  errorMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Initialize register form
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", Validators.required],
        termsAccepted: [false, [Validators.requiredTrue]],
      },
      { validators: this.passwordsMatchValidator },
    );

    // Redirect to home if already logged in
    if (this.authService.isLoggedIn) {
      this.router.navigate(["/"]);
    }
  }

  // Custom validator to check if passwords match
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    } else {
      // Remove the passwordsMismatch error if it exists
      const errors = confirmPassword?.errors;
      if (errors) {
        delete errors["passwordsMismatch"];
        // If no errors left, set to null
        confirmPassword?.setErrors(Object.keys(errors).length ? errors : null);
      }
      return null;
    }
  }

  onSubmit(): void {
    // Stop if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = "";

    const { confirmPassword, termsAccepted, ...userData } =
      this.registerForm.value;

    this.authService
      .register(userData)
      .pipe(first())
      .subscribe({
        next: () => {
          // Navigate to home page
          this.router.navigate(["/"]);
        },
        error: (error) => {
          this.errorMessage = error.message || "Registration failed";
          this.isSubmitting = false;
        },
      });
  }
}
