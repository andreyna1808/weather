import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FiltersComponent } from './components/filters/filters.component';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    DropdownComponent,
    TableListComponent,
    PaginationComponent,
    FiltersComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'DemoWeb';
  forecasts: any[] = [];
  page: number = 1;
  pageSize: number = 5;
  totalRecords: number = 30;
  cityFilter: string = '';
  dateFilter: string = '';
  lang: string = 'pt';

  languageOptions = [
    { value: 'pt', label: 'Português', flag: 'assets/pt-flag.png' },
    { value: 'en', label: 'English', flag: 'assets/en-flag.png' },
  ];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loadWeatherData();
  }

  ngAfterViewInit() {
    const dropdownElement = document.getElementById('languageDropdown');
    if (dropdownElement) {
      new bootstrap.Dropdown(dropdownElement);
    }
  }

  loadWeatherData() {
    this.weatherService
      .getWeatherForecast(
        this.pageSize,
        this.page,
        this.cityFilter,
        this.dateFilter,
        this.lang
      )
      .subscribe((data) => {
        this.forecasts = data;
      });
  }

  updatePageSize(size: number) {
    this.pageSize = size;
    this.loadWeatherData();
  }

  changePage(page: number) {
    this.page = page;
    this.loadWeatherData();
  }

  changeLanguage(lang: string) {
    this.lang = lang;
    this.loadWeatherData();
  }

  onCityFilterChange(cityFilter: string) {
    this.cityFilter = cityFilter;
    this.loadWeatherData(); // Recarrega os dados ao mudar o filtro
  }

  onDateFilterChange(dateFilter: string) {
    this.dateFilter = dateFilter;
    this.loadWeatherData(); // Recarrega os dados ao mudar o filtro
  }

  getFlagUrl(lang: string): string {
    const selectedOption = this.languageOptions.find(
      (option) => option.value === lang
    );
    return selectedOption ? selectedOption.flag : '';
  }

  getLanguageName(lang: string): string {
    const selectedOption = this.languageOptions.find(
      (option) => option.value === lang
    );
    return selectedOption ? selectedOption.label : '';
  }
}
