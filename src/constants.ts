import { Rate, Destination } from './types';

export const RATES: Rate[] = [
  { provider: 'Telkomsel', rate: 0.80, minAmount: 30000, maxAmount: 1000000 },
  { provider: 'XL', rate: 0.78, minAmount: 25000, maxAmount: 1000000 },
  { provider: 'Indosat', rate: 0.75, minAmount: 25000, maxAmount: 1000000 },
  { provider: 'Tri', rate: 0.72, minAmount: 20000, maxAmount: 1000000 },
  { provider: 'Smartfren', rate: 0.70, minAmount: 50000, maxAmount: 1000000 },
];

export const DESTINATIONS: Destination[] = [
  { id: 'dana', name: 'DANA', type: 'eWallet' },
  { id: 'gopay', name: 'GoPay', type: 'eWallet' },
  { id: 'ovo', name: 'OVO', type: 'eWallet' },
  { id: 'shopeepay', name: 'ShopeePay', type: 'eWallet' },
  { id: 'bca', name: 'BCA', type: 'Bank' },
  { id: 'bni', name: 'BNI', type: 'Bank' },
  { id: 'bri', name: 'BRI', type: 'Bank' },
  { id: 'mandiri', name: 'Mandiri', type: 'Bank' },
];
