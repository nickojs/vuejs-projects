type CurrencyProps = {
  id: string,
  value: string
}

export interface CryptoProps {
  data: {
    name: string,
    iconUrl: string,
    price: number,
    currency: string
  } | null,
  availableCryptos: Array<CurrencyProps>,
  availableCurrency: Array<CurrencyProps>,
  selectedCrypto: null | string,
  selectedCurrency: null | string,
  isFetchable: boolean,
  loading: boolean,
}
