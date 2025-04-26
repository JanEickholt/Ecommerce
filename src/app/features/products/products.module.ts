import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";

import { ProductFilterComponent } from "./components/product-filter/product-filter.component";
import { ProductGridComponent } from "./components/product-grid/product-grid.component";
import { ProductSortComponent } from "./components/product-sort/product-sort.component";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatSliderModule } from "@angular/material/slider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatBadgeModule } from "@angular/material/badge";

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    ProductFilterComponent,
    ProductGridComponent,
    ProductSortComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    MatSliderModule,
    MatTooltipModule,
    MatBadgeModule,
  ],
})
export class ProductsModule {}
