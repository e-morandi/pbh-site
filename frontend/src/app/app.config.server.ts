import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { provideRouter } from '@angular/router';
import { serverRoutes } from './app.routes.server';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideRouter(routes),
    provideHttpClient(),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
