import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDividerModule } from "@angular/material/divider";

import { ContactRoutingModule } from "./contact-routing.module";
import { ContactComponent } from "./contact.component";

// Shared Components
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { NewsletterComponent } from "../../shared/components/newsletter/newsletter.component";

// Contact Page Components
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { ContactInfoComponent } from "./components/contact-info/contact-info.component";
import { LocationMapComponent } from "./components/location-map/location-map.component";
import { FaqSectionComponent } from "./components/faq-section/faq-section.component";

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDividerModule,
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    ContactFormComponent,
    ContactInfoComponent,
    LocationMapComponent,
    FaqSectionComponent,
  ],
})
export class ContactModule { }
