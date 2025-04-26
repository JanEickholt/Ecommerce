export interface ProductOption {
  name: string;
  value: string;
}

export interface ProductColor {
  name: string;
  code: string;
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
