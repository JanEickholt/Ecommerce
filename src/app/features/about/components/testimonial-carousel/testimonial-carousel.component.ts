import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  image: string;
  rating: number;
}

@Component({
  selector: "app-testimonial-carousel",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: "./testimonial-carousel.component.html",
  styleUrls: ["./testimonial-carousel.component.scss"],
})
export class TestimonialCarouselComponent implements OnInit {
  testimonials: Testimonial[] = [
    {
      quote:
        "ComfortHaven's Cloud Nine Armchair transformed my reading nook into a sanctuary. The quality and comfort are unmatched, and their customer service was exceptional from start to finish.",
      author: "Jennifer Adams",
      position: "Interior Designer",
      image: "/api/placeholder/100/100",
      rating: 5,
    },
    {
      quote:
        "We purchased the Serenity Sectional for our family room, and it's been a game-changer. The sustainable materials were important to us, and the comfort level exceeded our expectations.",
      author: "Mark Thompson",
      position: "Software Engineer",
      image: "/api/placeholder/100/100",
      rating: 5,
    },
    {
      quote:
        "As someone who works from home, investing in quality furniture was essential. My ComfortHaven desk chair has made a world of difference in my productivity and comfort throughout the workday.",
      author: "Sophia Chen",
      position: "Marketing Director",
      image: "/api/placeholder/100/100",
      rating: 4,
    },
  ];

  currentTestimonialIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.intervalId = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  previousTestimonial(): void {
    this.stopAutoPlay();
    this.currentTestimonialIndex =
      this.currentTestimonialIndex === 0
        ? this.testimonials.length - 1
        : this.currentTestimonialIndex - 1;
    this.startAutoPlay();
  }

  nextTestimonial(): void {
    this.currentTestimonialIndex =
      (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }

  setCurrentTestimonial(index: number): void {
    this.stopAutoPlay();
    this.currentTestimonialIndex = index;
    this.startAutoPlay();
  }
}
