import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  views: number;
  helpfulCount: number;
  notHelpfulCount: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: "app-faq-section",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: "./faq-section.component.html",
  styleUrl: "./faq-section.component.scss",
})
export class FaqSectionComponent implements OnInit {
  // FAQ Categories
  categories: Category[] = [
    { id: "all", name: "All FAQs", icon: "help" },
    { id: "products", name: "Products", icon: "weekend" },
    { id: "orders", name: "Orders & Shipping", icon: "local_shipping" },
    { id: "returns", name: "Returns & Refunds", icon: "assignment_return" },
    { id: "care", name: "Product Care", icon: "cleaning_services" },
    { id: "warranty", name: "Warranty", icon: "verified" },
  ];

  // FAQs data
  faqs: FAQ[] = [
    {
      id: 1,
      question: "What materials are used in your furniture?",
      answer:
        "At ComfortHaven, we use a variety of high-quality materials including sustainably sourced hardwoods (oak, walnut, maple), premium upholstery fabrics, top-grain leather, and high-density foams for cushioning. All our materials are carefully selected for durability, comfort, and environmental responsibility. You can find specific material information on each product page.",
      category: "products",
      views: 0,
      helpfulCount: 15,
      notHelpfulCount: 2,
    },
    {
      id: 2,
      question: "How long will it take to receive my order?",
      answer:
        "Delivery times vary based on product availability and your location. In-stock items typically ship within 3-5 business days and arrive within 7-10 business days. Custom orders may take 6-8 weeks to manufacture before shipping. Once your order ships, you'll receive a tracking number and estimated delivery date. For more specific information, please check the product page or contact our customer service team.",
      category: "orders",
      views: 0,
      helpfulCount: 23,
      notHelpfulCount: 1,
    },
    {
      id: 3,
      question: "What is your return policy?",
      answer:
        'We offer a 30-day return policy on most items. Products must be in original condition and packaging. Custom orders are non-returnable unless there\'s a manufacturing defect. To initiate a return, please contact our customer service team with your order number. Return shipping fees may apply except in cases of damaged or defective items. For full details, please visit our <a href="/returns">Returns & Refunds</a> page.',
      category: "returns",
      views: 0,
      helpfulCount: 32,
      notHelpfulCount: 3,
    },
    {
      id: 4,
      question: "How should I clean and maintain my furniture?",
      answer:
        'The best cleaning methods depend on the materials of your furniture. For general maintenance, we recommend regular dusting with a soft cloth and immediate cleaning of spills. For wooden furniture, use a mild furniture polish and avoid direct sunlight exposure. Fabric upholstery should be vacuumed regularly and professionally cleaned once a year. Leather furniture should be conditioned every 6-12 months. Each product comes with specific care instructions, and you can find detailed guides on our <a href="/care">Product Care</a> page.',
      category: "care",
      views: 0,
      helpfulCount: 19,
      notHelpfulCount: 0,
    },
    {
      id: 5,
      question: "What warranty do you offer on your furniture?",
      answer:
        "All ComfortHaven furniture comes with a 3-year limited warranty against manufacturing defects in materials and workmanship under normal household use. This covers structural issues, frame defects, and premature deterioration of materials. The warranty doesn't cover normal wear and tear, damage from improper use, or changes in appearance due to aging. Extended warranty options are available at checkout. For warranty claims, please contact our customer service with your order number and detailed photos of the issue.",
      category: "warranty",
      views: 0,
      helpfulCount: 28,
      notHelpfulCount: 1,
    },
    {
      id: 6,
      question: "Do you offer assembly services?",
      answer:
        "Yes, we offer professional assembly services for most of our furniture pieces at an additional cost. You can add this service during checkout. Our professional assemblers are trained specifically on our products to ensure proper setup. If you prefer to assemble yourself, all items come with detailed instructions and necessary hardware. Some larger items like sectionals and bed frames require assembly, while smaller items typically arrive fully assembled.",
      category: "orders",
      views: 0,
      helpfulCount: 14,
      notHelpfulCount: 1,
    },
    {
      id: 7,
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can click on the tracking number in the email or visit the \"Order History\" section of your account on our website to track your delivery. For larger furniture items, our delivery partner will contact you to schedule a delivery window. If you haven't received shipping information within the expected timeframe, please contact our customer service team with your order number.",
      category: "orders",
      views: 0,
      helpfulCount: 18,
      notHelpfulCount: 0,
    },
    {
      id: 8,
      question: "Are your products eco-friendly?",
      answer:
        'Yes, sustainability is a core value at ComfortHaven. We use sustainably sourced wood certified by the Forest Stewardship Council (FSC), water-based and low-VOC finishes, and recycled materials where possible. Our "Green Haven" collection features furniture made entirely from sustainable and recycled materials. We also work with suppliers who adhere to environmentally responsible practices and minimize packaging waste. Our commitment to sustainability extends to our manufacturing processes, where we implement energy-efficient methods and waste reduction strategies.',
      category: "products",
      views: 0,
      helpfulCount: 12,
      notHelpfulCount: 1,
    },
    {
      id: 9,
      question: "Can I exchange my purchase for a different color or model?",
      answer:
        "Yes, we allow exchanges within 30 days of delivery for most in-stock items. The new item must be of equal or greater value (with you paying any price difference). Custom orders cannot be exchanged unless there's a manufacturing defect. To initiate an exchange, please contact our customer service team with your order number and the details of the item you'd like to exchange for. You'll need to return the original item in its original condition and packaging. Please note that a restocking fee may apply.",
      category: "returns",
      views: 0,
      helpfulCount: 9,
      notHelpfulCount: 2,
    },
    {
      id: 10,
      question: "How should I protect my furniture from sun damage?",
      answer:
        "Prolonged exposure to direct sunlight can cause fading and damage to furniture. We recommend positioning your furniture away from direct sunlight when possible. If that's not feasible, consider using window treatments like curtains, blinds, or UV-protective window film. For wooden furniture, periodic rotation can ensure even exposure. Leather furniture should be conditioned regularly if exposed to sunlight, and fabric upholstery can benefit from fabric protector sprays designed for UV protection. Remember that natural materials will naturally change color over time, which is part of their unique character.",
      category: "care",
      views: 0,
      helpfulCount: 16,
      notHelpfulCount: 0,
    },
    {
      id: 11,
      question: "What should I do if my furniture arrives damaged?",
      answer:
        "If your furniture arrives damaged, please report it within 48 hours of delivery. Take detailed photos of the damage and the packaging, and contact our customer service team with your order number and the photos. Do not dispose of the packaging until the claim is resolved. Depending on the extent of the damage, we'll arrange for a replacement, repair, or refund. In some cases, a technician may need to inspect the item. We handle all shipping costs for damaged items. Your satisfaction is our priority, and we'll work to resolve the issue promptly.",
      category: "warranty",
      views: 0,
      helpfulCount: 24,
      notHelpfulCount: 0,
    },
    {
      id: 12,
      question: "Do you offer design consultations or guidance?",
      answer:
        "Yes, we offer complimentary design consultations both virtually and in our showrooms. Our design specialists can help you select furniture that matches your style, measurements, and functional needs. For more comprehensive assistance, we offer premium design services for a fee, which includes mood boards, floor plans, and detailed recommendations. To book a consultation, you can use the appointment scheduler on our website or contact our customer service team. We also provide design guides and room planners in the Resources section of our website.",
      category: "products",
      views: 0,
      helpfulCount: 8,
      notHelpfulCount: 1,
    },
  ];

  selectedCategory: number = 0;
  filteredFaqs: FAQ[] = [];

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.filterFaqs();
  }

  selectCategory(index: number) {
    this.selectedCategory = index;
    this.filterFaqs();
  }

  filterFaqs() {
    const categoryId = this.categories[this.selectedCategory].id;

    if (categoryId === "all") {
      this.filteredFaqs = [...this.faqs];
    } else {
      this.filteredFaqs = this.faqs.filter(
        (faq) => faq.category === categoryId,
      );
    }
  }

  onPanelOpen(faq: FAQ) {
    // Increment view count when a panel is opened
    faq.views++;
  }

  markHelpful(faq: FAQ, isHelpful: boolean) {
    if (isHelpful) {
      faq.helpfulCount++;
      this.snackBar.open("Thank you for your feedback!", "Close", {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
    } else {
      faq.notHelpfulCount++;
      this.snackBar.open(
        "Thanks for letting us know. We'll try to improve this answer.",
        "Close",
        {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
        },
      );
    }
  }
}
