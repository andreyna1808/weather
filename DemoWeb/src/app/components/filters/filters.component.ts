import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() cityFilter: string = '';
  @Input() dateFilter: string = '';
  translations: any = {};
  cityFilterPlaceholder: string = '';

  constructor(private translationService: TranslationService) {}

  @Output() cityFilterChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateFilterChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.translationService.translations$.subscribe((translations) => {
      this.translations = translations;
      this.cityFilterPlaceholder =
        this.translations?.filterByCity || 'Filtrar por cidade';
    });
  }

  onCityFilterChange() {
    this.cityFilterChange.emit(this.cityFilter);
  }

  onDateFilterChange() {
    this.dateFilterChange.emit(this.dateFilter);
  }
}
