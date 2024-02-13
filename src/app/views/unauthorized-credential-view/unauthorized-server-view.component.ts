import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, timer } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';



@Component({
    selector: 'app-unauthorized-server-view',
    templateUrl: './unauthorized-server-view.component.html',
    styleUrls: [
      './unauthorized-credential-view.component.scss'
    ]
  })
  export class UnauthorizedServerViewComponent implements OnInit {
  
    regressiveCount: Observable<number>;
  
    constructor( ) {
    }
  
    ngOnInit() {
      
    }
  }