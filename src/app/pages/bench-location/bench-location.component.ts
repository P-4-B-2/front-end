import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { NgClass, CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Bench } from '../../interfaces/bench';
import { History } from '../../interfaces/history';
import { Location } from '../../interfaces/location';

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

  private location!: Observable<Location>
  private map!: L.Map;
  private marker!: L.Marker;
  private history!: Observable<History[]>;
  private defaultLat = 51.16405955699206;
  private defaultLng = 4.988548279070529;
  
  selectedLat = this.defaultLat;
  selectedLng = this.defaultLng;
  showModal = false;
  modalLat: string = '';
  modalLng: string = '';
  
  ngOnInit(): void {
    this.history = this.apiService.getHistory();
    // On INIT, We need to fetch the current Status (For later), and location of the last Bench History
    // Fetch all benches
    this.history.subscribe(histories => {
      if (histories.length > 0) {
        const latestHistory = histories.reduce((prev, current) => (prev.id > current.id ? prev : current));
        console.log('Location ID of the latest history:', latestHistory.locationId);
        
        // Fetch location by ID
        this.apiService.getLocationById(latestHistory.locationId).subscribe(location => {
          this.defaultLat = location.latitude;
          this.defaultLng = location.longitude;
          
          console.log('Updated default lat/lng:', this.defaultLat, this.defaultLng);
          
          // Initialize map only after coordinates are updated
          this.initMap();

          this.selectedLat = this.defaultLat;
          this.selectedLng = this.defaultLng;
        });
      } else {
        console.log('No history records found. Continuing with default lat and long');
        this.initMap(); // Initialize with default values if no history is found
      }
    });
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
    this.modalLat = this.convertToDMS(this.selectedLat);
    this.modalLng = this.convertToDMS(this.selectedLng);
    this.showModal = true;


    // ON SAVE:
    // First, we need to add a location, we need to get its ID back
    // Next, we can create a new History.
    // To this, Add the bench ID (1)
    // We need to get the previous status, since that hasn't changed.
    // We can add this statusID to the history
    // Finally we can add the location ID
  }

  closeModal(): void {
    this.showModal = false; // Hide the modal
  }

  get isDefaultLocation(): boolean {
    return this.selectedLat === this.defaultLat && this.selectedLng === this.defaultLng;
  }

  // Convert decimal degrees to degrees, minutes, seconds (DMS)
  private convertToDMS(degrees: number): string {
    const deg = Math.floor(degrees);
    const min = Math.floor((degrees - deg) * 60);
    const sec = ((degrees - deg - min / 60) * 3600);

    const direction = deg >= 0 ? (degrees === this.selectedLat ? 'N' : 'E') : (degrees === this.selectedLat ? 'S' : 'W');

    return `${Math.abs(deg)}° ${Math.abs(min)}' ${Math.abs(sec).toFixed(2)}" ${direction}`;
  }
}
