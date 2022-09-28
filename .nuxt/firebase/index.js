import createApp from './app.js'

import authService from './service.auth.js'

const appConfig = {"apiKey":"AIzaSyB8O86AbCT8-eLKojCj07ipq6vS4m9iXNs","authDomain":"sp-books.firebaseapp.com","projectId":"sp-books","storageBucket":"sp-books.appspot.com","messagingSenderId":"781968798951","appId":"1:781968798951:web:dce3706ac712a6da2bde42","measurementId":"G-GXS7CFN0KY"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      authService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      authService(session, firebase, ctx, inject),

    ]
  }

  const [
    auth
  ] = await Promise.all(servicePromises)

  const fire = {
    auth: auth
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}