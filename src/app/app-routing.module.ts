import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { PiecesComponent } from './pieces/pieces.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pieces', component: PiecesComponent },
  { path: 'movimientos', component: MovimientosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
