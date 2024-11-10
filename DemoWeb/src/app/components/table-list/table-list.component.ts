import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
})
export class TableListComponent {
  @Input() forecasts: any[] = [];

  constructor(private datePipe: DatePipe) {}
}
