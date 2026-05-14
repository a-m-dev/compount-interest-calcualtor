import { Currency } from '../types'

export interface CurrencyConfig {
  code: Currency
  // 'kr', '$', '€', etc.
  symbol: string
  // Where the symbol sits relative to the number.
  symbolPosition: 'prefix' | 'suffix'
  // Intl locale used for thousand/decimal separators (e.g. 'sv-SE' uses space + comma).
  locale: string
  // Emoji flag shown in the currency selector.
  flag: string
  // Human-friendly label for the dropdown option.
  label: string
  // Number of fractional digits to show (e.g. 0 for JPY, 2 for most others).
  decimals: number
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    symbolPosition: 'prefix',
    locale: 'en-US',
    flag: '🇺🇸',
    label: 'USD · $',
    decimals: 2,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    symbolPosition: 'suffix',
    locale: 'de-DE',
    flag: '🇪🇺',
    label: 'EUR · €',
    decimals: 2,
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    symbolPosition: 'prefix',
    locale: 'ja-JP',
    flag: '🇯🇵',
    label: 'JPY · ¥',
    decimals: 0,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    symbolPosition: 'prefix',
    locale: 'en-GB',
    flag: '🇬🇧',
    label: 'GBP · £',
    decimals: 2,
  },
  CHF: {
    code: 'CHF',
    symbol: 'Fr.',
    symbolPosition: 'suffix',
    locale: 'de-CH',
    flag: '🇨🇭',
    label: 'CHF · Fr.',
    decimals: 2,
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    symbolPosition: 'prefix',
    locale: 'en-CA',
    flag: '🇨🇦',
    label: 'CAD · C$',
    decimals: 2,
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    symbolPosition: 'prefix',
    locale: 'en-AU',
    flag: '🇦🇺',
    label: 'AUD · A$',
    decimals: 2,
  },
  NZD: {
    code: 'NZD',
    symbol: 'NZ$',
    symbolPosition: 'prefix',
    locale: 'en-NZ',
    flag: '🇳🇿',
    label: 'NZD · NZ$',
    decimals: 2,
  },
  SEK: {
    code: 'SEK',
    symbol: 'kr',
    symbolPosition: 'suffix',
    locale: 'sv-SE',
    flag: '🇸🇪',
    label: 'SEK · kr',
    decimals: 2,
  },
  NOK: {
    code: 'NOK',
    symbol: 'kr',
    symbolPosition: 'suffix',
    locale: 'nb-NO',
    flag: '🇳🇴',
    label: 'NOK · kr',
    decimals: 2,
  },
  CNY: {
    code: 'CNY',
    symbol: '¥',
    symbolPosition: 'prefix',
    locale: 'zh-CN',
    flag: '🇨🇳',
    label: 'CNY · ¥',
    decimals: 2,
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    symbolPosition: 'prefix',
    locale: 'en-IN',
    flag: '🇮🇳',
    label: 'INR · ₹',
    decimals: 2,
  },
}
