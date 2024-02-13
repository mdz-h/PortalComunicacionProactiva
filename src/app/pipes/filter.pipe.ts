import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  errorMessage2: any;
  errorMessage3: any;
  
  container: any;

  errorMessage: any;
  transform(lista: any[], texto: string): any {



    if(!texto) return lista;
    if(!"FALTANTE PROLONGADO") return lista;
    if(!"CAMBIOS EN PMO") return  lista;
    


    return lista.filter(data=> data.tituloAviso.toUpperCase().includes(texto.toUpperCase()))

  }

  }

