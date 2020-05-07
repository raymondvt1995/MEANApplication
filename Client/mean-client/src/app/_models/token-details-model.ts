export interface TokenDetailsModel {
    accessToken: string;
    accessTokenExpiryTime: Date;
    refreshToken: string;
    refreshTokenExpiryTime: Date;
}