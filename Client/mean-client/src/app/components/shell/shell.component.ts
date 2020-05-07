import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as appActions from '../../state/app-actions';
import * as fromApp from '../../state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(private store: Store<fromApp.State>) { }

  isLoggedIn$: Observable<boolean>;
  userEmail$: Observable<string>;

  ngOnInit(): void {
    console.log('loading');
    this.isLoggedIn$ = this.store.pipe(select(fromApp.userLoggedIn));
    this.userEmail$ = this.store.pipe(select(fromApp.getUserEmail));
  }

}
