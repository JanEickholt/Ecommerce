import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-team-member",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./team-member.component.html",
  styleUrls: ["./team-member.component.scss"],
})
export class TeamMemberComponent {
  @Input() name!: string;
  @Input() position!: string;
  @Input() image!: string;
  @Input() bio!: string;
  @Input() social: { platform: string; url: string }[] = [];

  isFlipped = false;

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }
}
