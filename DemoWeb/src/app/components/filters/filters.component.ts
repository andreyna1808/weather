import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Input() cityFilter: string = '';
  @Input() dateFilter: string = '';

  @Output() cityFilterChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateFilterChange: EventEmitter<string> = new EventEmitter<string>();

  onCityFilterChange() {
    this.cityFilterChange.emit(this.cityFilter);
  }

  onDateFilterChange() {
    this.dateFilterChange.emit(this.dateFilter);
  }
}
