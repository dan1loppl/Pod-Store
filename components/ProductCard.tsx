'use client';

import { motion } from 'framer-motion';
import { ProductImage } from './ProductImage';
import type { Product } from '@/data/products';
import { getFlavorBadgeClasses } from '@/lib/flavorColors';

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

const FLAVOR_BASE_CLASS = 'text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full border';

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
        group
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
            object-contain transition-transform duration-500
            ${!isUnavailable ? 'group-hover:scale-105' : 'grayscale'}
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
          <div className="flex flex-wrap gap-1.5">
            {product.flavors.map((flavor) => {
              const colors = getFlavorBadgeClasses(flavor, 'subtle');
              return (
                <span
                  key={flavor}
                  className={`${FLAVOR_BASE_CLASS} ${colors.bg} ${colors.border} ${colors.text}`}
                >
                  {flavor}
                </span>
              );
            })}
          </div>
        )}

        {/* Availability (não depende só de cor) */}
        {!isUnavailable && (
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
              <span>Disponível</span>
            </span>
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
