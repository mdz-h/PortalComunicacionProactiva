import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent {
  constructor(private router: Router) { }

  regresarHome(){
    this.router.navigate(['home']);
  }

  regresarHeader(){
    this.router.navigate(['headerPedido']);
  }
}
