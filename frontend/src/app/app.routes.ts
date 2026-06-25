/* ROUTES FOR PAGE ROUTING */
import { Routes } from '@angular/router';
import { HomePage } from './features/pages/home-page/home-page';
import { RequestServicePage } from './features/pages/request-service-page/request-service-page';
import { AboutPage } from './features/pages/about-page/about-page';

export const routes: Routes = [
    /* Routes in here in form of 
        {path: '', component: }
    */
   {path: '',
    component: HomePage,
   },
   {
    path: 'request-service',
    component: RequestServicePage,
   },
   {
    path: 'about-page',
    component: AboutPage,
   },
];
