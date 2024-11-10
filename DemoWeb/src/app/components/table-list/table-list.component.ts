import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit {
  @Input() forecasts: any[] = [];
  translations: any = {};

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.translations$.subscribe((translations) => {
      this.translations = translations;
    });
  }
}
