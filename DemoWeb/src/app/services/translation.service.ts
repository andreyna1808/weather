import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('pt');
  private translations = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLang.value);
  }

  changeLanguage(lang: string) {
    this.currentLang.next(lang);
    this.loadTranslations(lang);
  }

  get currentLanguage() {
    return this.currentLang.asObservable();
  }

  get translations$() {
    return this.translations.asObservable();
  }

  private loadTranslations(lang: string) {
    const filePath = `assets/i18n/${lang}.json`;
    this.http.get(filePath).subscribe(
      (translations) => {
        this.translations.next(translations);
      },
      (error) => {
        console.error(`Erro ao carregar as traduções de ${lang}:`, error);
      }
    );
  }
}
