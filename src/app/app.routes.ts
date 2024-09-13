import { Routes } from '@angular/router';
import { FinanceMapComponent } from './finance-map/finance-map.component';


export const routes: Routes = [
    {path: 'finance-map', component:FinanceMapComponent},
    {path: '', redirectTo: 'finance-map', pathMatch:'full'}
];
