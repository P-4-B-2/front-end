import { Component } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { History } from '../../interfaces/history';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conversations-page',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  histories$!: Observable<History[]>;
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory() {
    this.histories$ = this.apiService.getHistory().pipe(
      switchMap(histories => {
        return forkJoin({
          histories: of(histories),
          benches: this.apiService.getBenches(),
          locations: this.apiService.getLocations(),
          statuses: this.apiService.getStatuses()
        }).pipe(
          switchMap(({ histories, benches, locations, statuses }) => {
            const updatedHistories$ = histories.map(history => {
              const location = locations.find(l => l.id === history.locationId);
              
              if (location) {
                return this.getAddress(Number(location.latitude), Number(location.longitude)).pipe(
                  map(address => ({
                    ...history,
                    bench: benches.find(b => b.id === history.benchId),
                    location: { ...location, address }, // ✅ Ensure address is set
                    status: statuses.find(s => s.id === history.statusId)
                  }))
                );
              }
              
              return of({
                ...history,
                bench: benches.find(b => b.id === history.benchId),
                location,
                status: statuses.find(s => s.id === history.statusId)
              });
            });
  
            return forkJoin(updatedHistories$);
          })
        );
      })
    );
  }  

  getAddress(latitude: number, longitude: number): Observable<string> {
    if (!latitude || !longitude) return of('Invalid Coordinates');
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    
    // Correct URL construction using template literals
    const url = "https://nominatim.openstreetmap.org/reverse?format=json&lat="+String(latitude)+"&lon="+String(longitude);
  
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('Nominatim Response:', response); // Debugging log
  
        if (response && response.address) {
          const { road, house_number, city, country } = response.address;
          return road && house_number
            ? `${road} ${house_number}, ${city}, ${country}`
            : response.display_name || 'Address not found';
        }
        return 'Address not found';
      }),
      // Catch errors and return a message instead of failing silently
      map(address => address || 'Unknown Location'),
      switchMap(address => of(address)), // Ensure we return an observable
    );
  }  

}
