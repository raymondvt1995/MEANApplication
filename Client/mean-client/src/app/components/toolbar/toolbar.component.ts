import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserDetailsModel } from 'src/app/_models/user-details-model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  @Output() logoutUser = new EventEmitter();
  @Input() isLoggedIn: boolean;
  @Input() userDetails: UserDetailsModel;

  ngOnInit(): void {
  }

  logout(): void {
    this.logoutUser.emit();
  }
}
