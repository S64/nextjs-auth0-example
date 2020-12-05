module.exports = {
  publicRuntimeConfig: {
    auth0Scope: 'openid profile email',
  },
  serverRuntimeConfig: {
    auth0Domain: process.env['APP_AUTH0_DOMAIN'],
    auth0ClientId: process.env['APP_AUTH0_CLIENT_ID'],
    auth0ClientSecret: process.env['APP_AUTH0_CLIENT_SECRET'],
    auth0RedirectUri: ('APP_AUTH0_REDIRECT_URI' in process.env) ? process.env['APP_AUTH0_REDIRECT_URI'] : 'http://localhost:3000/api/auth0/callback',
    auth0SignoutRedirectUri: ('APP_AUTH0_SIGNOUT_REDIRECT_URI' in process.env) ? process.env['APP_AUTH0_SIGNOUT_REDIRECT_URI'] : 'http://localhost:3000',
    auth0SessionCookieSecret: process.env['APP_AUTH0_SESSION_COOKIE_SECRET'],
  },
}
