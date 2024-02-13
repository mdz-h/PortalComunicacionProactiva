import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { GlobalComponent } from '../../global-component';


import { createAction, props } from '@ngrx/store';
import { DataService } from '../../services/datos.service';

import { SecurityInterface } from '../../models/security.interface';
import { apiUserService } from 'src/app/services/apiUser.service';
import { DOCUMENT } from '@angular/common'
import { ConstantesUrl } from 'src/app/global-variables';


export const loadSecurity = createAction('[SECURITY] Load', props<SecurityInterface>());
/**
 * Class home que autoriza si es Lider o lider de cuadrilla
 * asi dependiendo autoriza si puede acceder a los diferentes
 * modulos del sistema.
 * @param {string} type : User roles
 * @return {string} type: roles
 ** @autor  HJMB
 * 
 */


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public urlSearchParams: any;
  appId = GlobalComponent.appId;
  encrypt = GlobalComponent.encrypt;
  urlAzure=ConstantesUrl.apiAzure;
  urlApiOxxo=ConstantesUrl.apiOxxo;
  public response: any;
  public employeeId: any;
  public jsonCompleto:any[];
  public crTienda:string;
  public url:any;
  arrTienda:any[] =[];
  regionTienda: any;
  reteKid:number;
  constructor(
    @Inject(DOCUMENT) document: any,
    private httpClient: HttpClient,
    private router: Router,
    private dataService: DataService,
    private apiService: apiUserService) {
      GlobalComponent.obtenerParametros(document.location.href);
     this.appId=GlobalComponent.appId;
     this.encrypt=GlobalComponent.encrypt;

    
     }

  ngOnInit() {
      
   this.url=this.urlApiOxxo+"/AccessControl/pages/login_form.jsf"
   
    //Descomentar para funcionamiento de access control
    this.apiInterceptor();

  }
/**
 * metodo  que consume api user y api Usuarios
 * @param { string} type: appId encript
 * @return {string} type: roles lideres
 * @autor  HJMB 
 */
  apiInterceptor() {
  
        
   this.apiService.getUserInformation()
      .subscribe(resp => {
                      
      
       
     this.employeeId= resp.user?.userId;
    
      this.apiService.getUsuariosDate(this.employeeId)
          .subscribe(resp => {
           this.dataService.SetUsuariosVariables(   resp.crTienda,resp.crPlaza);
           this.crTienda=resp.crTienda;
            if (resp.descripcionRol === "Líder" || resp.descripcionRol === "Líder Cuadrilla") {
             //** no realiza nada  */
            } else {
              /** si no  es Lider o  Lider de cuadrilla se redirecciona a login access control */
          this.router.navigate(['/unauthorized-access'])
            }
          }
          );
      }
     );

  }

  /**
   * navegacion por los diferentes modulos
   * @param {string} type: url 
  * @autor  HJMB
   */
  visibilidadAvisos() {
    this.router.navigate(['headerPedido'],
    {
      queryParams:{
      appId: this.appId,
      encrypt:this.encrypt
    }}
    );
  }
  listadoTipoSolicitud() {
    this.router.navigate(['listado'],
    {
      queryParams:{
      appId: this.appId,
      encrypt:this.encrypt
    }}
    );
  }

  avisos() {
    this.router.navigate(['avisos'],
    {
      queryParams:{
      appId: this.appId,
      encrypt:this.encrypt
    }}
    );
  }

/** Url para access control  */
  regresarAC() {
    this.router.navigate(['https://fcportalqa.femcom.net:8443/AccessControl/pages/login_form.jsf']);
  }


}
