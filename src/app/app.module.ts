import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderPedidoComponent } from './components/header-pedido/header-pedido.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { ListadoTipoSolicitudComponent } from './components/listado-tipo-solicitud/listado-tipo-solicitud.component';
import { AgregaMotivoComponent } from './components/agrega-motivo/agrega-motivo.component';
import { AvisosComponent } from './components/avisos/avisos.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { StoreModule } from '@ngrx/store';
import { FilterPipe } from './pipes/filter.pipe';

import { SearchPipe } from './pipes/search.pipe';
import { AgregarPipe } from './pipes/agregar.pipe';
import { MotivoDesabasto } from './components/motivo-desabasto/motivo-desabasto.component';
import { SearchComponent } from './components/listado-tipo-solicitud/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BusquedaAvanzadaPipe } from './pipes/busqueda-avanzada.pipe';
import { SecurityInterceptor } from './interceptors/security.interceptor';
//Angular material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input';
import { CapturaArticulos } from './components/captura-articulos/captura-articulos.component';
import { DataService } from './services/datos.service';
import { ResumenAbasto } from './components/resumen-abasto/resumen-abasto.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderPedidoComponent,
    DetallePedidoComponent,
    MotivoDesabasto,
    ListadoTipoSolicitudComponent,
    CapturaArticulos,
    ResumenAbasto,
    AgregaMotivoComponent,
    AvisosComponent,
    MensajeComponent,
    FilterPipe,
    SearchPipe,
    AgregarPipe,
    SearchComponent,
    BusquedaAvanzadaPipe,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,    
    FormsModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    NgxSpinnerModule
    
  ],  
  providers: [DataService
  // , {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: SecurityInterceptor,
  //   multi: true

  //  }
  
  
  
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
