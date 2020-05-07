import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserDetailsModel } from 'src/app/_models/user-details-model';
import { TokenDetailsModel } from 'src/app/_models/token-details-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  @Output() loadUser = new EventEmitter<string>();

  @Input() userDetails: UserDetailsModel;
  @Input() tokenDetails: TokenDetailsModel;

  @Input()
  set userEmail(value: string) {
    console.log(value);
    this.loadUser.emit(value);
  }

  ngOnInit(): void {
  }

}
