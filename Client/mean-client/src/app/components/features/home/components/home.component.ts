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

  @Output() loadAllUsers = new EventEmitter();
  @Output() deleteUser = new EventEmitter<string>();
  @Output() loadUser = new EventEmitter<string>();
  @Output() refreshAccessToken = new EventEmitter<string>();

  @Input() userDetails: UserDetailsModel;
  @Input() allUsers: UserDetailsModel[];

  _tokenDetails: TokenDetailsModel;

  @Input()
  get tokenDetails() {
    return this._tokenDetails;
  }
  set tokenDetails(value: TokenDetailsModel) {

    this.tokenExpiryTime = new Date(value.accessTokenExpiryTime);

    if (this.tokenExpiryTime > new Date()) {
      this.tokenExpired = false;
    }

    this._tokenDetails = value;
  }

  _userEmail: string;
  @Input()
  get userEmail() {
    return this._userEmail;
  }
  set userEmail(value: string) {
    this.loadUser.emit(value);

    this._userEmail = value;
  }

  lastUserLoadTime: Date;

  tokenExpiryTime: Date;
  tokenExpired: boolean;

  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'createdAt', 'updatedAt', 'remove'];

  ngOnInit(): void {
    this.lastUserLoadTime = new Date();

    this.timeout();
  }

  timeout() {
    setTimeout(() => {
      if (this.tokenExpiryTime >= new Date()) {
        this.tokenExpired = false;
      } else {
        this.tokenExpired = true;
      }

      this.timeout();
    }, 1000);
  }

  refreshToken(refreshToken: string): void {
    this.refreshAccessToken.emit(refreshToken);
  }

  removeUser(id: string): void {
    this.deleteUser.emit(id);
  }

  loadUsers(): void {
    this.loadAllUsers.emit();
    this.lastUserLoadTime = new Date();
  }
}
