import { ApplicationConfig, LOCALE_ID, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), { provide: LOCALE_ID, useValue: 'fr-FR' }, provideHttpClient(withInterceptorsFromDi())],
};
