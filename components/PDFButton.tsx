'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PDFButtonProps {
  className?: string;
}

export function PDFButton({ className = '' }: PDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGeneratePDF = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setProgress(0);

    try {
      // Import dinâmico para não carregar a biblioteca no bundle inicial
      const { generateCatalogPDF } = await import('@/lib/generateCatalogPDF');

      await generateCatalogPDF((p) => {
        setProgress(p);
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o PDF. Tente novamente.');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={handleGeneratePDF}
        disabled={isGenerating}
        whileHover={!isGenerating ? { scale: 1.02 } : {}}
        whileTap={!isGenerating ? { scale: 0.98 } : {}}
        className={`
          relative overflow-hidden
          flex items-center gap-2 px-4 py-2.5 rounded-xl
          font-semibold text-sm
          transition-all duration-300
          ${isGenerating
            ? 'bg-accent/20 text-accent cursor-wait'
            : 'bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 hover:border-accent/50'
          }
        `}
      >
        {/* Progress bar background */}
        {isGenerating && (
          <motion.div
            className="absolute inset-0 bg-accent/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Icon */}
        <span className="relative z-10">
          {isGenerating ? (
            <motion.svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </motion.svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          )}
        </span>

        {/* Text */}
        <span className="relative z-10">
          {isGenerating ? `Gerando... ${progress}%` : 'Baixar Catálogo PDF'}
        </span>
      </motion.button>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-full left-0 right-0 mt-2 p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm text-center"
          >
            ✅ PDF baixado com sucesso!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
