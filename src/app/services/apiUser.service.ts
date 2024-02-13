// Importamos la libreria necesaria para que los servicios puedan ser usados en Angular medainte la inyección de dependencias
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserInformationInterface } from '../models/user-information.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { DataService } from './datos.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { GlobalComponent } from '../global-component';
import { ConstantesUrl } from '../global-variables';


//*
//@Autor HJMB
// Usamos el decorator que le indica a Angular que esta clase podrá ser injectada en cualquier parte del proyecto
@Injectable({
  providedIn: 'root',
})
// Creamos la clase para nuestro servicio
export class apiUserService {

  appId = GlobalComponent.appId;
  encrypt = GlobalComponent.encrypt;

  urlAzure=ConstantesUrl.apiAzure;
  urlApiOxxo=ConstantesUrl.apiOxxo;
  container: any;

  constructor(@Inject(DOCUMENT) document: any, private httpClient: HttpClient,
    private router: Router,
    private dataService: DataService) {
    GlobalComponent.obtenerParametros(document.location.href);
    this.appId = GlobalComponent.appId;
    this.encrypt = GlobalComponent.encrypt;
  }

  getUserInformation(): Observable<UserInformationInterface> {

    let params = new HttpParams();
    params = params.append('appId', this.appId);
    params = params.append('encrypt', this.encrypt);


    const requestOptions: Object = {


      params: params

    };
    return this.httpClient.get<UserInformationInterface>(this.urlApiOxxo+'/userapi/api/user/', requestOptions)
      .pipe(

        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {

           //this.router.navigate(['unauthorized-user'])
          } else if (error.status == 401) {
         // this.router.navigate(['unauthorized-user']);
            console.error('Las credenciales no son validas o caducaron', 'Credentiales incorrectas');
          } else if (error.status === 403) {
           // console.error('403 Forbidden' + error.message);
          }
          else if (error.status === 503 || error.status === 504) {
           //this.router.navigate(['unauthorized-server']);
            console.error('Error en el Servidor', 'No hay conexion');

          }
          return throwError(error.message);
        }))
  }


  getUsuariosDate(idEmpleado: string): Observable<any> {

    let params = new HttpParams().set('idEmpleado', idEmpleado);

    const optionsUser = {
      headers: new HttpHeaders({
        'ApiKey': '9Aat483#PF%60C#pllWO70@4zYMfm8egZ0w'

      }),
      params: params
    };

    return this.httpClient.get(this.urlAzure+'/Usuarios/consultadatosUsuario/',
      optionsUser).pipe(
        catchError((error: HttpErrorResponse) => {

          if (error.status === 0) {

           this.router.navigate(['unauthorized-user'])
          }
          else if (error.status == 400) {
 this.router.navigate(['unauthorized-user']);
            console.error('Las credenciales no son validas o caducaron', 'Credentiales incorrectas');
          } else if (error.status == 401) {
          //this.router.navigate(['unauthorized-user']);
            console.error('Las credenciales no son validas o caducaron', 'Credentiales incorrectas');
          } else if (error.status === 403) {
            console.error('403 Forbidden' + error.message);
          }
          else if (error.status === 503 || error.status === 504) {
          this.router.navigate(['unauthorized-server']);
            console.error('Error en el Servidor', 'No hay conexion');

          }
          return throwError(error);
        })

      )

  }
  /////prueba a...........
  getUserOrigin(): Observable<any[]> {

    let params = new HttpParams();
    params = params.append('appId', this.appId);
    params = params.append('encrypt', this.encrypt);
    params=params.append('tableInfoConsult','XX_CNT_CPA_EMPOREDADACEDIS_V')


    const requestOptions: Object = {


      params: params

    };
    return this.httpClient.get<any[]>(this.urlApiOxxo+'/tiendasapi/tiendas/views/', requestOptions)
      .pipe(

        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {

this.router.navigate(['unauthorized-user'])
          } else if (error.status == 401) {
          // this.router.navigate(['unauthorized-user']);
            console.error('Las credenciales no son validas o caducaron', 'Credentiales incorrectas');

          } else if (error.status === 403) {
            console.error('403 Forbidden' + error.message);
          } else if (error.status === 503 || error.status === 504) {
           this.router.navigate(['unauthorized-server']);
            console.error('Error en el Servidor', 'No hay conexion');

          }
          return throwError(error.message);
        }))
  }

  getResumenPedidos(tiendaCve: string, crPlaza: string): Observable<any[]> {


    let params = new HttpParams();
    params = params.append('PlazaCve', crPlaza);
    params = params.append('TiendaCve', tiendaCve);

       const optionsUser = {
      headers: new HttpHeaders({
        'ApiKey': '9Aat483#PF%60C#pllWO70@4zYMfm8egZ0w'

      }),
      params: params
    };

    const requestOptions: Object = {
      params: params
    };
    return this.httpClient.get<any[]>(this.urlAzure+'/Pedidos/headTsf', requestOptions)
      .pipe(

        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {

            const errorMessage = document.createElement('h3');
            errorMessage.textContent = `Computadora sin conexi�n`;
            this.container = document.querySelector('.errorAvisos');
            this.container.appendChild(errorMessage);
          } else if (error.status === 503 || error.status === 504 || error.status === 500) {
            const errorMessage = document.createElement('h3');
            errorMessage.textContent = `Error en el Servidor, Vuelva a intentarlo mas tarde`;
            this.container = document.querySelector('.errorAvisos');
            this.container.appendChild(errorMessage);
            console.error('Error en el Servidor', 'No hay conexion');

          }
          return throwError(error.message);
        }))
  }

  getAvisosTienda(crPlza: string, tiendaCve: string,plazaE:string): Observable<any[]> {
    

    let params = new HttpParams();
    params.append('crRegion', crPlza);
    params.append('PlazaEmpoderada', crPlza);
    params.append('crTienda', tiendaCve);

       const optionsUser = {
      headers: new HttpHeaders({
        'ApiKey': '9Aat483#PF%60C#pllWO70@4zYMfm8egZ0w'

      }),
      params: params
    };
    const requestOptions: Object = {
      params: params
    };
  
    return this.httpClient.get<any[]>(this.urlAzure+"/Avisos/consultarAvisosTienda?crRegion="+crPlza+"&PlazaEmpoderada="+plazaE+"&crTienda="+tiendaCve)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {

            const errorMessage = document.createElement('h3');
            errorMessage.textContent = `Computadora sin conexi�n`;
            this.container = document.querySelector('.errorAvisos');
            this.container.appendChild(errorMessage);
          } else if (error.status === 503 || error.status === 504 || error.status === 500 ) {
            const errorMessage = document.createElement('h3');
            errorMessage.textContent = `Error en el Servidor, Vuelva a intentarlo mas tarde`;
            this.container = document.querySelector('.errorAvisos');
            this.container.appendChild(errorMessage);
            console.error('Error en el Servidor', 'No hay conexion');

          }
          return throwError(error.message);
        })
        
        )
  }





getTiendasApi(): Observable<any[]>{

  let params = new HttpParams();
  params = params.append('appId', this.appId);
  params = params.append('encrypt', this.encrypt);
  params=params.append('tableInfoConsult','XX_CNT_CPA_V')


  const requestOptions: Object = {


    params: params

  };
  return this.httpClient.get<any[]>(this.urlApiOxxo+'/tiendasapi/tiendas/views/', requestOptions)
    .pipe(

      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {

this.router.navigate(['unauthorized-user'])
        } else if (error.status == 401) {
       // this.router.navigate(['unauthorized-user']);
          console.error('Las credenciales no son validas o caducaron', 'Credentiales incorrectas');

        } else if (error.status === 403) {
          console.error('403 Forbidden' + error.message);
        } else if (error.status === 503 || error.status === 504) {
        this.router.navigate(['unauthorized-server']);
          console.error('Error en el Servidor', 'No hay conexion');

        }
        return throwError(error.message);
      }))


}
_nombreEvento:number
productoItem(nombreEvento:string): Observable<any[]>{

  // console.log("entro en peticion");
  
  let params = new HttpParams().set('item', nombreEvento);

  const requestOptions: Object = {


    params: params

  };

  return this.httpClient.get<any[]>(this.urlAzure+'/Productos/productForItem', requestOptions)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {

this.router.navigate(['unauthorized-user'])
        } else if (error.status == 400) {
       // this.router.navigate(['unauthorized-user']);
          console.error('Producto No existente');

         } else if (error.status === 503 || error.status === 504 || error.status===500) {
       
          console.error('Error en el Servidor', 'No hay conexion');

        }
        return throwError(error.message);
      }))


}
}