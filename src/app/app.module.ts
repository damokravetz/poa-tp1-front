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
import { MatInputModule  } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { PiecesService } from './pieces/pieces.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TransferStockDialog } from './dialogs/transfer-stock-dialog/transfer-stock-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MovimientosService } from './movimientos/movimientos.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PiecesComponent,
    MovimientosComponent,
    TransferStockDialog
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
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [PiecesService, MovimientosService, MatDatepickerModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
