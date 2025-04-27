import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

interface HistoryEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: "app-company-history",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./company-history.component.html",
  styleUrls: ["./company-history.component.scss"],
})
export class CompanyHistoryComponent implements OnInit {
  historyEvents: HistoryEvent[] = [
    {
      year: "2010",
      title: "The Beginning",
      description:
        "ComfortHaven starts as a small workshop in Emma Johnson's garage, crafting custom furniture pieces for local clients.",
      icon: "home",
    },
    {
      year: "2012",
      title: "First Retail Location",
      description:
        "After growing demand, we opened our first showroom in New York City, showcasing our handcrafted furniture collection.",
      icon: "storefront",
    },
    {
      year: "2015",
      title: "Expanding the Collection",
      description:
        'Introduced our signature "Cloud Nine" seating line, which quickly became our bestselling collection.',
      icon: "weekend",
    },
    {
      year: "2017",
      title: "National Recognition",
      description:
        'Won "Best Furniture Design" at the National Home & Decor Awards, putting ComfortHaven on the map nationally.',
      icon: "emoji_events",
    },
    {
      year: "2019",
      title: "Coastal Expansion",
      description:
        "Opened new showrooms in Los Angeles and Chicago, bringing our comfortable, stylish furniture to more homes across the country.",
      icon: "location_city",
    },
    {
      year: "2021",
      title: "Sustainability Commitment",
      description:
        'Launched our eco-friendly "Green Haven" collection, made entirely from sustainable and recycled materials.',
      icon: "eco",
    },
    {
      year: "2023",
      title: "Direct-to-Consumer Platform",
      description:
        "Launched our ecommerce platform, making our premium furniture available nationwide with an enhanced digital shopping experience.",
      icon: "shopping_cart",
    },
    {
      year: "2025",
      title: "Looking Forward",
      description:
        "Continuing to innovate with smart furniture technology and expanding internationally with our commitment to comfort and sustainability.",
      icon: "visibility",
    },
  ];

  ngOnInit(): void {
    // Any initialization code if needed
  }
}
