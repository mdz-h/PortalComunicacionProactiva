import { Component,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { GlobalComponent } from 'src/app/global-component';
import { ConstantesUrl } from 'src/app/global-variables';
import { apiUserService } from 'src/app/services/apiUser.service';

@Component({
  selector: 'app-agrega-motivo',
  templateUrl: './agrega-motivo.component.html',
  styleUrls: ['./agrega-motivo.component.css']
})
export class AgregaMotivoComponent {
  urlAzure=ConstantesUrl.apiAzure;
  urlApiOxxo=ConstantesUrl.apiOxxo;
  public appId: any;
  public encrypt: any;
  public employeeId: any;
  constructor(private router: Router, @Inject(DOCUMENT) document: any, private http: HttpClient,private apiService: apiUserService) { 
    GlobalComponent.obtenerParametros(document.location.href);
    this.appId=GlobalComponent.appId;
    this.encrypt=GlobalComponent.encrypt;
    this.apiService.getUserInformation().subscribe(resp => {
      this.employeeId= resp.user?.userId;
    }
    )
  }

  title = "basic-form";

  _motivo: string;
  _descripcion: string;
  mensajeExito: string;
  resultado!: string;
  modalEnvio: any;

  get motivo(): string {
    return this._motivo;
  }

  set motivo(newMotivo: string) {
    this._motivo = newMotivo;
  }

  get descripcion(): string {
    return this._descripcion;
  }

  set descripcion(newDescripcion: string) {
    this._descripcion = newDescripcion;
  }

  regresarAListado() {
    this.router.navigate(['/listado'],
    {
      queryParams:{
      appId: this.appId,
      encrypt:this.encrypt
    }}
    );
    
  }

  agregarMotivo() {
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  

    let raw = JSON.stringify({
      "TituloMotivo": this._motivo,
      "DescripcionMotivo": this._descripcion,
      "PrioridadVisual": 2,
      "createdBy":this.employeeId
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    fetch(this.urlAzure+"/Pedidos/crearMotivoDesabasto", requestOptions)
 
      .then(response => response.json())
      .then(response => {
        console.log(response.status)
        console.log(response.message)
        if (response.status == 400) {
          this.envioFallido();
        }else if (response.message == "Correcto") {
          this.envioExitoso();
          this._motivo = '';
          this._descripcion = '';
        }
      });
  }

  submit() {
    if (this.formularioEnvioAviso.valid){
      this.resultado = "Todos los datos son v�lidos, el mensaje fue enviado exitosamente";
    }
    else
      this.resultado = "Hay datos inv�lidos en el formulario";
  }

  envioFallido() {
    this.mensajeExito = "El motivo no se pudo agregar correctamente";
    this.modalEnvio = document.querySelector('.mensaje');
  }

  envioExitoso() {
    this.mensajeExito = "El motivo fue agregado correctamente";
    this.modalEnvio = document.querySelector('.mensaje');
  }

  formularioEnvioAviso = new FormGroup({
    motivo: new FormControl('', [Validators.required, Validators.minLength(5)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(500)])
  });

  cerrar(){
    location.reload();
  }

  
}
