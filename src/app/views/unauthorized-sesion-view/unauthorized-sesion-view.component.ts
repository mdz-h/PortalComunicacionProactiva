import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, timer } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';



@Component({
    selector: 'app-unauthorized-sesion-view',
    templateUrl: './unauthorized-sesion-view.component.html',
    styleUrls: [
      './unauthorized-sesion-view.component.scss'
    ]
  })
  export class UnauthorizedUserViewComponent implements OnInit {
  
    regressiveCount: Observable<number>;
  
    constructor( ) {
    }
  
    ngOnInit() {
      
    }
  }