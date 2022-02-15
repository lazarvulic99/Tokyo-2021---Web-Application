import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelegatComponent } from './delegat/delegat.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { VodjaComponent } from './vodja/vodja.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'prijava', component: PrijavaComponent},
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'promenaLozinke', component: PromenaLozinkeComponent},
  {path: 'organizator', component: OrganizatorComponent},
  {path: 'delegat', component: DelegatComponent},
  {path: 'vodja', component: VodjaComponent},
  {path: '**', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
