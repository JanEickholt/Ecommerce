import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

import { HeaderComponent } from "../../shared/components/header/header.component";
import { HeroComponent } from "./components/hero/hero.component";
import { FeaturedProductsComponent } from "../../shared/components/featured-products/featured-products.component";
import { CategoriesShowcaseComponent } from "./components/categories-showcase/categories-showcase.component";
import { TestimonialsComponent } from "./components/testimonials/testimonials.component";
import { NewsletterComponent } from "../../shared/components/newsletter/newsletter.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    HeaderComponent,
    HeroComponent,
    FeaturedProductsComponent,
    CategoriesShowcaseComponent,
    TestimonialsComponent,
    NewsletterComponent,
    FooterComponent,
    RouterModule,
  ],
})
export class HomeModule { }
