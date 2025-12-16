'use client';

import { motion } from 'framer-motion';
import { ProductImage } from './ProductImage';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: () => void;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: index * 0.05,
      ease: 'easeOut',
    },
  }),
};

// Mapeamento de cores por tipo de sabor
const getFlavorColor = (flavor: string): { bg: string; border: string; text: string } => {
  const f = flavor.toLowerCase();

  if (f.includes('strawberry') || f.includes('morango')) {
    return { bg: 'bg-red-500/15', border: 'border-red-500/30', text: 'text-red-300' };
  }
  if (f.includes('banana')) {
    return { bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', text: 'text-yellow-300' };
  }
  if (f.includes('watermelon') || f.includes('melancia')) {
    return { bg: 'bg-green-500/15', border: 'border-green-500/30', text: 'text-green-300' };
  }
  if (f.includes('grape') || f.includes('uva')) {
    return { bg: 'bg-purple-500/15', border: 'border-purple-500/30', text: 'text-purple-300' };
  }
  if (f.includes('mint') || f.includes('menthol') || f.includes('menta') || f === 'ice') {
    return { bg: 'bg-cyan-500/15', border: 'border-cyan-500/30', text: 'text-cyan-300' };
  }
  if (f.includes('apple') || f.includes('maçã')) {
    return { bg: 'bg-green-400/15', border: 'border-green-400/30', text: 'text-green-300' };
  }
  if (f.includes('mango') || f.includes('manga')) {
    return { bg: 'bg-orange-500/15', border: 'border-orange-500/30', text: 'text-orange-300' };
  }
  if (f.includes('peach') || f.includes('pêssego')) {
    return { bg: 'bg-orange-400/15', border: 'border-orange-400/30', text: 'text-orange-300' };
  }
  if (f.includes('blueberry') || f.includes('blue') || f.includes('mirtilo')) {
    return { bg: 'bg-blue-500/15', border: 'border-blue-500/30', text: 'text-blue-300' };
  }
  if (f.includes('lime') || f.includes('lemon') || f.includes('limão')) {
    return { bg: 'bg-lime-500/15', border: 'border-lime-500/30', text: 'text-lime-300' };
  }
  if (f.includes('kiwi')) {
    return { bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', text: 'text-emerald-300' };
  }
  if (f.includes('coconut') || f.includes('coco')) {
    return { bg: 'bg-amber-100/15', border: 'border-amber-100/30', text: 'text-amber-200' };
  }
  if (f.includes('raspberry') || f.includes('framboesa')) {
    return { bg: 'bg-pink-500/15', border: 'border-pink-500/30', text: 'text-pink-300' };
  }
  if (f.includes('tutti') || f.includes('splash') || f.includes('twist')) {
    return { bg: 'bg-fuchsia-500/15', border: 'border-fuchsia-500/30', text: 'text-fuchsia-300' };
  }
  if (f.includes('clear') || f.includes('neutro')) {
    return { bg: 'bg-slate-500/15', border: 'border-slate-500/30', text: 'text-slate-300' };
  }
  if (f.includes('grapefruit')) {
    return { bg: 'bg-rose-500/15', border: 'border-rose-500/30', text: 'text-rose-300' };
  }
  if (f.includes('ice')) {
    return { bg: 'bg-sky-500/15', border: 'border-sky-500/30', text: 'text-sky-300' };
  }
  return { bg: 'bg-white/5', border: 'border-white/10', text: 'text-zinc-400' };
};

export function ProductCard({ product, index, onClick }: ProductCardProps) {
  const isUnavailable = !product.is_available;

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={
        !isUnavailable
          ? {
              scale: 1.03,
              boxShadow: '0 0 20px var(--accentGlow)',
            }
          : {}
      }
      whileTap={!isUnavailable ? { scale: 0.97 } : {}}
      transition={{ duration: 0.3 }}
      onClick={!isUnavailable ? onClick : undefined}
      className={`
        relative bg-card rounded-2xl overflow-hidden
        border border-white/5 cursor-pointer
        transition-colors duration-300
        ${isUnavailable ? 'opacity-60 cursor-not-allowed' : 'hover:border-accent/30'}
      `}
      role="button"
      tabIndex={isUnavailable ? -1 : 0}
      aria-label={`Ver detalhes de ${product.name}`}
      aria-disabled={isUnavailable}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !isUnavailable) onClick();
      }}
    >
      {/* Featured Badge */}
      {product.is_featured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-1 text-xs font-bold bg-accent text-white rounded-full shadow-glow">
            ⭐ Destaque
          </span>
        </div>
      )}

      {/* Unavailable Badge */}
      {isUnavailable && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 text-xs font-bold bg-red-500/80 text-white rounded-full">
            Esgotado
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-b from-card to-black/50 overflow-hidden">
        <ProductImage
          src={product.images.hero}
          alt={`${product.name} - Cigarro eletrônico`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
          fallbackText={product.name}
          className={`
            object-cover transition-transform duration-500
            ${!isUnavailable ? 'group-hover:scale-110' : 'grayscale'}
          `}
        />

        {/* Glow overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Product Name */}
        <h3 className="text-base sm:text-lg font-bold text-white truncate" title={product.name}>
          {product.name}
        </h3>

        {/* Flavors Preview */}
        {product.flavors.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.flavors.slice(0, 2).map((flavor) => {
              const colors = getFlavorColor(flavor);
              return (
                <span
                  key={flavor}
                  className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full border ${colors.bg} ${colors.border} ${colors.text}`}
                >
                  {flavor}
                </span>
              );
            })}
            {product.flavors.length > 2 && (
              <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">
                +{product.flavors.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <span className="text-lg sm:text-xl font-bold text-accent">
            R$ {product.price.toFixed(2)}
          </span>

          <motion.button
            whileHover={!isUnavailable ? { scale: 1.05 } : {}}
            whileTap={!isUnavailable ? { scale: 0.95 } : {}}
            disabled={isUnavailable}
            className={`
              px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold
              transition-all duration-300 min-h-[36px] touch-manipulation
              ${
                isUnavailable
                  ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                  : 'bg-accent hover:bg-accent/80 text-white shadow-glow active:scale-95'
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              if (!isUnavailable) onClick();
            }}
          >
            {isUnavailable ? 'Esgotado' : 'Ver mais'}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
