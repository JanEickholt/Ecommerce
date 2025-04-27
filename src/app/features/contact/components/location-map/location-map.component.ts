import { Component, OnInit, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { SafeResourceUrlPipe } from "../../../../shared/pipes/safe-resource-url.pipe";

@Component({
  selector: "app-location-map",
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    SafeResourceUrlPipe,
  ],
  templateUrl: "./location-map.component.html",
  styleUrls: ["./location-map.component.scss"],
})
export class LocationMapComponent implements OnInit, AfterViewInit {
  locations = [
    {
      name: "New York (Headquarters)",
      address: "123 Comfort Street, New York, NY 10001",
      phone: "(212) 555-6789",
      hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425908259539!3d40.74076904379429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1650912567541!5m2!1sen!2sus",
    },
    {
      name: "Los Angeles",
      address: "456 Relax Avenue, Los Angeles, CA 90001",
      phone: "(323) 555-7890",
      hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203640386!2d-118.2427025825905!3d34.05289282569113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%20City%20Hall!5e0!3m2!1sen!2sus!4v1650912567541!5m2!1sen!2sus",
    },
    {
      name: "Chicago",
      address: "789 Cozy Boulevard, Chicago, IL 60007",
      phone: "(312) 555-3456",
      hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.1230445840466!2d-87.6247974825905!3d41.88291077922131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ca3e49dacc9%3A0xb351205fae50c6f3!2sThe%20Art%20Institute%20of%20Chicago!5e0!3m2!1sen!2sus!4v1650912567541!5m2!1sen!2sus",
    },
  ];

  selectedLocationIndex = 0;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // Any initialization after view rendering
  }

  selectLocation(index: number): void {
    this.selectedLocationIndex = index;
  }

  openDirections(location: any): void {
    // In a real app, this would open directions to the location
    const encodedAddress = encodeURIComponent(location.address);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`,
      "_blank",
    );
  }
}
