import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'Portal_Abasto';
  urlSearchParams: any;

  constructor(private router: Router) { }
 
  home(){
    this.router.navigate(['/home']);
    
  }
  avisos(){
    this.router.navigate(['/avisos']);
  }
  pedidos(){
    this.router.navigate(['/headerPedido']);
  }
  solicitud(){
    this.router.navigate(['/listado']);
  }
  nuevaSolicitud(){
    this.router.navigate(['/agregarMotivo']);
  }
  
  
  ngOnInit() {
   
  




  }




   
  



}
