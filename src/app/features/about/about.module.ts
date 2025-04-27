import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { AboutRoutingModule } from "./about-routing.module";
import { AboutComponent } from "./about.component";

import { HeaderComponent } from "../../shared/components/header/header.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { NewsletterComponent } from "../../shared/components/newsletter/newsletter.component";

import { TeamMemberComponent } from "./components/team-member/team-member.component";
import { CompanyHistoryComponent } from "./components/company-history/company-history.component";
import { ValuesComponent } from "./components/values/values.component";
import { TestimonialCarouselComponent } from "./components/testimonial-carousel/testimonial-carousel.component";

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    TeamMemberComponent,
    CompanyHistoryComponent,
    ValuesComponent,
    TestimonialCarouselComponent,
  ],
})
export class AboutModule { }
