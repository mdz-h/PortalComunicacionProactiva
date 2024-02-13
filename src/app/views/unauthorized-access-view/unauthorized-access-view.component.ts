import { Component,Inject, OnInit  } from '@angular/core';
import { Store } from '@ngrx/store';
import { DOCUMENT } from '@angular/common';


import { Observable, timer } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AppStateInterface } from 'src/app/models/app-state.interface';




@Component({
    selector: 'app-unauthorized-access-view',
    templateUrl: './unauthorized-access-view.component.html',
    styleUrls: [
      './unauthorized-access-view.component.scss'
    ]
  })
  export class UnauthorizedAccessViewComponent implements OnInit {
  
    regressiveCount: Observable<number>;
  
    constructor(@Inject(DOCUMENT) readonly doc: Document, private store: Store<AppStateInterface> ) {
    }
  
    ngOnInit(){

    }
    }
  