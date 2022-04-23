import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { AuthGuard } from './auth/auth.guard';
import { ClientiComponent } from './components/clienti/clienti.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { NuovoClienteComponent } from './components/clienti/nuovo-cliente/nuovo-cliente.component';
import { ModificaClienteComponent } from './components/clienti/modifica-cliente/modifica-cliente.component';
import { DettaglioComponent } from './components/fatture/dettaglio/dettaglio.component';
import { FattureClientiComponent } from './components/fatture/fatture-clienti/fatture-clienti.component';
import { NuovaFatturaComponent } from './components/fatture/nuova-fattura/nuova-fattura.component';
import { ParallaxDirective } from './common/parallax.directive';


// import { LoginComponent } from './auth/login/login.component';
// import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'utenti', component: UtentiComponent, canActivate:[AuthGuard] },
  { path: 'clienti', component: ClientiComponent, canActivate:[AuthGuard] },
  { path: 'fatture', component: FattureComponent, canActivate:[AuthGuard] },
  { path: 'nuovo-cliente', component: NuovoClienteComponent },
  { path: 'modifica-cliente/:id', component: ModificaClienteComponent },
  { path: 'fatture/:id', component: DettaglioComponent },
  { path: 'fatture/cliente/:id', component: FattureClientiComponent },
  { path: 'nuova-fattura/:id/:idCliente', component: NuovaFatturaComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UtentiComponent,
    ClientiComponent,
    FattureComponent,
    NuovoClienteComponent,
    ModificaClienteComponent,
    DettaglioComponent,
    FattureClientiComponent,
    NuovaFatturaComponent,
    ParallaxDirective

    // LoginComponent,
    // SignupComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
