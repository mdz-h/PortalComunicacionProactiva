import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderPedidoComponent } from './components/header-pedido/header-pedido.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { ListadoTipoSolicitudComponent } from './components/listado-tipo-solicitud/listado-tipo-solicitud.component';
import { AgregaMotivoComponent } from './components/agrega-motivo/agrega-motivo.component';

import { MensajeComponent } from './components/mensaje/mensaje.component';
import { MotivoDesabasto } from './components/motivo-desabasto/motivo-desabasto.component';
import { CapturaArticulos } from './components/captura-articulos/captura-articulos.component';
import { ResumenAbasto } from './components/resumen-abasto/resumen-abasto.component';
import { AvisosComponent } from './components/avisos/avisos.component';
import { UnauthorizedUserViewComponent } from './views/unauthorized-user-view/unauthorized-user-view.component';

import { UnauthorizedAccessViewComponent } from './views/unauthorized-access-view/unauthorized-access-view.component';
import { UnauthorizedServerViewComponent } from './views/unauthorized-credential-view/unauthorized-server-view.component';

// Rutas de navegacion
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  { path: 'home', component: HomeComponent },
  { path: 'headerPedido', component: HeaderPedidoComponent },
  { path: 'detallePedido', component: DetallePedidoComponent },
  { path: 'listado', component: ListadoTipoSolicitudComponent},
  { path: 'agregarMotivo', component:AgregaMotivoComponent},
  { path: 'avisos', component:AvisosComponent},
  { path: 'mensaje', component:MensajeComponent},
  { path: 'motivoDesabasto', component:MotivoDesabasto},
  { path: 'capturaArticulos', component:CapturaArticulos},
  { path: 'resumenAbasto', component:ResumenAbasto},
   
    {
      path: 'unauthorized-user',component:UnauthorizedUserViewComponent
     
    },
    {
      path: 'unauthorized-server',component:UnauthorizedServerViewComponent
     
    },
    {
      path: 'unauthorized-access',component:UnauthorizedAccessViewComponent
     
    }
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }