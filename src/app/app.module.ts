import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
  ],
  exports: [
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
  ],
})
export class AppModule {}
