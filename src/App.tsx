import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Zap, 
  Clock, 
  TrendingUp,
  Smartphone,
  CreditCard,
  MessageCircle
} from 'lucide-react';
import ExchangeForm from './components/ExchangeForm';
import { RATES } from './constants';
import { formatCurrency } from './utils';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <TrendingUp className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Pulsa<span className="text-emerald-600">Convert</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#rates" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Rate Hari Ini</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Cara Kerja</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">FAQ</a>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md shadow-emerald-100 flex items-center gap-2">
              <MessageCircle size={18} /> Hubungi Admin
            </button>
          </div>
        </div>
      </nav>

      <main className="pb-20">
        {/* Hero Section */}
        <section className="relative pt-16 pb-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold tracking-wider uppercase mb-6 border border-emerald-100">
                  Terpercaya & Aman
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                  Tukar Pulsa Jadi Saldo <span className="text-emerald-600">eWallet & Bank</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  Layanan convert pulsa terpercaya dengan rate tinggi. Tukar pulsa Telkomsel, XL, Indosat, Tri, dan Smartfren menjadi saldo DANA, OVO, GoPay, atau transfer Bank dalam hitungan menit.
                </p>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Features & Rates */}
              <div className="lg:col-span-5 space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: <Zap className="text-amber-500" />, title: "Proses Kilat", desc: "Transaksi selesai dalam 3-10 menit." },
                    { icon: <ShieldCheck className="text-emerald-500" />, title: "100% Aman", desc: "Keamanan data dan saldo terjamin." },
                    { icon: <Clock className="text-blue-500" />, title: "24/7 Layanan", desc: "Siap melayani kapanpun Anda butuh." },
                    { icon: <TrendingUp className="text-purple-500" />, title: "Rate Tinggi", desc: "Rate bersaing mengikuti pasar harian." },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">{feature.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div id="rates" className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Rate Hari Ini</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update: 23 Mar 2026</span>
                  </div>
                  <div className="space-y-4">
                    {RATES.map((rate) => (
                      <div key={rate.provider} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Smartphone size={16} className="text-slate-400" />
                          </div>
                          <span className="font-bold text-slate-700">{rate.provider}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-xs text-slate-400 font-medium">Min. {formatCurrency(rate.minAmount)}</div>
                          </div>
                          <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg font-bold text-sm">
                            {rate.rate}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Exchange Form */}
              <div className="lg:col-span-7">
                <ExchangeForm />
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Cara Kerja PulsaConvert</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Hanya butuh 3 langkah mudah untuk menukarkan pulsa Anda menjadi saldo.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { step: "01", title: "Isi Formulir", desc: "Pilih provider, masukkan jumlah pulsa, dan tentukan tujuan pengiriman saldo Anda." },
                { step: "02", title: "Transfer Pulsa", desc: "Lakukan transfer pulsa ke nomor admin yang tertera sesuai dengan instruksi yang diberikan." },
                { step: "03", title: "Terima Saldo", desc: "Setelah pulsa masuk, tim kami akan segera memproses pengiriman saldo ke rekening/eWallet Anda." },
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="text-7xl font-black text-slate-50 mb-[-30px] transition-colors group-hover:text-emerald-50">{item.step}</div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Pertanyaan Umum</h2>
              <p className="text-slate-500">Beberapa hal yang sering ditanyakan oleh pengguna kami.</p>
            </div>

            <div className="space-y-4">
              {[
                { q: "Berapa lama proses penukaran pulsa?", a: "Proses penukaran biasanya memakan waktu 3-10 menit setelah pulsa kami terima dan validasi." },
                { q: "Apakah ada biaya admin tambahan?", a: "Tidak ada biaya admin tambahan. Saldo yang Anda terima adalah sesuai dengan perhitungan rate yang tertera." },
                { q: "Provider apa saja yang didukung?", a: "Saat ini kami mendukung Telkomsel, XL, Axis, Indosat, Tri, dan Smartfren." },
                { q: "Bagaimana jika pulsa sudah dikirim tapi saldo belum masuk?", a: "Jangan khawatir, silakan hubungi admin kami melalui WhatsApp dengan melampirkan bukti transfer pulsa Anda." },
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold tracking-tight">Pulsa<span className="text-emerald-500">Convert</span></span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
                Platform penukaran pulsa terpercaya di Indonesia. Kami berkomitmen memberikan rate terbaik dan pelayanan tercepat untuk setiap transaksi Anda.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors cursor-pointer">
                  <MessageCircle size={20} />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors cursor-pointer">
                  <Smartphone size={20} />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Layanan</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="hover:text-emerald-500 cursor-pointer transition-colors">Convert Telkomsel</li>
                <li className="hover:text-emerald-500 cursor-pointer transition-colors">Convert XL / Axis</li>
                <li className="hover:text-emerald-500 cursor-pointer transition-colors">Convert Indosat</li>
                <li className="hover:text-emerald-500 cursor-pointer transition-colors">Convert Tri</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Bantuan</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="hover:text-emerald-500 cursor-pointer transition-colors">Cara Kerja</li>
                <li className="hover:text-emerald-500 cursor-pointer transition-colors">Syarat & Ketentuan</li>
                <li className="hover:text-emerald-500 cursor-pointer transition-colors">Kebijakan Privasi</li>
                <li className="hover:text-emerald-500 cursor-pointer transition-colors">Hubungi Kami</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
            <p>© 2026 PulsaConvert. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Powered by Google AI Studio</span>
              <span>Made with ❤️ for Indonesia</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
