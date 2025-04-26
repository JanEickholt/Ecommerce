import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { delay } from "rxjs/operators";
import { Product } from "../models/product";

export interface ProductFilterState {
  categories: string[];
  priceRange: { min: number; max: number };
  colors: string[];
  materials: string[];
  rating: number;
  features: string[];
  sortBy: string;
}

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
      featured: true,
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
      new: true,
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
      bestSeller: true,
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
      featured: true,
    },
  ];

  // Filter state
  private filterStateSubject = new BehaviorSubject<ProductFilterState>({
    categories: [],
    priceRange: { min: 0, max: 5000 },
    colors: [],
    materials: [],
    rating: 0,
    features: [],
    sortBy: "popular",
  });

  // Observable filter state
  private categoriesSubject = new BehaviorSubject<
    { label: string; value: string; count: number }[]
  >([
    { label: "Sofas & Couches", value: "sofas", count: 12 },
    { label: "Armchairs", value: "armchairs", count: 8 },
    { label: "Recliners", value: "recliners", count: 6 },
    { label: "Sectionals", value: "sectionals", count: 4 },
    { label: "Accent Chairs", value: "accent-chairs", count: 7 },
    { label: "Loveseats", value: "loveseats", count: 5 },
  ]);

  private colorsSubject = new BehaviorSubject<
    { name: string; value: string; code: string }[]
  >([
    { name: "Gray", value: "gray", code: "#6a676d" },
    { name: "Brown", value: "brown", code: "#5d5850" },
    { name: "White", value: "white", code: "#ffffff" },
    { name: "Black", value: "black", code: "#000000" },
    { name: "Blue", value: "blue", code: "#4267B2" },
    { name: "Green", value: "green", code: "#228B22" },
  ]);

  private materialsSubject = new BehaviorSubject<
    { label: string; value: string; count: number }[]
  >([
    { label: "Polyester", value: "polyester", count: 15 },
    { label: "Cotton", value: "cotton", count: 10 },
    { label: "Leather", value: "leather", count: 8 },
    { label: "Wood", value: "wood", count: 20 },
    { label: "Metal", value: "metal", count: 12 },
    { label: "Velvet", value: "velvet", count: 7 },
  ]);

  private priceRangeSubject = new BehaviorSubject<{ min: number; max: number }>(
    { min: 0, max: 5000 },
  );

  // Public observables
  public categories$ = this.categoriesSubject.asObservable();
  public colors$ = this.colorsSubject.asObservable();
  public materials$ = this.materialsSubject.asObservable();
  public priceRange$ = this.priceRangeSubject.asObservable();

  constructor() {}

  updateFilterState(filterState: Partial<ProductFilterState>): void {
    this.filterStateSubject.next({
      ...this.filterStateSubject.value,
      ...filterState,
    });
  }

  getFilterState(): ProductFilterState {
    return this.filterStateSubject.value;
  }

  resetFilters(): void {
    this.filterStateSubject.next({
      categories: [],
      priceRange: { min: 0, max: 5000 },
      colors: [],
      materials: [],
      rating: 0,
      features: [],
      sortBy: "popular",
    });
  }

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(500));
  }

  getProduct(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find((p) => p.id === id);
    return of(product).pipe(delay(300));
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featuredProducts = this.mockProducts.filter((p) => p.featured);
    return of(featuredProducts).pipe(delay(300));
  }

  getNewArrivals(): Observable<Product[]> {
    const newArrivals = this.mockProducts.filter((p) => p.new);
    return of(newArrivals).pipe(delay(300));
  }

  getBestSellers(): Observable<Product[]> {
    const bestSellers = this.mockProducts.filter((p) => p.bestSeller);
    return of(bestSellers).pipe(delay(300));
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
