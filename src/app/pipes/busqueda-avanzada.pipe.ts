import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedaAvanzada'
})
export class BusquedaAvanzadaPipe implements PipeTransform {

  transform(lista: any[], texto: string): any {
  
    
    if(!texto) return lista;
 
    return lista.filter(data=> data.fechaAviso.toUpperCase().includes(texto.toUpperCase()))

  }
}



  
  