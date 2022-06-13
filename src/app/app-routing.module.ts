import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PiecesComponent } from './pieces/pieces.component';
import { PlacesComponent } from './places/places.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'pieces', component: PiecesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
