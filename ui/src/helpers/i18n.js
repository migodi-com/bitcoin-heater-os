import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import locale_de from '../locales/de.json'
import locale_en from '../locales/en.json'

export const SUPPORT_LOCALES = ['en', 'de']

export function setupI18n(options = { locale: 'de', fallbackLocale: 'en', legacy: false, globalInjection: true }) {
	options.datetimeFormats = {
	  'en': {
	    short: {
	      year: 'numeric', month: 'short', day: 'numeric'
	    },
	    long: {
	      year: 'numeric', month: 'short', day: 'numeric',
	      weekday: 'short', hour: 'numeric', minute: 'numeric'
	    }
	  },
	  'de': {
	    short: {
	      year: 'numeric', month: 'short', day: 'numeric'
	    },
	    long: {
	      year: 'numeric', month: 'short', day: 'numeric',
	      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
	    }
	  }
	}
	
	options.numberFormats = {
	  'en': {
	    currency: {
	      style: 'currency', currency: 'EUR', notation: 'standard'
	    },
	    decimal: {
	      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
	    },
	    number: {
	      style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 3
	    },
	    percent: {
	      style: 'percent', useGrouping: false
	    }
	  },
	  'de': {
	    currency: {
	      style: 'currency', currency: 'EUR', notation: 'standard'
	    },
	    decimal: {
	      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
	    },
	    number: {
	      style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 3
	    },
	    percent: {
	      style: 'percent', useGrouping: false
	    }
	  }
	}
	
	const i18n = createI18n(options)
	setI18nLanguage(i18n, options.locale)
	
	i18n.global.setLocaleMessage('de', locale_de)
	i18n.global.setLocaleMessage('en', locale_en)
	return i18n
}

export function setI18nLanguage(i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  /**
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocaleMessages(i18n, locale) {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `../locales/${locale}.json`
  )

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)
  
  return nextTick()
}
