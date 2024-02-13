import { Component, OnInit,Inject } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { DataService } from '../../services/datos.service';
import { VirtualTimeScheduler, filter } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { GlobalComponent } from "src/app/global-component";
import { ConstantesUrl } from "src/app/global-variables";
import { apiUserService } from "src/app/services/apiUser.service";


@Component({
  selector: 'app-captura',
  templateUrl: './captura-articulos.component.html',
  styleUrls: ['./captura-articulos.component.css']
})
export class CapturaArticulos implements OnInit {

  urlAzure=ConstantesUrl.apiAzure;
  urlApiOxxo=ConstantesUrl.apiOxxo;

  apiKey = '9Aat483#PF%60C#pllWO70@4zYMfm8egZ0w';
  public _idMotivo: number;
  public idPedido: string;
  public usuarioId:string;
  public idPedidoNum: number;
  public employeeId: any;
  public appId: any;
  public encrypt: any;
  data: any = [];
  dataJson:any=[];
  prudc: any = [];
  dataList: any[] = [];
  public _nombreEvento: string;
  public _unidadProducto:any[]=[];
  tableRows:any;
  cantidad:any[]=[];
  words2 = [{cantidad:'1'}];
  jsonCompleto:any=[];
  listJson:any=[];
  constructor( private apiService: apiUserService,private router: Router,@Inject(DOCUMENT) document: any, private http: HttpClient, private dataService: DataService) {

    GlobalComponent.obtenerParametros(document.location.href);
    this.appId=GlobalComponent.appId;
    this.encrypt=GlobalComponent.encrypt;

  }
  ngOnInit() {
    // Obteniendo el  valor de IdPedi por un Service
    this.idPedido = this.dataService.getidPedido();
    
    this.apiService.getUserInformation()
      .subscribe(resp => {
                      
      // console.log("Constulando id Empleado "+  resp.user?.userId);
       
      this.employeeId= resp.user?.userId;
    }
      );

    // console.log(this.idPedido);

  }
  add() {
    
    
    // console.log("enviando lista")
  this.enviarLista();
  }
  capProduct: CapProducto[] = [{
    IdArticulo: '',
    descripcion: '',
    idpedido: 17,
    cantidad: 1

  }]

  agregar(){
    
this.apiService.productoItem(this._nombreEvento).subscribe((response:any) =>{
  this.idPedidoNum = parseInt(this.idPedido);
    this.words2.push({cantidad: '1'});
    // console.log("entro en Peticion");
    
  this.dataList.push({
    descripcion: response.itemDesc,
    IdArticulo: response.item,
    idpedido: parseInt(this.idPedido),
    cantidad: 1,
    createdBy: this.employeeId
  });



});

  }

  // funcion que llama el imput al dar Enter
  agregar1() {
    // console.log("imprimiedno id pedido " + this.idPedido)
   
    //parametros y headers para enviar al enpoint
    let params = new HttpParams().set('item', this._nombreEvento);

    let headers = new HttpHeaders();
    headers = headers.set('ApiKey', this.apiKey)

    this.http.get<any>(this.urlAzure+"/Productos/productForItem",
      {
        headers: headers,
        params: params

      }

    ).subscribe((response: any) => {
      console.log(response);
      this.idPedidoNum = parseInt(this.idPedido);
      this.words2.push({cantidad: '1'});
      // console.log("producto no existente1");
      this.dataList.push({
        descripcion: response.itemDesc,
        IdArticulo: response.item,
        idpedido: parseInt(this.idPedido),
        cantidad: 1,
        createdBy: this.usuarioId
      });
      // console.log("imprimiendo------ " + response.itemDesc);

    }

    );

  }

  // Metodo para enviar la lista de productos!!
  enviarLista() {
    this.data = this.dataList;
//  console.log(JSON.stringify(this.words2));
 

   for( var i=-1;i<this.data.length-1;i++){
   
    for(var i=0;i<this.words2.length-1;i++){
      // console.log("Entro en for dos");
      
      let json=this.data[i]
      let worsk=this.words2[i];
      // console.log(JSON.stringify(this.data[i]));
      //logica utilizable para controlar valores arriba de los diez mil
     if(parseInt(worsk.cantidad)>=9999){
    
      worsk.cantidad='9999';
      json.cantidad= parseInt(Object.values(this.words2[i]).toString());
      this.jsonCompleto.push(json);
     }
     else{
      // console.log("etro en Json else");
      json.cantidad= parseInt(Object.values(this.words2[i]).toString());
      console.log(json.cantidad);
      this.jsonCompleto.push(json);


    }
      }
  //  console.log(JSON.stringify(this.jsonCompleto))

   this.listJson= this.transform(this.jsonCompleto,0)
  //  console.log("json sin cero "+JSON.stringify(this.listJson ));
   
     
   }

  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // console.log(this.data);
    var raw = JSON.stringify(this.listJson);
     //console.log("enviando Json Cocmpleto"+raw);
   let headers= new HttpHeaders
  headers.append('Content-Type' , 'application/json');
  //headers.append('ApiKey','9Aat483#PF%60C#pllWO70@4zYMfm8egZ0w')
 
 var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw
};

    fetch(this.urlAzure+"/Pedidos/crearDetallePedidoLista", requestOptions)
      
      .then(response => {
        if(response.ok){
        this.aceptar();
        }}
          )
      .then(result => 
        console.log(result)
        )
        this.data =[];
        this.jsonCompleto=[];  
    
  }
//filtro para quitar los valores que esten en ceros  
  transform(lista: any[], cero: number): any {
    //console.log(JSON.stringify(lista.filter(data=> data.cantidad !==0)));
    
    return lista.filter(data=> data.cantidad !==0)

  }

  //Bontones de navegacion 

  aceptar() {
    this.enviarIdpedidoNum(this.idPedidoNum)
    this.router.navigate(['resumenAbasto'],
    {
      queryParams:{
      appId: this.appId,
      encrypt:this.encrypt
    }}
    );
  }


  regresar() {
    this.router.navigate(['motivoDesabasto'],
    {
      queryParams:{
      appId: this.appId,
      encrypt:this.encrypt
    }}
    );
  }

//Metodo que envia el idPedido a un Services ya parseado
  enviarIdpedidoNum(idPedidoN: number) {

    // console.log("enviando numero de pedido ya parseado " + idPedidoN);
    this.dataService.SetIdPedidoNum(idPedidoN);
  }




  
}

//interface para  agregar productos 
export interface CapProducto {
  IdArticulo: string,
  descripcion: string,
  idpedido: number,
  cantidad: number
}

//interface para enviar lista de productos
export interface PedidoLista {
  IdPedido: number,
  IdArticulo: string,
  cantidad: number,
  descripcion: string

}








