import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { NgClass, CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Bench } from '../../interfaces/bench';

@Component({
  selector: 'app-bench-location',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './bench-location.component.html',
  styleUrls: ['./bench-location.component.css']
})
export class BenchLocationComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  private map!: L.Map;
  private marker!: L.Marker;
  private bench!: Observable<Bench>;
  private defaultLat = 51.16405955699206;
  private defaultLng = 4.988548279070529;
  
  selectedLat = this.defaultLat;
  selectedLng = this.defaultLng;
  showModal = false; // Control the visibility of the modal
  modalLat: number = 0;
  modalLng: number = 0;
  
  ngOnInit(): void {
    this.initMap();
    this.bench = this.apiService.getBenchId(1);
    console.log(this.bench)
  }

  private initMap(): void {
    this.map = L.map('map', {
      attributionControl: false // Disable attribution control
    }).setView([this.defaultLat, this.defaultLng], 13); // Geel

    // Add OpenStreetMap tile layer with its attribution
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap' // Only OpenStreetMap attribution
    }).addTo(this.map);

    // Manually add the attribution control with the OpenStreetMap attribution
    L.control.attribution({
      position: 'bottomright', // Positioning the attribution on the bottom-right
      prefix: '' // Don't include the default Leaflet attribution
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
    this.modalLat = this.selectedLat;
    this.modalLng = this.selectedLng;
    this.showModal = true; // Show the modal when location is saved
  }

  closeModal(): void {
    this.showModal = false; // Hide the modal
  }

  get isDefaultLocation(): boolean {
    return this.selectedLat === this.defaultLat && this.selectedLng === this.defaultLng;
  }
}
