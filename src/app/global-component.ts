import { ConstantesUrl } from "./global-variables";

export class GlobalComponent {

  public static urlAzure=ConstantesUrl.apiAzure;
 public static urlApiOxxo=ConstantesUrl.apiOxxo;
    public static appId: string = "";
    public static encrypt: string = "";
    public static fullname: string = "";
    public static userId: string = "";
    public static userMail: string = "";
    public static userPlaza: string = "";
    public static userPerfil: string = "";
    public static userCedis: string = "";
    public static jsonS: any[];

    static async fetchUserKeys(aId: string, enc: string) {
        const reponse = await fetch(this.urlApiOxxo+"/userapi/api/user/keys?appId="+aId+"&encrypt="+enc);
        const user = await reponse.json();
        return user;
    }    

    static async fetchlistKeys(aId: string, enc: string){
      const reponse = await fetch(this.urlApiOxxo+"/userapi/api/user/keys/list?appId="+aId+"&encrypt="+enc);
      const list = await reponse.json();
      return list;      
    }

    static async fetchTiendasXPlaza(aId: string, enc: string, pla: string){
        const reponse = await fetch(this.urlApiOxxo+"/tiendasapi/tiendas/stores/?appId="+aId+"&encrypt="+enc+"&plazaId="+pla);
        const tiendas = await reponse.json();
        return tiendas;
    }

    static async fecthDistritosXPlaza(aId: string, enc: string, pla: string){
        const reponse = await fetch(this.urlApiOxxo+"/tiendasapi/distritos/?appId="+aId+"&encrypt="+enc+"&crPlaza="+pla);
        const plazas = await reponse.json();
        return plazas;
    }

    static async fetchTiendasXDistritos(retek: string, aId: string, enc: string){
      const reponse = await fetch(this.urlApiOxxo+"/tiendasapi/distritosByRetekRegion/dist/?appId="+aId+"&encrypt="+enc+"&retekRegion="+retek);
      const tiendas = await reponse.json();
      return tiendas;
    }

    static async fetchRegionesActivas(aId: string, enc: string){
      const reponse = await fetch(this.urlApiOxxo+"/tiendasapi/api/plazas/?appId="+aId+"&encrypt="+enc);
      const regiones = await reponse.json();
      return regiones;      
    }

    static async fetchViewCEDIS(aId: string, enc: string, vista: string){
      const reponse = await fetch(this.urlApiOxxo+"/tiendasapi/tiendas/views/?appId="+aId+"&encrypt="+enc+"&tableInfoConsult="+vista);
      const cedisInfo = await reponse.json();
      return cedisInfo;
    }

    static async fetchTiendaInfo(aId: string, enc: string, crT: string, crP: string){
      var myHeaders = new Headers();
      myHeaders.append("content-type", "application/json");

      var raw = JSON.stringify({
        "crTienda": crT,
        "crPlaza": crP
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };
      const reponse = await fetch(this.urlApiOxxo+"/tiendasapi/tiendas/obtenerXCrPlazaCrTienda?appId="+aId+"&encrypt="+enc, requestOptions);
      const tiendaInfo = await reponse.json();
      return tiendaInfo;      
    }

    static async obtenerParametros(rut: string){
        //console.log(rut)
        if(rut.indexOf("?") > -1){
          let rut1 = rut.substring(rut.indexOf("?")+1, rut.length);
          var rutArr = rut1.split("&");
          for(var val of rutArr){
            var paramarr = val.split("=");
            switch(paramarr[0]){
              case "appId":{
                this.appId = paramarr[1];
                //console.log(paramarr[1]);
                break;
              }
              case "encrypt":{
                this.encrypt = paramarr[1];
                //console.log(paramarr[1]);
                break;
              }
              default:{
                //console.log("opcion default");
                break;
              }
            }
          }
        }else{
          //console.log("No");
        }
      }

      static async obtenerValores(data: any){
        //console.log(data);
        if(data !== undefined){
          for(let i = 0; i < data.length; i++){
            let iteracion = data[i];
            //break;
            let keyV = iteracion.keyValue;
            let fullN = iteracion.fullName;
            let user = iteracion.userId;
            let kId = iteracion.keyId;
    
            if(kId == 1){
              this.fullname = fullN;
              this.userPlaza = keyV;
              this.userId = user;
            }
    
            if(kId == 32){
              this.userMail = keyV;
            }
    
            if(kId == 20049){
              this.userPerfil = keyV;
            }

            if(kId == 20050){
              this.userCedis = keyV;
            }
          }
        }
      }

}

