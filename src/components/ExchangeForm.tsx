import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Smartphone, 
  Wallet, 
  Calculator, 
  CheckCircle2, 
  AlertCircle,
  ChevronDown,
  Info
} from 'lucide-react';
import { RATES, DESTINATIONS } from '../constants';
import { Provider, Rate, Destination } from '../types';
import { cn, formatCurrency } from '../utils';

export default function ExchangeForm() {
  const [provider, setProvider] = useState<Provider>(RATES[0].provider);
  const [amount, setAmount] = useState<number>(50000);
  const [destination, setDestination] = useState<string>(DESTINATIONS[0].id);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentRate = RATES.find(r => r.provider === provider) || RATES[0];
  const receivedAmount = amount * currentRate.rate;

  const handleNext = () => {
    if (step === 1) {
      if (amount < currentRate.minAmount) return;
      setStep(2);
    } else if (step === 2) {
      if (!accountNumber || !accountName) return;
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setStep(4);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* Progress Bar */}
      <div className="flex h-1.5 bg-gray-100">
        {[1, 2, 3, 4].map((s) => (
          <div 
            key={s} 
            className={cn(
              "flex-1 transition-all duration-500",
              step >= s ? "bg-emerald-500" : "bg-transparent"
            )}
          />
        ))}
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <Calculator size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Hitung Penukaran</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Provider Pulsa</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {RATES.map((r) => (
                      <button
                        key={r.provider}
                        onClick={() => setProvider(r.provider)}
                        className={cn(
                          "px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium",
                          provider === r.provider 
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700" 
                            : "border-gray-100 hover:border-gray-200 text-gray-600"
                        )}
                      >
                        {r.provider}
                        <div className="text-[10px] opacity-60 mt-0.5">Rate: {r.rate}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Pulsa (Min. {formatCurrency(currentRate.minAmount)})</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-400 font-medium">Rp</span>
                    </div>
                    <input
                      type="number"
                      value={amount || ''}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 text-lg font-semibold"
                      placeholder="0"
                    />
                  </div>
                  {amount < currentRate.minAmount && amount > 0 && (
                    <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> Minimal penukaran {formatCurrency(currentRate.minAmount)}
                    </p>
                  )}
                </div>

                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-emerald-700">Anda akan menerima:</span>
                    <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-medium">Rate {currentRate.rate}</span>
                  </div>
                  <div className="text-3xl font-bold text-emerald-900">
                    {formatCurrency(receivedAmount)}
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={amount < currentRate.minAmount}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
              >
                Lanjut ke Tujuan <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setStep(1)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                  <ArrowRight className="rotate-180" size={20} />
                </button>
                <h2 className="text-xl font-semibold text-gray-900">Tujuan Pengiriman</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Bank / eWallet</label>
                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto p-1">
                    {DESTINATIONS.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setDestination(d.id)}
                        className={cn(
                          "px-4 py-3 rounded-xl border-2 transition-all text-sm font-medium text-left",
                          destination === d.id 
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700" 
                            : "border-gray-100 hover:border-gray-200 text-gray-600"
                        )}
                      >
                        {d.name}
                        <div className="text-[10px] opacity-60 mt-0.5">{d.type}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Rekening / HP</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="block w-full px-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium"
                    placeholder="Contoh: 081234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pemilik Rekening</label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="block w-full px-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 font-medium"
                    placeholder="Nama sesuai di Bank/eWallet"
                  />
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={!accountNumber || !accountName}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
              >
                Konfirmasi Pesanan <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setStep(2)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                  <ArrowRight className="rotate-180" size={20} />
                </button>
                <h2 className="text-xl font-semibold text-gray-900">Konfirmasi Akhir</h2>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 space-y-4 border border-gray-100">
                <div className="flex justify-between items-center pb-4 border-bottom border-gray-200">
                  <span className="text-gray-500 text-sm">Provider</span>
                  <span className="font-bold text-gray-900">{provider}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-bottom border-gray-200">
                  <span className="text-gray-500 text-sm">Jumlah Pulsa</span>
                  <span className="font-bold text-gray-900">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-bottom border-gray-200">
                  <span className="text-gray-500 text-sm">Tujuan</span>
                  <span className="font-bold text-gray-900">{DESTINATIONS.find(d => d.id === destination)?.name}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-bottom border-gray-200">
                  <span className="text-gray-500 text-sm">Nomor Rekening</span>
                  <span className="font-bold text-gray-900">{accountNumber}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-bottom border-gray-200">
                  <span className="text-gray-500 text-sm">Nama Pemilik</span>
                  <span className="font-bold text-gray-900 uppercase">{accountName}</span>
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-gray-200">
                  <span className="text-emerald-700 font-medium">Total Diterima</span>
                  <span className="text-2xl font-bold text-emerald-600">{formatCurrency(receivedAmount)}</span>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
                <Info className="text-amber-600 shrink-0" size={20} />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Pastikan data sudah benar. Setelah klik konfirmasi, Anda akan diarahkan untuk melakukan transfer pulsa ke nomor admin kami.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Buat Pesanan Sekarang <CheckCircle2 size={20} /></>
                )}
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Pesanan Berhasil Dibuat!</h2>
                <p className="text-gray-500">Silakan ikuti instruksi di bawah untuk menyelesaikan transaksi.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-left space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Smartphone size={18} className="text-emerald-600" />
                  Transfer Pulsa Ke:
                </h3>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 flex justify-between items-center">
                  <span className="text-xl font-mono font-bold text-emerald-700 tracking-wider">0812-3456-7890</span>
                  <button className="text-xs font-bold text-emerald-600 hover:underline">Salin</button>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-bold text-gray-700">Cara Transfer {provider}:</p>
                  <ol className="text-xs text-gray-600 space-y-2 list-decimal pl-4">
                    <li>Buka menu panggilan/dial di HP Anda.</li>
                    <li>Ketik <span className="font-mono font-bold">*858*081234567890*{amount}#</span></li>
                    <li>Tekan panggil/call.</li>
                    <li>Konfirmasi transfer sesuai instruksi operator.</li>
                    <li>Simpan bukti transfer (SMS/Screenshot).</li>
                  </ol>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-bold transition-all"
                >
                  Selesai
                </button>
                <button 
                  className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  Konfirmasi WA
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
