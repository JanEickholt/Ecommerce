import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  PLATFORM_ID,
  Inject,
  OnInit,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Product } from "../../../core/models/product";
import { CartService } from "../../../../core/services/cart.service";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() quickViewClicked = new EventEmitter<Product>();

  isBrowser: boolean;
  fallbackImageUrl: string = "/api/placeholder/300/300";
  imageLoaded: boolean = false;

  private cartService: CartService = inject(CartService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.product.imageUrl) {
      this.product.imageUrl = this.fallbackImageUrl;
    }

    if (this.isBrowser && this.product.imageUrl) {
      const img = new Image();
      img.onload = () => {
        this.imageLoaded = true;
      };
      img.onerror = () => {
        this.product.imageUrl = this.fallbackImageUrl;
        this.imageLoaded = true;
      };
      img.src = this.product.imageUrl;
    } else {
      this.imageLoaded = true;
    }
  }

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.isBrowser) {
      this.cartService.addToCart({
        product: this.product,
        quantity: 1,
      });
    }
  }

  quickView(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.quickViewClicked.emit(this.product);
  }

  onImageError(): void {
    this.product.imageUrl = this.fallbackImageUrl;
  }
}
