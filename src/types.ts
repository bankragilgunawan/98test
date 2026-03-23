export type Provider = 'Telkomsel' | 'XL' | 'Indosat' | 'Tri' | 'Smartfren';

export interface Rate {
  provider: Provider;
  rate: number;
  minAmount: number;
  maxAmount: number;
}

export type DestinationType = 'Bank' | 'eWallet';

export interface Destination {
  id: string;
  name: string;
  type: DestinationType;
}

export interface Transaction {
  id: string;
  provider: Provider;
  amount: number;
  rate: number;
  receivedAmount: number;
  destination: string;
  accountNumber: string;
  accountName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
}
