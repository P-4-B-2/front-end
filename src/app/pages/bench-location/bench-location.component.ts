import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-bench-location',
  standalone: true,
  imports: [],
  templateUrl: './bench-location.component.html',
  styleUrl: './bench-location.component.css'
})
export class BenchLocationComponent implements OnInit {
  private map!: L.Map;
  private marker!: L.Marker;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // 51.16405955699206 4.988548279070529
    this.map = L.map('map').setView([51.16405955699206, 4.988548279070529], 13); // Geel

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      this.setMarker(lat, lng);
      console.log('Selected Coordinates:', lat, lng);
    });
  }

  private setMarker(lat: number, lng: number): void {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([lat, lng]).addTo(this.map);
  }
}