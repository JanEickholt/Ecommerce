import { Component } from "@angular/core";

import { HeaderComponent } from "../../shared/components/header/header.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { NewsletterComponent } from "../../shared/components/newsletter/newsletter.component";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { ContactInfoComponent } from "./components/contact-info/contact-info.component";
import { LocationMapComponent } from "./components/location-map/location-map.component";
import { FaqSectionComponent } from "./components/faq-section/faq-section.component";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent { }
