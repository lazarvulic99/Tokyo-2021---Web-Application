import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { DelegatComponent } from './delegat/delegat.component';
import { VodjaComponent } from './vodja/vodja.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    PromenaLozinkeComponent,
    RegistracijaComponent,
    HomepageComponent,
    OrganizatorComponent,
    DelegatComponent,
    VodjaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
