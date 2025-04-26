import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"],
})
export class HeroComponent implements OnInit {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() { }
}
