import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: "app-contact-info",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDividerModule],
  templateUrl: "./contact-info.component.html",
  styleUrls: ["./contact-info.component.scss"],
})
export class ContactInfoComponent {
  contactInfo = [
    {
      title: "Customer Service",
      phone: "(800) 123-4567",
      email: "support@comforthaven.com",
      hours: "Mon-Fri: 9am-6pm EST",
    },
    {
      title: "Corporate Office",
      address: "123 Comfort Street, New York, NY 10001",
      phone: "(212) 555-6789",
      email: "info@comforthaven.com",
    },
    {
      title: "Sales Department",
      phone: "(800) 987-6543",
      email: "sales@comforthaven.com",
      hours: "Mon-Sat: 9am-8pm EST",
    },
  ];

  socialLinks = [
    { name: "Facebook", icon: "facebook", url: "https://facebook.com/" },
    { name: "Instagram", icon: "photo_camera", url: "https://instagram.com/" },
    { name: "Twitter", icon: "flutter_dash", url: "https://twitter.com/" },
    { name: "Pinterest", icon: "pin_drop", url: "https://pinterest.com/" },
    { name: "YouTube", icon: "smart_display", url: "https://youtube.com/" },
  ];
}
