import { createApp } from 'vue'
import CookieConsent from './CookieConsent.vue'

type cookieWindow = Window &
  typeof globalThis & {
    cookieConsent?: cookieConsent
  }

const data = (window as cookieWindow).cookieConsent

if (typeof data === 'undefined') {
  'console' in window &&
    console.warn(
      '🚨 Cookie Consent is not configured, create a window.cookieConsent' +
        ' object with the required configuration (see https://www.npmjs.com/package/@motomedialab/cookie-consent).'
    )
}

if (typeof data !== 'undefined' && !data?.hide) {
  const mountPoint = document.createElement('div')
  mountPoint.id = 'cookie-consent'
  mountPoint.style.position = 'relative'
  mountPoint.style.zIndex = '999995'
  document.body.append(mountPoint)

  createApp(CookieConsent, {
    data: data
  }).mount(mountPoint)
}
