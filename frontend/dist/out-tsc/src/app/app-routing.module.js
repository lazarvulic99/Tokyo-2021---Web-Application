import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DelegatComponent } from './delegat/delegat.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { VodjaComponent } from './vodja/vodja.component';
const routes = [
    { path: '', component: HomepageComponent },
    { path: 'prijava', component: PrijavaComponent },
    { path: 'registracija', component: RegistracijaComponent },
    { path: 'promenaLozinke', component: PromenaLozinkeComponent },
    { path: 'organizator', component: OrganizatorComponent },
    { path: 'delegat', component: DelegatComponent },
    { path: 'vodja', component: VodjaComponent },
    { path: '**', component: HomepageComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map