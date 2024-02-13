import { Component, Input, OnInit, Inject } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/datos.service';
import { DOCUMENT } from "@angular/common";
import { GlobalComponent } from "src/app/global-component";
import { apiUserService } from "src/app/services/apiUser.service";
import { ConstantesUrl } from "src/app/global-variables";


/**
 * Class motivo-desabasto   
 * que envia la informacion necesaria para detallar el motivo de desabasto
 * @param {string} type : descripcion, fecha motivo (comienzo y final), comentarios. 
 * @return {string} type: numero de pedido.
 ** @autor  HJMB
 * 
  */

@Component({
  selector: 'app-motivo',
  templateUrl: './motivo-desabasto.component.html',
  styleUrls: ['./motivo-desabasto.component.css']
})

export class MotivoDesabasto implements OnInit {

  urlAzure = ConstantesUrl.apiAzure;
  urlApiOxxo = ConstantesUrl.apiOxxo;


  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    comentarios: new FormControl('')
  });
  submitted = false;


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  //Variable que que se enviara a Services  IdMotivo desde componente listado-tipo-solicitud
  public _idMotivo: string;
  apiKey = '9Aat483#PF%60C#pllWO70@4zYMfm8egZ0w';

  data: any = [];
  _fromId = new FormControl("F1001");

  public _nombreEvento: string;

  _fechaInicio: string;

  _fechaFin: string;

  public _comentariosMotivo: string;
  response: string;
  public appId: any;
  public encrypt: any;
  public idEmpleado: string;
  public employeeId: any;
  public crPlaza: string;
  public crTienda: string;
  arrTienda: any[] = [];
  regionTienda: any;
  reteKid: number;


  constructor(private router: Router, private http: HttpClient,
    @Inject(DOCUMENT) document: any, private dataService: DataService, private formBuilder: FormBuilder,
    private apiService: apiUserService) {

    this._idMotivo = this.dataService.getIdMotivo();

  }
  ngOnInit() {

    GlobalComponent.obtenerParametros(document.location.href);
    this.appId = GlobalComponent.appId;
    this.encrypt = GlobalComponent.encrypt;

    this.apiService.getUserInformation()
      .subscribe(resp => {

        // console.log("Constulando id Empleado "+  resp.user?.employeeId);
        this.employeeId = resp.user?.userId;
        // this.apiService.getUsuariosDate("300")
        this.apiService.getUsuariosDate(this.employeeId)
          .subscribe(resp => {

            this.idEmpleado = resp.idEmpleado;
            this.crPlaza = resp.crPlaza;
            this.crTienda = resp.crTienda;

            this.apiService.getTiendasApi().subscribe(resp => {

              for (let l = 0; l <= resp.length - 1; l++) {
                if (resp[l].CR_TIENDA == this.crTienda) {
                  this.arrTienda.push(resp[l]);
                  // console.log(JSON.stringify(this.ArrResponsable));

                }

              }
              this.regionTienda = this.arrTienda;
              this.reteKid = this.regionTienda[0].RETEKID;

              // console.log("impriendo campo: "+ this.reteKid);
            })

          }
          );
      }
      );

    this.form = this.formBuilder.group(
      {
        fullname: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
            // Validators.pattern(/^[a-zA-Z0-9]{1,16}$/),
            Validators.maxLength(150)
          ]
        ],
        comentarios: [
          '', [
            Validators.required,
            // Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
            Validators.pattern(/^[a-zA-Z0-9\s]*$/i),
            Validators.maxLength(200)

          ]
        ],
        fechaInicioMotivo: [
          '', [Validators.nullValidator]
        ],
        fechaFinMotivo: [
          '', [Validators.nullValidator]
        ]

      }
    )

  }

  enviarDatoMotivo(datoMotivo: string, usurioId: string) {

    // console.log("enviando datos---"+datoMotivo)
    this.dataService.SetDatoMotivo(datoMotivo);
    this.dataService.setUsuarioId(usurioId);
    // console.log("se envio el dato :"+datoMotivo);

  }


  motivoDesabasto() {

    this.enviarDatoMotivo(this._nombreEvento, this.idEmpleado)




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // console.log("imprimeindo comentario "+this._comentariosMotivo);

    let headers = new HttpHeaders();

    headers = headers.set('ApiKey', this.apiKey)




    this.http.post<any>(this.urlAzure + "/Pedidos/crearEncabezadoPedido",
      {
        FromId: String(this.reteKid),
        // FromId:"300",
        IdMotivo: parseInt(this._idMotivo),
        NombreEvento: this._nombreEvento,
        FechaInicio: this._fechaInicio,
        FechaFin: this._fechaFin,
        comentarios: this._comentariosMotivo,
        createdBy: this.idEmpleado
        // createdBy:"300"
      },
      { headers: headers }

    )
      .subscribe((response: any) => {
        console.log(response);


        this.enviandoIdMotivo(response.idPedido)

      })

    this._fromId = new FormControl("F1001");


    // console.log("idpedido------"+ this.response);

  }

  enviandoIdMotivo(idMotivo: string) {
    this.dataService.SetidPedido(idMotivo);
    this.continuar()
  }

  // metodos de navegacion 
  continuar() {
    this.router.navigate(['capturaArticulos'],
      {
        queryParams: {
          appId: this.appId,
          encrypt: this.encrypt
        }
      }
    );
  }

  regresar() {
    this.router.navigate(['listado'],
      {
        queryParams: {
          appId: this.appId,
          encrypt: this.encrypt
        }
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {

      return;
    }
    this.motivoDesabasto();
    this._nombreEvento = this.form.value.fullname;

    // console.log("-----------------"+this._nombreEvento);

    // console.log(JSON.stringify(this.form.value, null, 2));
  }

}
