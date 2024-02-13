import { Component, OnInit, Inject } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { select } from '@ngrx/store';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/datos.service';
import { GlobalComponent } from '../../global-component';
import { ConstantesUrl } from 'src/app/global-variables'; 
import { apiUserService } from 'src/app/services/apiUser.service';
import { DOCUMENT } from '@angular/common';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {

  form:FormGroup= new FormGroup({

    asunto: new FormControl(''),
    priridad: new FormControl(''),
    comentarios: new FormControl('')
});
summmitted=false;

get f(): { [key: string]: AbstractControl } {
  return this.form.controls;
}



  public crTienda: string;
  public idEmpleado: string;
  public crPlaza: string;
  fullName = GlobalComponent.fullname;
  perfil = GlobalComponent.userPerfil;
  dataUser: any;
  plazaUser: string;
  cedisUser: string;
  public appId: any;
  public encrypt: any;
  public url: any;
  filterpost = '';
  filterAsunto = '';
  filterFecha = '';
  asuntoBA: string;
  articuloBA: string;
  categoriaBA: string;
  subgrupoBA: string;
  cedisBA: string;
  result: any;

  filterCalendario = '';
  filterArticulo = '';
  filterCategoria = '';
  filterSubgrupo = '';
  filterCedis = '';
  filterCalendario2 = '';
  posts: any[] = [];
  data: any[] = [];
  idLista: any[] = [];
  datos;

  opcionSeleccionado: string;
  opcionSeleccionadoPlaza: string;
  mostrar = true;
  mostrar2 = true;
  mostrarProlongado = true;
  mostrarDestacado = true;
  _idAviso: string;
  _fromId: string;
  _toId: any;
  _tituloAviso= '';
  _descripcionAviso = '';
  _prioridadAviso: number;
  _tipoAviso: number;
  _fechaAviso: string;
  _entrada: string;
  _bandera: number;
  _id: number;
  _filterCalendario2: string;
  _idAvisoLeer: string;
  _fromIdLeer: string;
  _toIdLeer: string;
  _tituloAvisoLeer: string;
  _descripcionAvisoLeer: string;
  _prioridadAvisoLeer: number;
  _tipoAvisoLeer: number;
  _fechaAvisoLeer: string;
  _fechaInicioVigencia: string;
  _fechaFinVigencia: string;
  _fechaInicioVigLeer: string;
  _fechaFinVigLeer: string;
  container: any;
  errorMessage: any;
  errorMessage2: any;
  errorMessage3: any;

  mensajeExito: string;
  modalEnvio: any;
  idRegion: string;
  distritos: any[] = [];
  regionesCedis: any[] = [];
  seleccionTienda: number;
  tienda: any[] = [];
  tiendasStr: string = "";
  region: any;
  activarCampo = false;
  filtroCategoria: string;
  resultado!: string;
  filtroNoLeidos: number;
  regionesAll: any[] = [];
  _toIdJefe: any;
  ArrResponsable: any[] = [];
  ArrJefes: any[] = [];
  public employeeId: any;
  regionTienda: any;
  arrTienda:any[] =[];
  plazaE:string;
  urlAzure=ConstantesUrl.apiAzure;
  urlApiOxxo=ConstantesUrl.apiOxxo;
  constructor(private http: HttpClient, @Inject(DOCUMENT) document: any,
    private dataService: DataService, private router: Router,private formBuilder: FormBuilder,
     private apiService: apiUserService) {
    this.datos = [1, 2, 3];
    GlobalComponent.obtenerParametros(document.location.href);
    this.appId = GlobalComponent.appId;
    this.encrypt = GlobalComponent.encrypt;


  //  this.avisosTienda2('10MON', '50KKN', '192',);

    this.apiService.getUserInformation()
      .subscribe(resp => {
      
        this.employeeId = resp.user?.userId;

        this.apiService.getUsuariosDate(this.employeeId)
       // this.apiService.getUsuariosDate("300")
          .subscribe(resp => {
            this.crTienda = resp.crTienda;
            this.idEmpleado = resp.idEmpleado;
            this.crPlaza = resp.crPlaza;
           
            ///Aplicando filtro para obtener tienda PLAZAE 
            //
            this.apiService.getTiendasApi().subscribe(resp => {

              for (let l = 0; l <= resp.length - 1; l++) {
                if (resp[l].CR_TIENDA == this.crTienda && resp[l].CR_REGION == this.crPlaza) {
                  this.arrTienda.push(resp[l]);
                 
                }

              }
              this.regionTienda = this.arrTienda;
              this.plazaE = this.regionTienda[0].PLAZAE;

              this.avisosTienda2(this.crPlaza, this.crTienda, this.plazaE);

              this.apiService.getUserOrigin().subscribe(
                resp => {
                 
                  for (let l = 0; l <= resp.length - 1; l++) {
                    if (resp[l].CRPLAZA == this.crPlaza) {
                      this.ArrResponsable.push(resp[l]);
                    
                    }

                  }
                  this.regionTienda = this.ArrResponsable[1];


                })

            })


          }
          );
      }
      );

  }

  ngOnInit() {
    //**********url Home*** */
    this.url = "home" + "?" + "appId" + "=" + this.appId + "&" + "encrypt" + "=" + this.encrypt;

    // Validacion de Formulario Modal Redatar Aviso
    //Validacion  ##Pendiente##
    this.form = this.formBuilder.group(
      {
       asunto: [
        '',
        [
          Validators.required
        ]
    
       ]
    
      }
    )
    
  }

  disebledValidation(){
    this._tituloAviso='';
    this._descripcionAviso=''
  }


  activarVigencia() {
    this.activarCampo = !this.activarCampo;
    if(this.activarCampo==false){
      this._fechaInicioVigencia='';
      this._fechaFinVigencia='';
    }
  }

  cambiarEstatusLeido(idAvisoLeido: string) {
    console.log("Leído");
    console.log(idAvisoLeido);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ARRAffinity=fb67a877419d7eb1f7355ecdeffceb6c6ba525fbc3d69bd93aed6fdf91dfd8ed; ARRAffinitySameSite=fb67a877419d7eb1f7355ecdeffceb6c6ba525fbc3d69bd93aed6fdf91dfd8ed");

    var raw = JSON.stringify({
      "IdAviso": idAvisoLeido,
      "createdBy": this.employeeId
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw
    };

    fetch(this.urlAzure+"/Avisos/leerAvisos", requestOptions)
      .then(respuesta => respuesta.json())
      .then(resultado => console.log(resultado))
      .catch(error => console.log('error', error));

  }

  avisosTienda2(crPlaza: string, crTienda: string,plazaEE:string) {


    this.apiService.getAvisosTienda(crPlaza, crTienda,plazaEE).subscribe((response) => {
     
        if(response==null){
       
          const errorMessage = document.createElement('h3');
          errorMessage.textContent = `Su bandeja se encuentra sin mensajes nuevos que mostrar `;
          const errorMessage2 = document.createElement('h5');
          errorMessage2.textContent = `¡No hay nuevos mensajes que mostrar!`;
          this.container = document.querySelector('.errorAvisos');
          this.container.appendChild(errorMessage);
          this.container.appendChild(errorMessage2);
          this.container.className = "errorAvisosStilo card card-body";

        }

      this.data = response
      this.posts = this.data;
      
      
    }
    )
  }


  cambiarFlag(parametro: string) {
    this.mostrar2 = !this.mostrar2;
    this.mostrar = !this.mostrar;
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
      let fechaInicioVigFor = iteracion.fechaInicioVigencia;
      let fechaFinVigFor = iteracion.fechaFinVigencia;

      if (idAvisoFor == parametro) {
        console.log("paseee");
        document.getElementById(idAvisoFor);
        this._idAvisoLeer = idAvisoFor;
        this._fromIdLeer = fromIdFor;
        this._toIdLeer = toId;
        this._tituloAvisoLeer = tituloAvisoFor;
        this._descripcionAvisoLeer = descripcionAvisoFor;
        this._prioridadAvisoLeer = prioridadAvisoFor;
        this._tipoAvisoLeer = tipoAvisoFor;
        this._fechaAvisoLeer = fechaAvisoFor;
        this._fechaInicioVigLeer = fechaInicioVigFor;
        this._fechaFinVigLeer = fechaFinVigFor;
      }
    }
  }


  avisos() {
    location.reload();

    this.filtroCategoria = "";
  }

  capturar() {
    this._prioridadAviso = parseInt(this.opcionSeleccionado);
  }

  capturarPlaza() {
    this._toId = this.opcionSeleccionadoPlaza;
  }

  enviarAviso() {
    if (this.seleccionTienda == 0) {

      var raw = JSON.stringify({
        // "FromId": GlobalComponent.userId,
        "FromId": this._toId + this.crTienda,
        "ToId": this.crPlaza,
        "TituloAviso": this._tituloAviso,
        "DescripcionAviso": this._descripcionAviso,
        "FechaInicioVigencia": this._fechaInicioVigencia,
        "FechaFinVigencia": this._fechaFinVigencia,
        "PrioridadAviso": this._prioridadAviso,
        "TipoAviso": 2,
        "createdBy": this.idEmpleado
      });
      // console.log("json region: "+raw);

      this.realizarElEnvio(raw);

    }
    if (this.seleccionTienda == 1) {


      var raw = JSON.stringify({
        // "FromId": GlobalComponent.userId,
        "FromId":  this.crPlaza+this.crTienda,
        "ToId": this._toIdJefe,
        "TituloAviso": this._tituloAviso,
        "DescripcionAviso": this._descripcionAviso,
        "FechaInicioVigencia": this._fechaInicioVigencia,
        "FechaFinVigencia": this._fechaFinVigencia,
        "PrioridadAviso": this._prioridadAviso,
        "TipoAviso": 2,
        "createdBy": this.idEmpleado
      });
      // console.log("json Cedis: "+raw);


      this.realizarElEnvio(raw);
    }

  }

  realizarElEnvio(jsonCom: string) {

    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: jsonCom
    };





    fetch(this.urlAzure+"/Avisos/recibirAvisosTienda", requestOptions)
      .then(response => response.json())
      .then(response => {

        if (response.status == 400) {
          this.envioFallido();
        } else if (response.message == "Correcto") {
          this.envioExitoso();
          this._fromId = '';
          this._toId = '';
          this._tituloAviso = '';
          this._descripcionAviso = '';
          this._prioridadAviso;
          this._tipoAviso;
          this.opcionSeleccionado = '';
          this._fechaInicioVigencia = '';
          this._fechaFinVigencia = '';
        }
      });
  }

  submit() {
    // if (this.formularioEnvioAviso.valid) {
    //   this.resultado = "Todos los datos son válidos, el mensaje fue enviado exitosamente";
    // }
    // else
    //   this.resultado = "Hay datos inválidos en el formulario";
  }

  envioFallido() {
    this.mensajeExito = "El mensaje no se pudo enviar correctamente";
    this.modalEnvio = document.querySelector('.mensaje');
    this.reset("");
  }

  envioExitoso() {
    this.mensajeExito = "El mensaje fue enviado correctamente";
    this.modalEnvio = document.querySelector('.mensaje');
    this.reset("");
  }


  noLeidos() {
    console.log("No leidos");
 
    this.posts = this.data.filter(item => item.estatus !==1);

       
  }

  faltanteProlongado() {
    console.log("faltante prolongado");
    return this.filtroCategoria = "FALTANTE PROLONGADO";

  }

  pmo() {
    console.log("Cambios en PMO");
    return this.filtroCategoria = "CAMBIOS EN PMO";
  }

  caducados() {
    console.log("Caducados");
    this.filtroCategoria = "aplica"
  }

  descartar() {
    this.formularioEnvioAviso.reset();
    this._fromId = '';
    this._toId = '';
    this._tituloAviso = '';
    this._descripcionAviso = '';
    this._prioridadAviso;
    this._tipoAviso;
    this.opcionSeleccionado = '';
    this._fechaInicioVigencia = '';
    this._fechaFinVigencia = '';
    this.reset("");
  }

  reset($event: any) {
    if (this.seleccionTienda == 1) {
      const newElement2 = document.getElementById("cedis") as HTMLInputElement; newElement2.checked = false;
    } if (this.seleccionTienda == 0) {
      const newElement3 = document.getElementById("region") as HTMLInputElement; newElement3.checked = false;
    }
  }

  formularioEnvioAviso = new FormGroup({
    para: new FormControl('', [Validators.nullValidator/*, Validators.minLength(4)*/]),
    paraResponsable: new FormControl('', [Validators.nullValidator/*, Validators.minLength(4)*/]),
    paraJefe: new FormControl('', [Validators.nullValidator/*, Validators.minLength(4)*/]),
    asunto: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    prioridad: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    activarCampo: new FormControl(),
    vigenciaFechaInicia: new FormControl('', [Validators.required]),
    vigenciaFechaTermina: new FormControl('', [Validators.required]),
    comentarios: new FormControl('', [Validators.required, Validators.maxLength(5)])
  });

  regresar() {
    this.router.navigate(['/home'],
      {
        queryParams: {
          appId: this.appId,
          encrypt: this.encrypt
        }
      }
    );
  }
  changePara($event: any) {
    this.seleccionTienda = $event.target.value;
    console.log("Opcion iniciada " + this.seleccionTienda);

  }

  handleSearch(value:string){
 
    this.filtro_value=value;
  
  }

  filtro_value='';



  descartarBA() {
    this.asuntoBA = '';
    this.filterFecha = '';
    this.filterCalendario = '';
    this._filterCalendario2 = '';

  }

  buscar() {
    console.log(this.filterCalendario);
    
    if(this.filterCalendario!=''){
    var fecha = this.filterCalendario;
       
      this.posts=this.data; 
    var mesDia = fecha.substring(5, 7);
    var dia =fecha.substring(8,11)
     var anio = fecha.substring(0, 4);

    this._filterCalendario2 = mesDia+'/'+dia+'/'+anio;
    
    
    }
    
   
    return this._filterCalendario2;
  }


  iteracionFecha: any;
  fechaSistemaArray: any[] = [];
  pruebaF: any;
  fechaAvisoArray: any[] = [];

  busquedaRango() {

    
    let dates: Date[] = [];
    let today = new Date();
    let lastWeek = new Date();
    let iteracion: any;

    if (this.filterFecha === "1 semana") {
      console.log("1 semana")
      lastWeek.setDate(lastWeek.getDate() - 7);
      for (let date = new Date(lastWeek); date <= today; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
      }
  
      for (let i = 0; i <= dates.length - 1; i++) {
        this.iteracionFecha = dates[i].toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

        this.fechaSistemaArray.push(this.iteracionFecha);
      }
      for (let i = 0; i <= this.data.length - 1; i++) {
        iteracion = this.data[i];
        let fechaAvisoFor = iteracion.fechaAviso;
        fechaAvisoFor = fechaAvisoFor.substring(0, 10);

        var dia = fechaAvisoFor.substring(3, 6);
        var mes = fechaAvisoFor.substring(0, 3);
        var anio = fechaAvisoFor.substring(6, 10);
        this.pruebaF = mes + dia + anio;
        for (const value of this.fechaSistemaArray) {

          if (value == this.pruebaF) {
            this.fechaAvisoArray.push(this.data[i]);

          }
        }
      }

    } else if (this.filterFecha === "2 semanas") {
      console.log("2 semanas")
      lastWeek.setDate(lastWeek.getDate() - 14);
      for (let date = new Date(lastWeek); date <= today; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
      }
    
      for (let i = 0; i <= dates.length - 1; i++) {
        this.iteracionFecha = dates[i].toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

        this.fechaSistemaArray.push(this.iteracionFecha);
      }
      for (let i = 0; i <= this.data.length - 1; i++) {
        iteracion = this.data[i];
        let fechaAvisoFor = iteracion.fechaAviso;
        fechaAvisoFor = fechaAvisoFor.substring(0, 10);

        var dia = fechaAvisoFor.substring(3, 6);
        var mes = fechaAvisoFor.substring(0, 3);
        var anio = fechaAvisoFor.substring(6, 10);
        this.pruebaF = mes + dia + anio;
        for (const value of this.fechaSistemaArray) {

          if (value == this.pruebaF) {
            this.fechaAvisoArray.push(this.data[i]);

          }
        }
      }
    } else if (this.filterFecha === "1 mes") {
      console.log("1 mes")
      lastWeek.setDate(lastWeek.getDate() - 29);
      for (let date = new Date(lastWeek); date <= today; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
      }
    
      for (let i = 0; i <= dates.length - 1; i++) {
        this.iteracionFecha = dates[i].toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

        this.fechaSistemaArray.push(this.iteracionFecha);
      }
            
      for (let i = 0; i <= this.data.length - 1; i++) {
        iteracion = this.data[i];
        let fechaAvisoFor = iteracion.fechaAviso;
        fechaAvisoFor = fechaAvisoFor.substring(0, 10);

        var dia = fechaAvisoFor.substring(3, 6);
        var mes = fechaAvisoFor.substring(0, 3);
        var anio = fechaAvisoFor.substring(6, 10);
        this.pruebaF = mes + dia + anio;
        for (const value of this.fechaSistemaArray) {

          if (value == this.pruebaF) {
            this.fechaAvisoArray.push(this.data[i]);

          }
        }
      }
    }
    this.posts=this.fechaAvisoArray;
    this.fechaAvisoArray=[];
   
    
    
   
  }

  busquedaAvanzada(parametroBA: string) {
    this.posts = this.data.filter(item => item.tituloAviso.toUpperCase().includes(parametroBA.toUpperCase()));

    // console.log( "Coltando objects "+JSON.stringify( this.posts))
    // if (this.posts.length === 0) {
    //   this.container = document.querySelector('.errorAvisos');
    //   this.errorMessage3 = document.createElement('div');
    //   this.errorMessage3.className = "prueba errorAvisosStilo card card-body";
    //   this.errorMessage = document.createElement('h5');
    //   this.errorMessage.textContent = `Cierra este mensaje o presiona "Bandeja de entrada"`;
    //   this.errorMessage2 = document.createElement('button');
    //   this.errorMessage2.textContent = `Cerrar`;
    //   this.errorMessage2.className = "btn btn-outline-danger cerrarAlerta";
    //   this.container.appendChild(this.errorMessage3);
    //   this.errorMessage3.appendChild(this.errorMessage);
    //   this.errorMessage3.appendChild(this.errorMessage2);
    //   let botones_eliminar = document.querySelectorAll(".prueba");
    //   botones_eliminar.forEach(boton => {
    //     boton.addEventListener("click", () => {
    //       this.errorMessage3.remove();
    //       location.reload();
    //     });
    //   });
    //   this.asuntoBA = '';
    //   this.filterFecha = '';
    //   this.filterCalendario = '';
    //   this.filterCalendario2 = '';
    //   this.articuloBA = '';
    //   this.categoriaBA = '';
    //   this.subgrupoBA = '';
    //   this.cedisBA = '';
    //   this._filterCalendario2='';

    // }
    this.asuntoBA = '';
    this.filterFecha = '';
    this.filterCalendario = '';
    this.filterCalendario2 = '';
    this.articuloBA = '';
    this.categoriaBA = '';
    this.subgrupoBA = '';
    this.cedisBA = '';
    this._filterCalendario2='';

  }


  resetBusquedaAvanzada(){
    this.fechaAvisoArray.length=0;
 this.fechaSistemaArray.length=0;


}

}

