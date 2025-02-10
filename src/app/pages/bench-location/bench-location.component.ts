import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bench-location',
  standalone: true,
  imports: [NgClass],
  templateUrl: './bench-location.component.html',
  styleUrl: './bench-location.component.css'
})
export class BenchLocationComponent implements OnInit {
  private map!: L.Map;
  private marker!: L.Marker;
  private defaultLat = 51.16405955699206;
  private defaultLng = 4.988548279070529;
  
  selectedLat = this.defaultLat;
  selectedLng = this.defaultLng;
  
  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.defaultLat, this.defaultLng], 13); // Geel

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Initialize marker at default location
    this.setMarker(this.defaultLat, this.defaultLng);

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      this.setMarker(lat, lng);
      
      // Update selected coordinates
      this.selectedLat = lat;
      this.selectedLng = lng;
    });
  }

  private setMarker(lat: number, lng: number): void {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    const icon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });

    this.marker = L.marker([lat, lng], { icon }).addTo(this.map);
  }

  saveChanges(): void {
    console.log('New location saved:', this.selectedLat, this.selectedLng);
  }

  get isDefaultLocation(): boolean {
    return this.selectedLat === this.defaultLat && this.selectedLng === this.defaultLng;
  }
}
