'use client';

import { motion } from 'framer-motion';

export function Footer() {
  const footerItems = [
    {
      icon: '💰',
      title: 'PIX',
      description: '61982131123',
      note: 'É obrigatório o comprovante',
    },
    {
      icon: '💳',
      title: 'Cartão',
      description: 'Consulte a Taxa',
      note: 'Aceitamos todas as bandeiras',
    },
  ];

  return (
    <footer className="bg-card/50 border-t border-white/5 pb-28 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Payment Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          {footerItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-bg/50 border border-white/5"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-2xl sm:text-3xl">{item.icon}</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-lg sm:text-xl font-mono text-accent">{item.description}</p>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">{item.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Age Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center py-6 sm:py-8 border-t border-white/5"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-red-500/10 border border-red-500/30">
            <span className="text-xl sm:text-2xl">🔞</span>
            <p className="text-sm sm:text-base text-red-400 font-semibold">
              PROIBIDO PARA MENORES DE 18 ANOS
            </p>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center pt-8"
        >
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
          <p className="text-xs text-zinc-700 mt-2">
            Catálogo informativo • Proibido para menores de 18 anos
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
