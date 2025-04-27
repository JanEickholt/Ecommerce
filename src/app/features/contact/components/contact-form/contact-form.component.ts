import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;

  inquiryTypes = [
    { value: "product", label: "Product Inquiry" },
    { value: "order", label: "Order Status" },
    { value: "support", label: "Customer Support" },
    { value: "feedback", label: "Feedback" },
    { value: "other", label: "Other" },
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: [""],
      inquiryType: ["product", Validators.required],
      subject: ["", Validators.required],
      message: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.snackBar.open(
        "Thank you for your message! We will get back to you shortly.",
        "Close",
        {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "top",
          panelClass: "success-snackbar",
        },
      );
      this.contactForm.reset({
        inquiryType: "product",
      });
    }, 1500);
  }
}
