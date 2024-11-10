import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() lang: string = 'pt';
  @Input() languageOptions: { value: string; label: string; flag: string }[] =
    [];
  @Output() languageChanged = new EventEmitter<string>();

  constructor(private translationService: TranslationService) {}

  changeLanguage(lang: string) {
    this.translationService.changeLanguage(lang);
    this.languageChanged.emit(lang);
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
