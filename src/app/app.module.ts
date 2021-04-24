import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListaClientesComponent,
    CadastroClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
