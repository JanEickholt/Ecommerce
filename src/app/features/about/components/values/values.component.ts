import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

interface Value {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: "app-values",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./values.component.html",
  styleUrls: ["./values.component.scss"],
})
export class ValuesComponent {
  values: Value[] = [
    {
      icon: "star",
      title: "Quality Craftsmanship",
      description:
        "We believe in creating furniture that lasts. Every piece is crafted with meticulous attention to detail using premium materials and time-tested techniques.",
    },
    {
      icon: "palette",
      title: "Thoughtful Design",
      description:
        "Our designs balance aesthetics with functionality. We create furniture that not only looks beautiful but enhances your everyday living experience.",
    },
    {
      icon: "eco",
      title: "Sustainability",
      description:
        "We re committed to responsible sourcing and production methods that minimize environmental impact while creating furniture that stands the test of time.",
    },
    {
      icon: "people",
      title: "Customer-Centric",
      description:
        "Your satisfaction is our priority. We listen to feedback and continually refine our products and services to exceed your expectations.",
    },
  ];
}
