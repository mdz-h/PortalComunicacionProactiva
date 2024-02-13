import { Component,  OnInit,Output,EventEmitter, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../../services/datos.service';
import { GlobalComponent } from 'src/app/global-component';
import { DOCUMENT } from '@angular/common';
import { ConstantesUrl } from 'src/app/global-variables';

@Component({
  selector: 'app-listado-tipo-solicitud',
  templateUrl: './listado-tipo-solicitud.component.html',
  styleUrls: ['./listado-tipo-solicitud.component.css']
})
export class ListadoTipoSolicitudComponent implements OnInit{
  apiKey='9Aat483#PF%60C#pllWO70@4zYMfm8egZ0w';
  public mensajeError:String;
  data:any= [];
  public appId: any;
  public encrypt: any;
  container: any;

  urlAzure=ConstantesUrl.apiAzure;
  urlApiOxxo=ConstantesUrl.apiOxxo;

  //Variable a Emmitir a Motivo-desabasto.component.ts
  @Output() mensaje: EventEmitter<string>;

  constructor(private http: HttpClient, private router: Router,
    @Inject(DOCUMENT) document: any,private dataService:DataService) { 
    // Inicializamos la emicion de eventos
       this.mensaje= new EventEmitter();
       GlobalComponent.obtenerParametros(document.location.href);
       this.appId=GlobalComponent.appId;
       this.encrypt=GlobalComponent.encrypt;

  }


  public _nombreEvento: string;
  public get nombreEvento(): string {
    return this._nombreEvento;
  }
  public set nombreEvento(value: string) {
    this._nombreEvento = this._nombreEvento;
  }

 
  capturar() {
   // console.log(this._nombreEvento);


  } 
  
  // filtro al buscar  
handleSearch(value:string){
 
  this.filtro_value=value;

}

filtro_value='';


ngOnInit(){
 let headers = new HttpHeaders();

 headers=headers.set('ApiKey',this.apiKey)



  this.http.get<any[]>(this.urlAzure+'/Pedidos/motivosDesabasto')
      .subscribe(
        (lista: any[]) => {
          // console.log("entrando a peticion motivos");
          
          this.data=lista
          // console.log(JSON.stringify(this.data))
        },

        err => {

         this.mensajeError=err.message;
          // window.alert("Error al cargar los datos")
          console.error("error al obtner los datos ")
          console.log(err.message)
          const errorMessage = document.createElement('h3');
          errorMessage.textContent = `Computadora sin conexión`;
          const errorMessage2 = document.createElement('h6');
          errorMessage2.textContent = `Asegurate de que tu computadora tenga una conexión activa y estable. Las causas pueden ser:`;
          const errorMessage3 = document.createElement('li');
          errorMessage3.textContent = `Que no existan datos para mostrar en la base de datos.`;
          const errorMessage4 = document.createElement('li');
          errorMessage4.textContent = `Tú conexión sea erronea o inestable.`;
          this.container = document.querySelector('.errorAvisos');
          this.container.appendChild(errorMessage);
          this.container.appendChild(errorMessage2);
          this.container.appendChild(errorMessage3);
          this.container.appendChild(errorMessage4);
          this.container.className = "errorAvisosStilo card card-body";
        }
 
      )
      
}
continuarMotivo(){

  //  console.log("enviando a isMotivo: "+this._nombreEvento);
   this.dataService.setIdMotivo(this._nombreEvento);
   this.continuar();


}

//botones de navegacion de la pagina 
  agregarMotivo(){
    this.router.navigate(['agregarMotivo'],
    {
      queryParams:{
      appId: this.appId,
      encrypt:this.encrypt
    }}
    );
  }
  volver(){
    this.router.navigate(['home'],
    {
      queryParams:{
      appId: this.appId,
      encrypt:this.encrypt
    }}
    );

  }
  continuar(){
    this.router.navigate(['motivoDesabasto'],
    {
      queryParams:{
      appId: this.appId,
      encrypt:this.encrypt
    }}
    );
  }
}
