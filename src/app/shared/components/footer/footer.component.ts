import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import PinterestIcon from "@mui/icons-material/Pinterest";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent { }
