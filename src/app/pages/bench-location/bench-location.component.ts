import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { NgClass, CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Bench } from '../../interfaces/bench';
import { History } from '../../interfaces/history';
import { Location, LocationDto } from '../../interfaces/location';

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
        
        // Fetch location by ID
        this.apiService.getLocationById(latestHistory.locationId).subscribe(location => {
          this.defaultLat = location.latitude;
          this.defaultLng = location.longitude;
          
          // Initialize map only after coordinates are updated
          this.initMap();

          this.selectedLat = this.defaultLat;
          this.selectedLng = this.defaultLng;
        });
      } else {
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
    this.modalLat = this.convertToDMS(this.selectedLat);
    this.modalLng = this.convertToDMS(this.selectedLng);
    this.showModal = true;


    // ON SAVE:
    // First, we need to add a location, we need to get its ID back
    const location: LocationDto = {
      id: 0,
      latitude: String(this.selectedLat),
      longitude: String(this.selectedLng)
    }

    this.apiService.postLocation(location).subscribe(locationResponse => {
      if (locationResponse.id !== undefined) {  // Ensure location ID is defined
        // Step 2: Fetch the last history entry to get its statusId
        this.apiService.getHistory().subscribe(histories => {
          if (histories.length > 0) {
            const latestHistory = histories.reduce((prev, current) => (prev.id > current.id ? prev : current));
            
            // Step 3: Create the new History entry with the same statusId
            const newHistory: History = {
              id: 0,
              benchId: 1, // Assuming bench ID is always 1, adjust if necessary
              locationId: locationResponse.id!, // Newly created location ID
              statusId: latestHistory.statusId // Keep the previous status
            };
    
            // Step 4: Save the History
            this.apiService.postHistory(newHistory).subscribe(historyResponse => {

              this.reloadMap(locationResponse.latitude, locationResponse.longitude);
            });
          } else {
          }
        });
      } else {
        console.error('Error: Location ID is undefined. Cannot create history.');
      }
    });

    
  }

  private reloadMap(lat: string, lng: string): void {
    this.defaultLat = parseFloat(lat);
    this.defaultLng = parseFloat(lng);
    this.selectedLat = this.defaultLat;
    this.selectedLng = this.defaultLng;
  
    // Destroy existing map instance if needed
    if (this.map) {
      this.map.remove();
    }
  
    // Reinitialize the map
    this.initMap();
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
