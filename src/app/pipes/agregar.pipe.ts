import {Pipe, PipeTransform} from '@angular/core'


@Pipe({
    name: 'adding' 
})

export class AgregarPipe implements PipeTransform{

    transform(lista: any,texto:string): any[] {
       
        if(!texto)return lista 
        
        return lista;

    }
}