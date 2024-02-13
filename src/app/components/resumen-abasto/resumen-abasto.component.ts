import { Component, Inject, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataService } from '../../services/datos.service';
import { ConstantesUrl } from "src/app/global-variables";
import { DOCUMENT } from "@angular/common";
import { GlobalComponent } from "src/app/global-component";

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen-abasto.component.html',
  styleUrls: ['./resumen-abasto.component.css']
})
export class ResumenAbasto implements OnInit {
  urlAzure=ConstantesUrl.apiAzure;
  urlApiOxxo=ConstantesUrl.apiOxxo;
  public appId: any;
  public encrypt: any; 
  idPediNum: number;
  public _idNombreEvento: string;
  data: any = [];
  public id: any;
  public encript:any;


  apiKey = '9Aat483#PF%60C#pllWO70@4zYMfm8egZ0w';
  constructor(private dataService: DataService, private router: Router,
     private http: HttpClient,@Inject(DOCUMENT) document: any) {

      GlobalComponent.obtenerParametros(document.location.href);
      this.appId=GlobalComponent.appId;
      this.encrypt=GlobalComponent.encrypt;

       }





  ngOnInit() {

    this.id=this.dataService.GetACappId();
    this.encript=this.dataService.GetACencript();


    this.idPediNum = this.dataService.GetIdPedidoNum();
    this._idNombreEvento = this.dataService.getDatoMotivo();
 
    console.log("numero de pedido " + this.idPediNum);

    console.log(this._idNombreEvento = this.dataService.getDatoMotivo())

    this.consumiendoList(this.idPediNum);

  }


  // Metodo que consulta la lista del pedido por el idPedido
  consumiendoList(idPediNum: number) {

    //Headers y  Query params para enviar al endpoint
    let headers = new HttpHeaders();
    headers = headers.set('ApiKey', this.apiKey)

    let params = new HttpParams().set('idPedido', this.idPediNum);

    this.http.get<any[]>(this.urlAzure+'/Pedidos/consultaDetallesPedido',
      {
        headers: headers,
        params: params
      }
    ).subscribe(

      (lista: any[]) => this.data = lista
    )
  }

  home() {
    this.router.navigate(['/home'],
    {
      queryParams:{
        appId: this.appId,
        encrypt:this.encrypt
    }}
    
    );
  }

}
