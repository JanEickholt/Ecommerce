import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ProductDetailsRoutingModule } from "./product-details-routing.module";
import { ProductDetailsComponent } from "./product-details.component";

import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ProductDetailsTabsComponent } from "./components/product-details-tabs/product-details-tabs.component";

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ProductDetailsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ProductCardComponent,
    ProductDetailsTabsComponent,
  ],
})
export class ProductDetailsModule { }
