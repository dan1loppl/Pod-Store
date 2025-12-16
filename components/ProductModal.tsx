'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { ProductImage } from './ProductImage';
import type { Product } from '@/data/products';
import { formatCategoryName } from '@/data/products';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

// Mapeamento de cores por tipo de sabor
const getFlavorColor = (flavor: string): { bg: string; border: string; text: string } => {
  const f = flavor.toLowerCase();

  if (f.includes('strawberry') || f.includes('morango')) {
    return { bg: 'bg-red-500/20', border: 'border-red-500/40', text: 'text-red-300' };
  }
  if (f.includes('banana')) {
    return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-300' };
  }
  if (f.includes('watermelon') || f.includes('melancia')) {
    return { bg: 'bg-green-500/20', border: 'border-green-500/40', text: 'text-green-300' };
  }
  if (f.includes('grape') || f.includes('uva')) {
    return { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-300' };
  }
  if (f.includes('mint') || f.includes('menthol') || f.includes('menta') || f === 'ice') {
    return { bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', text: 'text-cyan-300' };
  }
  if (f.includes('apple') || f.includes('maçã')) {
    return { bg: 'bg-green-400/20', border: 'border-green-400/40', text: 'text-green-300' };
  }
  if (f.includes('mango') || f.includes('manga')) {
    return { bg: 'bg-orange-500/20', border: 'border-orange-500/40', text: 'text-orange-300' };
  }
  if (f.includes('peach') || f.includes('pêssego')) {
    return { bg: 'bg-orange-400/20', border: 'border-orange-400/40', text: 'text-orange-300' };
  }
  if (f.includes('blueberry') || f.includes('blue') || f.includes('mirtilo')) {
    return { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-300' };
  }
  if (f.includes('lime') || f.includes('lemon') || f.includes('limão')) {
    return { bg: 'bg-lime-500/20', border: 'border-lime-500/40', text: 'text-lime-300' };
  }
  if (f.includes('kiwi')) {
    return { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-300' };
  }
  if (f.includes('coconut') || f.includes('coco')) {
    return { bg: 'bg-amber-200/20', border: 'border-amber-200/40', text: 'text-amber-200' };
  }
  if (f.includes('raspberry') || f.includes('framboesa')) {
    return { bg: 'bg-pink-500/20', border: 'border-pink-500/40', text: 'text-pink-300' };
  }
  if (f.includes('tutti') || f.includes('splash') || f.includes('twist')) {
    return { bg: 'bg-fuchsia-500/20', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300' };
  }
  if (f.includes('clear') || f.includes('neutro')) {
    return { bg: 'bg-slate-500/20', border: 'border-slate-500/40', text: 'text-slate-300' };
  }
  if (f.includes('grapefruit')) {
    return { bg: 'bg-rose-500/20', border: 'border-rose-500/40', text: 'text-rose-300' };
  }
  if (f.includes('ice')) {
    return { bg: 'bg-sky-500/20', border: 'border-sky-500/40', text: 'text-sky-300' };
  }
  return { bg: 'bg-accent/15', border: 'border-accent/30', text: 'text-white' };
};

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no produto: ${product.name} - R$ ${product.price.toFixed(2)}`
    );
    window.open(`https://wa.me/5561982131123?text=${message}`, '_blank');
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md" />

        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2
                     w-[calc(100vw-1.5rem)] max-w-md
                     bg-gradient-to-b from-zinc-900 to-card
                     rounded-3xl border border-white/10 shadow-2xl shadow-accent/5
                     overflow-hidden"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* Close Button - Floating */}
          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 z-30 w-8 h-8 flex items-center justify-center
                         rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70
                         transition-all duration-200 backdrop-blur-sm"
              aria-label="Fechar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Dialog.Close>

          {/* Image - Compact */}
          <div className="relative h-44 sm:h-52 bg-black overflow-hidden">
            <ProductImage
              src={product.images.hero}
              alt={product.name}
              fill
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-contain"
              fallbackText={product.name}
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />

            {/* Category badge overlay */}
            <div className="absolute bottom-3 left-4">
              <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider
                             rounded-full bg-accent/30 text-accent border border-accent/40 backdrop-blur-sm">
                {formatCategoryName(product.category_id)}
              </span>
            </div>

            {/* Availability indicator */}
            <div className="absolute bottom-3 right-4">
              <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider
                             rounded-full backdrop-blur-sm flex items-center gap-1.5
                             ${product.is_available
                               ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                               : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${product.is_available ? 'bg-green-400' : 'bg-red-400'}`} />
                {product.is_available ? 'Disponível' : 'Esgotado'}
              </span>
            </div>
          </div>

          {/* Content - Compact */}
          <div className="p-4 space-y-3">
            {/* Title + Price Row */}
            <div className="flex items-start justify-between gap-3">
              <Dialog.Title
                id="modal-title"
                className="text-lg sm:text-xl font-bold text-white leading-tight flex-1"
              >
                {product.name}
              </Dialog.Title>
              <div className="text-right flex-shrink-0">
                <span className="text-xl sm:text-2xl font-bold text-accent">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Flavors - Compact horizontal scroll */}
            {product.flavors.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                  Sabores
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.flavors.map((flavor) => {
                    const colors = getFlavorColor(flavor);
                    return (
                      <span
                        key={flavor}
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs
                                   ${colors.bg} border ${colors.border} ${colors.text}`}
                      >
                        {flavor}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Hidden description for accessibility */}
            <Dialog.Description id="modal-description" className="sr-only">
              {product.name} - Cigarro eletrônico disponível por R$ {product.price.toFixed(2)}
            </Dialog.Description>

            {/* CTA Button */}
            <button
              onClick={handleWhatsApp}
              disabled={!product.is_available}
              className={`
                w-full py-3 rounded-xl font-bold text-sm
                flex items-center justify-center gap-2
                transition-all duration-200 active:scale-[0.98]
                ${
                  product.is_available
                    ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/25'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }
              `}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {product.is_available ? 'Comprar via WhatsApp' : 'Produto Esgotado'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
