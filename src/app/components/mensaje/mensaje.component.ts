import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent {
  @Input() idAviso: string;
  @Input() fromId: string;
  @Input() toId: string;
  @Input() tituloAviso: string;
  @Input() descripcionAviso: string;
  @Input() prioridadAviso: number;
  @Input() tipoAviso: number;
  @Input() fechaAviso: string;
  @Input() fechaInicioVig: string;
  @Input() fechaFinVig: string;

  ngOnInit(){
    console.log(this.idAviso);
    
  }
  
}
