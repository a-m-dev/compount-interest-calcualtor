import { Currency } from '../types'
import { CURRENCIES } from '../constants/currencies'

export const formatNumber = (num: string | number): string => {
  return new Intl.NumberFormat('sv-SE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(Number(num)))
}

export const formatCurrency = (num: number, currency: Currency = 'SEK'): string => {
  const config = CURRENCIES[currency]
  const formatted = new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
  return config.symbolPosition === 'prefix'
    ? `${config.symbol}${formatted}`
    : `${formatted} ${config.symbol}`
}
