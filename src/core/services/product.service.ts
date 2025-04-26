import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export interface ProductOption {
  name: string;
  value: string;
}

export interface ProductColor {
  name: string;
  code: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductSpecGroup {
  title: string;
  items: { name: string; value: string }[];
}

export interface ProductReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  imageUrl?: string;
  images?: string[];
  shortDescription?: string;
  description?: string;
  category: string;
  subCategory?: string;
  inStock: boolean;
  badge?: string;
  badgeType?: "sale" | "new" | "bestseller" | "limited";
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  colors?: ProductColor[];
  materials?: string[];
  specifications?: ProductSpecGroup[];
  relatedProducts?: string[];
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
}

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
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

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
      new: true,
    },
    {
      id: "2",
      name: "Cloud Nine Armchair",
      price: 699.99,
      oldPrice: 899.99,
      discount: 22,
      imageUrl:
        "https://i.pinimg.com/736x/75/19/ac/7519ac455517df51bf7cf2145d69f285.jpg",
      shortDescription: "Stylish armchair that provides exceptional comfort.",
      category: "Armchairs",
      inStock: true,
      badge: "Sale",
      badgeType: "sale",
      rating: 5,
      reviewCount: 37,
      featured: true,
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
      featured: true,
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
      featured: true,
    },
    {
      id: "5",
      name: "Modern Accent Chair",
      price: 499.99,
      imageUrl:
        "https://static.iwmbuzz.com/wp-content/uploads/2022/06/5-most-comfortable-sofas-for-your-living-room-2-920x920.jpg",
      shortDescription:
        "Eye-catching accent chair to add personality to any room.",
      category: "Accent Chairs",
      inStock: true,
      rating: 4.2,
      reviewCount: 19,
      badge: "Bestseller",
      badgeType: "bestseller",
      bestSeller: true,
    },
    {
      id: "6",
      name: "Cozy Loveseat",
      price: 899.99,
      imageUrl:
        "https://assets.ad-magazin.de/photos/6666ae63a527a30d56a7f3d1/16:9/w_2240,c_limit/ATD_Little%20Petra_VB2_Sillon_SC50_Drop%20Leaf_HM5_Tripod_HM8_Loafer_SC23_Lucca_SC51_Amore_SC50_&amp;Tradition%20Collect%20Cotton%20Throw%20SC32%20.jpg",
      shortDescription: "Compact two-seater perfect for smaller spaces.",
      category: "Loveseats",
      inStock: true,
      rating: 4.6,
      reviewCount: 31,
      badge: "New",
      badgeType: "new",
      new: true,
    },
  ];

  private categoriesSubject = new BehaviorSubject<
    { label: string; value: string; count: number }[]
  >([]);
  public categories$ = this.categoriesSubject.asObservable();

  private colorsSubject = new BehaviorSubject<ProductColor[]>([]);
  public colors$ = this.colorsSubject.asObservable();

  private materialsSubject = new BehaviorSubject<
    { label: string; value: string; count: number }[]
  >([]);
  public materials$ = this.materialsSubject.asObservable();

  private priceRangeSubject = new BehaviorSubject<{ min: number; max: number }>(
    { min: 0, max: 0 },
  );
  public priceRange$ = this.priceRangeSubject.asObservable();

  private filterStateSubject = new BehaviorSubject<ProductFilterState>({
    categories: [],
    priceRange: { min: 0, max: 5000 },
    colors: [],
    materials: [],
    rating: 0,
    features: [],
    sortBy: "popular",
  });
  public filterState$ = this.filterStateSubject.asObservable();

  constructor() {
    this.productsSubject.next(this.mockProducts);

    this.updateFilterOptions();
  }

  private updateFilterOptions(): void {
    const categoriesMap = new Map<string, number>();
    this.mockProducts.forEach((product) => {
      const count = categoriesMap.get(product.category) || 0;
      categoriesMap.set(product.category, count + 1);
    });

    const categories = Array.from(categoriesMap.entries()).map(
      ([name, count]) => ({
        label: name,
        value: name.toLowerCase().replace(/\s+/g, "-"),
        count,
      }),
    );
    this.categoriesSubject.next(categories);

    const uniqueColors = new Map<string, ProductColor>();
    this.mockProducts.forEach((product) => {
      if (product.colors) {
        product.colors.forEach((color) => {
          if (!uniqueColors.has(color.name)) {
            uniqueColors.set(color.name, color);
          }
        });
      }
    });
    this.colorsSubject.next(Array.from(uniqueColors.values()));

    const materialsMap = new Map<string, number>();
    this.mockProducts.forEach((product) => {
      if (product.materials) {
        product.materials.forEach((material) => {
          const count = materialsMap.get(material) || 0;
          materialsMap.set(material, count + 1);
        });
      }
    });

    const materials = Array.from(materialsMap.entries()).map(
      ([name, count]) => ({
        label: name,
        value: name.toLowerCase().replace(/\s+/g, "-"),
        count,
      }),
    );
    this.materialsSubject.next(materials);

    const prices = this.mockProducts.map((p) => p.price);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));

    this.priceRangeSubject.next({ min: minPrice, max: maxPrice });

    const currentFilter = this.filterStateSubject.value;
    this.filterStateSubject.next({
      ...currentFilter,
      priceRange: { min: minPrice, max: maxPrice },
    });
  }

  getProducts(filters?: Partial<ProductFilterState>): Observable<Product[]> {
    if (filters) {
      this.filterStateSubject.next({
        ...this.filterStateSubject.value,
        ...filters,
      });
    }

    const filterState = this.filterStateSubject.value;

    let filteredProducts = this.mockProducts;

    if (filterState.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filterState.categories.includes(
          product.category.toLowerCase().replace(/\s+/g, "-"),
        ),
      );
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= filterState.priceRange.min &&
        product.price <= filterState.priceRange.max,
    );

    if (filterState.colors.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.colors &&
          product.colors.some((color) =>
            filterState.colors.includes(color.name),
          ),
      );
    }

    if (filterState.materials.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.materials &&
          product.materials.some((material) =>
            filterState.materials.includes(
              material.toLowerCase().replace(/\s+/g, "-"),
            ),
          ),
      );
    }

    if (filterState.rating > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= filterState.rating,
      );
    }

    if (filterState.features.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        for (const feature of filterState.features) {
          if (feature === "featured" && !product.featured) return false;
          if (feature === "new" && !product.new) return false;
          if (feature === "bestseller" && !product.bestSeller) return false;
          if (feature === "inStock" && !product.inStock) return false;
        }
        return true;
      });
    }

    switch (filterState.sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filteredProducts.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return of(filteredProducts).pipe(delay(500));
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
    const priceRange = this.priceRangeSubject.value;

    this.filterStateSubject.next({
      categories: [],
      priceRange,
      colors: [],
      materials: [],
      rating: 0,
      features: [],
      sortBy: "popular",
    });
  }
}
