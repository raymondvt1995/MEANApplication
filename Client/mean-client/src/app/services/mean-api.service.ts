import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RegisterUserModel } from '../_models/register-user-model';
import { TokenDetailsModel } from '../_models/token-details-model';
import { LoginUserModel } from '../_models/login-user-model';
import { UserDetailsModel } from '../_models/user-details-model';
import { AccessTokenModel } from '../_models/access-token-model';

@Injectable({
    providedIn: 'root'
})
export class MeanAPIService {
    public baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    registerUser(userDetails: RegisterUserModel): Observable<TokenDetailsModel> {
        const url = `${this.baseUrl}/user`;

        return this.http.post<TokenDetailsModel>(url, userDetails);
    }


    loginUser(loginDetails: LoginUserModel): Observable<TokenDetailsModel> {
        const url = `${this.baseUrl}/user/login`;

        return this.http.post<TokenDetailsModel>(url, loginDetails);
    }

    loadUser(email: string): Observable<UserDetailsModel> {
        const url = `${this.baseUrl}/user/by-email/${email}`;

        return this.http.get<UserDetailsModel>(url);
    }

    refreshToken(refreshToken: string): Observable<AccessTokenModel> {
        const url = `${this.baseUrl}/token/refresh/${refreshToken}`;

        return this.http.get<AccessTokenModel>(url);
    }
}
