import { Currency } from '../types'

export interface CurrencyConfig {
  code: Currency
  // 'kr', '$', etc.
  symbol: string
  // Where the symbol sits relative to the number.
  symbolPosition: 'prefix' | 'suffix'
  // Intl locale used for thousand/decimal separators (e.g. 'sv-SE' uses space + comma).
  locale: string
  // Emoji flag shown in the currency selector.
  flag: string
  // Human-friendly label for the dropdown option.
  label: string
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  SEK: {
    code: 'SEK',
    symbol: 'kr',
    symbolPosition: 'suffix',
    locale: 'sv-SE',
    flag: '🇸🇪',
    label: 'SEK · kr',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    symbolPosition: 'prefix',
    locale: 'en-US',
    flag: '🇺🇸',
    label: 'USD · $',
  },
}
