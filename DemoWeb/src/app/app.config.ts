import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Habilitar detecção de mudanças com coalescência de eventos
    provideRouter(routes), // Configura as rotas
    provideHttpClient(), // Configura o HttpClient para uso global
  ],
};
