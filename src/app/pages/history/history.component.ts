import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { History } from '../../interfaces/history';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Status } from '../../interfaces/status';
import { timer } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Bench } from '../../interfaces/bench';
import { Location } from '../../interfaces/location';

@Component({
  selector: 'app-conversations-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  benches: (Bench & { currentLocation?: Location | null; pastLocations: Location[]; })[] = [];

  constructor(private apiService: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBenches();
  }

  loadBenches(): void {
    this.apiService.getBenches().subscribe(benches => {
      this.apiService.getHistory().subscribe(historyRecords => {
        this.benches = benches.map(bench => {
          const benchHistory = historyRecords.filter(h => h.benchId === bench.id);
          const currentHistory = benchHistory.length ? benchHistory[0] : null;
          const pastHistories = benchHistory.slice(1);

          // for the current location
          let currentLocation: Location | undefined = undefined;
          if (currentHistory && currentHistory.locationId) {
            this.apiService.getLocation(currentHistory.locationId).subscribe(location => {
              currentLocation = location;
              // Get the address here, after getting the location
              if (currentLocation) {
                this.getAddress(currentLocation.latitude, currentLocation.longitude).subscribe(address => {
                  if (currentLocation) {
                    currentLocation.address = address;
                  }
                });
              }
            });
          }

          // for the past locations
          const pastLocations: Location[] = [];
          pastHistories.forEach(history => {
            if (history.locationId) {
              this.apiService.getLocation(history.locationId).subscribe(location => {
                  if(location) {
                    location.address = 'Loading...';
                    pastLocations.push(location);

                    // Get the address here, after getting the location
                    this.getAddress(location.latitude, location.longitude).subscribe(address => {
                      if (location) {
                        location.address = address;
                      }
                    });
                  }
              });
            }
          });

          return {
            ...bench,
            currentLocation,
            pastLocations
          };
        });
      });
    });
  }

  getAddress(latitude: number, longitude: number): Observable<string> {
    if (!latitude || !longitude) {
      console.error('Invalid Coordinates:', latitude, longitude);
      return of('Invalid Coordinates');
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        if (response && response.address) {
          const { road, house_number, city, country } = response.address;
          return road && house_number
            ? `${road} ${house_number}, ${city}, ${country}`
            : response.display_name || 'Address onbestaand';
        }
        return 'Address onbestaand';
      }),
      map(address => address || 'Locatiie onbestaand'),
      switchMap(address => {
        return of(address);
      })
    );
  }
}