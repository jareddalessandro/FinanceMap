import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {
  private apiUrl = 'https://api.worldbank.org/v2/country';

  constructor(private http: HttpClient) {}  

  getCountryData(countryCode: string): Observable<any> {
    const url = `${this.apiUrl}/${countryCode}/indicator/SP.POP.TOTL?date=2020&format=json`;
    return this.http.get<any[]>(url).pipe(
      map(response => response[1][0])  
    );
  }
}
