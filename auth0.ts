import getConfig from 'next/config'

import { initAuth0 } from '@auth0/nextjs-auth0'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default initAuth0({
  clientId: serverRuntimeConfig.auth0ClientId,
  clientSecret: serverRuntimeConfig.auth0ClientSecret,
  scope: publicRuntimeConfig.auth0Scope,
  domain: serverRuntimeConfig.auth0Domain,
  redirectUri: serverRuntimeConfig.auth0RedirectUri,
  postLogoutRedirectUri: serverRuntimeConfig.auth0SignoutRedirectUri,
  session: {
    cookieSecret: serverRuntimeConfig.auth0SessionCookieSecret,
    cookieLifetime: 7200,
    storeIdToken: false,
    storeRefreshToken: false,
    storeAccessToken: false,
  },
})
