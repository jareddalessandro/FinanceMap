import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClient } from '@angular/common/http'; 
import { CountryDataService } from '../country-data.service';  
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Country {
  name: string;
  capital: string;
  region: string;
  incomeLevel: string;
  longitude: string;
  latitude: string;
}

@Component({
  selector: 'app-finance-map',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './finance-map.component.html',
  styleUrls: ['./finance-map.component.css']
})
export class FinanceMapComponent implements OnInit {
  countries: Country[] = [];
  selectedCountry: Country | null = null; 
  selectedCountryData: any = null; 
  private apiUrl = 'https://api.worldbank.org/v2/country?format=json&per_page=300';

  constructor(private http: HttpClient, private countryService: CountryDataService) {}

  ngOnInit(): void {
    this.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  // Fetch country data from the World Bank API
  getCountries(): Observable<Country[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(response => response[1].map((country: any) => ({
        name: country.name,
        capital: country.capitalCity,
        region: country.region.value,
        incomeLevel: country.incomeLevel.value,
        longitude: country.longitude,
        latitude: country.latitude
      })))
    );
  }


  onMapHover(event: MouseEvent): void {
    const target = event.target as SVGElement;
    const countryName = target.getAttribute('name');

    if (countryName) {
      this.selectedCountry = this.countries.find(c => c.name === countryName) || null;
    }
    const countryCode = target.getAttribute('id');
  
    if (!countryCode) {
      console.log('No country selected');
      return;
    }
  
    this.countryService.getCountryData(countryCode).subscribe(data => {
      if (Object.keys(data).length === 0) {
        console.log('No additional data found for this country');
      } else {
        this.selectedCountryData = data;
        this.selectedCountryData.value = Intl.NumberFormat('en-US').format(this.selectedCountryData.value);
        console.log('Additional Country Data:', this.selectedCountryData);
      }
    });
  }
  
}
