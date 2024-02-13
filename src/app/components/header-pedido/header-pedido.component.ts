import { Component,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/datos.service';
import { apiUserService } from 'src/app/services/apiUser.service';
import { DOCUMENT } from '@angular/common';
import { GlobalComponent } from 'src/app/global-component';
import { ConstantesUrl } from 'src/app/global-variables';


@Component({
  selector: 'app-header-pedido',
  templateUrl: './header-pedido.component.html',
  styleUrls: ['./header-pedido.component.css']
})
export class HeaderPedidoComponent {
  urlAzure=ConstantesUrl.apiAzure;
  urlApiOxxo=ConstantesUrl.apiOxxo;
  data: any[] = [];
  encabezadosPedido: any[] = [];
  public appid: any;
  public encript: any;
  public crTienda: string;
  public crPlaza: string;
  container: any;
  public idEmpleado:string;
  public employeeId: any;
  constructor(private router: Router,
    @Inject(DOCUMENT) document: any,
    private http: HttpClient, private dataService: DataService,
    private apiService: apiUserService) {
      GlobalComponent.obtenerParametros(document.location.href);
      this.appid=GlobalComponent.appId;
      this.encript=GlobalComponent.encrypt;

    
      this.apiService.getUserInformation()
      .subscribe(resp => {
       // console.log("Constulando id Empleado "+  resp.user?.employeeId);
       
      this.employeeId= resp.user?.userId;
      
        this.apiService.getUsuariosDate(this.employeeId)
          .subscribe(resp => {
             
           this.crTienda=resp.crTienda;
          this.crPlaza=resp.crPlaza;
          console.log("####"+this.crTienda)
          console.log("####"+this.crPlaza)
        this.resumenPedido(this.crTienda,this.crPlaza);
          }
          );
      }
      );

     }

  ngOnInit() {

    }


  resumenPedido(crTienda:string,crPlaza:string){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("ApiKey", "9Aat483#PF%60C#pllWO70@4zYMfm8egZ0w");
    console.log("entro en ")

    this.apiService.getResumenPedidos(crTienda,crPlaza)
      .subscribe((response) => {
        if (response === null) {
          console.log("sin nada q mostrar")
          console.error('no hay inforamcion q mostar');
          const errorMessage = document.createElement('h1');
          errorMessage.textContent = `No hay pedidos que Mostrar...`;
          this.container = document.querySelector('.errorAvisos');
          this.container.appendChild(errorMessage);
        } else {
          this.data = response;
        }
      }


      )
  }

  consultarDetalle(parametro: string) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("ApiKey", "9Aat483#PF%60C#pllWO70@4zYMfm8egZ0w");

    var raw = JSON.stringify({
      "NoTransferencia": parametro
    });

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw
    };
    fetch(this.urlAzure+"/Pedidos/detailTsf" + '?' + new URLSearchParams({

      NoTransferencia: parametro
    }))
      .then(resultadoRaw => {
        return resultadoRaw.json();
      }).then(resultadoDecodificado => {
        this.encabezadosPedido = resultadoDecodificado;
        console.log(this.encabezadosPedido);
      }).catch(error => console.log('error', error));


    for (let i = 0; i <= this.data.length - 1; i++) {
      let iteracion = this.data[i];
      let idAvisoFor = iteracion.idAviso;
      let fromIdFor = iteracion.fromId;
      let toId = iteracion.toId;
      let tituloAvisoFor = iteracion.tituloAviso;
      let descripcionAvisoFor = iteracion.descripcionAviso;
      let prioridadAvisoFor = iteracion.prioridadAviso;
      let tipoAvisoFor = iteracion.tipoAviso;
      let fechaAvisoFor = iteracion.fechaAviso;


    }
  }

  regresarHome() {
    this.router.navigate(['home'],
      {
        queryParams: {
          appId: this.appid,
          encrypt: this.encript
        }
      });
  }

}
