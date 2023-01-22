export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/auth',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
