import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProductService } from "../../../../../core/services/product.service";
import { Product } from "../../../../core/models/product";
import { CartService } from "../../../../../core/services/cart.service";

@Component({
  selector: "app-product-grid",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./product-grid.component.html",
  styleUrls: ["./product-grid.component.scss"],
})
export class ProductGridComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error("Error loading products:", error);
        this.isLoading = false;
      },
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({
      product: product,
      quantity: 1,
    });
  }
}
