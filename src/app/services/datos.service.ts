// Importamos la libreria necesaria para que los servicios puedan ser usados en Angular medainte la inyección de dependencias
import { EventEmitter, Injectable, Output } from '@angular/core';

// Usamos el decorator que le indica a Angular que esta clase podrá ser injectada en cualquier parte del proyecto
@Injectable({
  providedIn: 'root',
})
// Creamos la clase para nuestro servicio
export class DataService {
  @Output() datoEvento: EventEmitter<any> = new EventEmitter();



  constructor() {

  }
  idMotivod: string;
  public _nombreEvento: string;
  public idPedidoNum: number;

  public toId: string;

  //* variables de Access Control 
  public appId: any;
  public encript: any;

  ///*// variables de EnnPoint Usuarios 
  public TiendaCve: string;
  public PlazaCve: string;
  public user: string;
  public usuarioId: string;
  public idMotivoLit: string;

  SetidPedido(idMotivo: string) {

    // console.log("se recibio dato en services"+ idMotivo);

    this.idMotivod = idMotivo;
  }
  getidPedido() {
    return this.idMotivod;
  }

  // recibe el valor de nombre del evento
  SetDatoMotivo(datoMotivo: string) {

    // console.log("se recibio datoMotivo en services"  +datoMotivo);

    this._nombreEvento = datoMotivo;
  }
  getDatoMotivo() {
    // console.log("imprimeindo valor de evento :"+ this._nombreEvento)
    return this._nombreEvento;
  }


  //valor de idPedido ya parseado

  SetIdPedidoNum(idPedidoN: number) {

    this.idPedidoNum = idPedidoN;

  }

  GetIdPedidoNum() {
    return this.idPedidoNum;
  }


  //* / Datos de encript y appId

  SetAccessControl(appId: any, encript: any) {

    this.appId = appId;
    this.encript = encript;

  }

  GetACappId() {

    return this.appId;

  }
  GetACencript() {
    return this.encript;
  }

  //Variables  de EndPoint Usuarios

  SetUsuariosVariables(tiendaCve: string, plazaCve: string) {

    this.TiendaCve = tiendaCve;
    this.PlazaCve = plazaCve;
  }
  GetUsuariosTiendaCve() {
    return this.TiendaCve;
  }
  GetUsuariosPlazaCve() {
    return this.PlazaCve;
  }
  SetUsuariotoId(toIdd: string) {

    this.toId = toIdd;
  }
  getToId() {
    return this.toId;
  }

  setUsuarioId(usurioId: string) {
    this.usuarioId = usurioId;
  }
  getUsuarioid() {
    return this.usuarioId;
  }


  setIdMotivo(idMotivo: string) {
    this.idMotivoLit = idMotivo;
  }
  getIdMotivo() {
    return this.idMotivoLit;
  }
}