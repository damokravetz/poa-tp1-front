import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { PiecesComponent } from './pieces/pieces.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule  } from '@angular/material/select';
import { MatFormFieldModule  } from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { PiecesService } from './pieces/pieces.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PiecesComponent,
    MovimientosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule, 
    MatMenuModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [PiecesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
