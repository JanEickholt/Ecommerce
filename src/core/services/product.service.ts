import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private mockProducts: Product[] = [
    {
      id: "1",
      name: "Plush Comfort Sofa",
      price: 1299.99,
      imageUrl:
        "https://media.hoeffner.de/medias/large/29408640_7-202210072234.webp",
      shortDescription: "Premium quality sofa for ultimate comfort and style.",
      description:
        "<p>Experience unmatched comfort with our Plush Comfort Sofa. Made with high-density foam cushions and premium upholstery, this sofa is designed to provide exceptional support and relaxation.</p><p>Features include stain-resistant fabric, solid hardwood frame, and no-sag spring system for durability.</p>",
      category: "Sofas & Couches",
      inStock: true,
      badge: "New",
      badgeType: "new",
      rating: 4.5,
      reviewCount: 42,
      colors: [
        { name: "Charcoal Gray", code: "#6a676d" },
        { name: "Comfort Brown", code: "#5d5850" },
        { name: "Cloud White", code: "#acaaa6" },
      ],
      materials: ["Polyester", "Cotton", "Wood"],
      images: [
        "https://media.hoeffner.de/medias/large/29408640_7-202210072234.webp",
        "https://media.hoeffner.de/medias/large/29405138_20-202409271317.webp",
        "https://media.hoeffner.de/medias/large/29408643_7-202409271317.webp",
      ],
      specifications: [
        {
          title: "Dimensions",
          items: [
            { name: "Width", value: "84 inches" },
            { name: "Depth", value: "38 inches" },
            { name: "Height", value: "36 inches" },
          ],
        },
        {
          title: "Materials",
          items: [
            { name: "Frame", value: "Kiln-dried hardwood" },
            { name: "Upholstery", value: "95% Polyester, 5% Cotton" },
            {
              name: "Cushions",
              value: "High-density foam with down alternative",
            },
          ],
        },
      ],
      reviews: [
        {
          id: "101",
          name: "Sarah Johnson",
          rating: 5,
          date: "2023-03-15",
          title: "Absolutely Love It!",
          content:
            "This sofa exceeded all my expectations. The comfort level is amazing and it looks stunning in my living room.",
          helpfulCount: 24,
        },
        {
          id: "102",
          name: "Michael Rodriguez",
          rating: 4,
          date: "2023-02-28",
          title: "Great Quality",
          content:
            "Very well made and comfortable. I docked one star because it took longer than expected to deliver.",
          helpfulCount: 15,
        },
      ],
      relatedProducts: ["2", "3", "4"],
    },
    {
      id: "2",
      name: "Cloud Nine Armchair",
      price: 699.99,
      oldPrice: 899.99,
      imageUrl:
        "https://i.pinimg.com/736x/75/19/ac/7519ac455517df51bf7cf2145d69f285.jpg",
      shortDescription: "Stylish armchair that provides exceptional comfort.",
      category: "Armchairs",
      inStock: true,
      badge: "Sale",
      badgeType: "sale",
      rating: 5,
      reviewCount: 37,
      relatedProducts: ["1", "3"],
    },
    {
      id: "3",
      name: "Serenity Sectional",
      price: 2499.99,
      imageUrl:
        "https://khemlanimart.com/cdn/shop/files/SERENITY.jpg?v=1683236829&width=1206",
      shortDescription:
        "Modular sectional sofa perfect for large family spaces.",
      category: "Sectionals",
      inStock: true,
      badge: "Bestseller",
      badgeType: "bestseller",
      rating: 4.5,
      reviewCount: 56,
      relatedProducts: ["1", "2"],
    },
    {
      id: "4",
      name: "Luxe Recliner",
      price: 1099.99,
      imageUrl:
        "https://foter.com/photos/419/bishop-40-5-wide-genuine-leather-power-standard-recliner.jpeg?s=l",
      shortDescription:
        "Premium recliner with multiple positions for ultimate relaxation.",
      category: "Recliners",
      inStock: true,
      rating: 4,
      reviewCount: 28,
      relatedProducts: ["2", "3"],
    },
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(500));
  }

  getProduct(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find((p) => p.id === id);
    return of(product).pipe(delay(300));
  }

  getRelatedProducts(productId: string): Observable<Product[]> {
    const product = this.mockProducts.find((p) => p.id === productId);

    if (
      !product ||
      !product.relatedProducts ||
      product.relatedProducts.length === 0
    ) {
      return of([]).pipe(delay(300));
    }

    const relatedProducts = this.mockProducts.filter((p) =>
      product.relatedProducts?.includes(p.id),
    );

    return of(relatedProducts).pipe(delay(300));
  }
}
