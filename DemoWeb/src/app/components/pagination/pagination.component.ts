import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() pageSize: number = 5;
  @Input() totalRecords: number = 30;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

  changePage(newPage: number) {
    this.pageChange.emit(newPage);
  }

  updatePageSize(size: number) {
    this.pageSize = size;
    this.pageSizeChange.emit(this.pageSize);
  }
}
