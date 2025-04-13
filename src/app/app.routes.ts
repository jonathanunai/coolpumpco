import { Route } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PumpDetailsComponent } from './components/pump-details/pump-details.component';

export const routes: Route[] = [
  { path: '', component: MainComponent },
  { path: 'pump/:id', component: PumpDetailsComponent }
];
