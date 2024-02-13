import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './datos.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Injectable({
    providedIn: 'root',
  })
  // Creamos la clase para nuestro servicio
  export class SpinnerService {


    constructor( private spinnerServices:NgxSpinnerService   ) {      }




    public llamarSpinner(){
      this.spinnerServices.show();
    }
    public detenerSpiner(){
      this.spinnerServices.hide();
    }
   



  }