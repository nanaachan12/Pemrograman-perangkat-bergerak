
export const formatPrice = (
  value: string | number, 
  currency: string,
  exchangeRate: number | null,
  isCurrency = true, 
  decimals = 2, 
  maxDecimals = 6
): string => {
  let displayValue = parseFloat(value as string);
  let displayCurrency = 'USD';
  let locale = 'en-US';

  if (isCurrency && currency === 'IDR' && exchangeRate) {
    displayValue = displayValue * exchangeRate;
    displayCurrency = 'IDR';
    locale = 'id-ID'; 
    if (decimals === 2) decimals = 0; 
    if (maxDecimals === 6) maxDecimals = 0;
  } else if (isCurrency && currency === 'IDR' && !exchangeRate) {
    return '...';
  }

  const options: Intl.NumberFormatOptions = isCurrency
    ? {
        style: 'currency',
        currency: displayCurrency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: maxDecimals,
      }
    : {
        style: 'decimal',
        minimumFractionDigits: decimals,
        maximumFractionDigits: maxDecimals,
      };
  
  if (isNaN(displayValue)) {
    return isCurrency ? (displayCurrency === 'IDR' ? 'Rp0' : '$0.00') : '0';
  }

  return displayValue.toLocaleString(locale, options);
};