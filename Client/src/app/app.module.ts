import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { UserTableComponent } from './user-table/user-table.component';
import { CollapseModule } from 'ngx-bootstrap/collapse'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserCreatorComponent } from './user-creator/user-creator.component';
import {MatRadioModule} from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserTableComponent,
    UserCreatorComponent,
    PageNotFoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatRadioModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    CollapseModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    ChartsModule,
    MatToolbarModule
  ],
  entryComponents:[
    UserCreatorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
