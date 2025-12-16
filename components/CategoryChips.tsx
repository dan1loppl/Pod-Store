'use client';

import { motion } from 'framer-motion';
import { formatCategoryName } from '@/data/products';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryChips({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryChipsProps) {
  return (
    <nav
      className="sticky top-0 z-30 bg-bg/95 backdrop-blur-lg border-b border-white/5"
      aria-label="Filtro de categorias"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-1 -mb-1">
          {/* All Products Chip */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelectCategory(null)}
            className={`
              flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
              transition-all duration-300 ease-out
              ${
                selectedCategory === null
                  ? 'bg-accent text-white shadow-glow'
                  : 'bg-card text-zinc-400 hover:text-white hover:bg-card/80 border border-white/10'
              }
            `}
            aria-pressed={selectedCategory === null}
          >
            Todos
          </motion.button>

          {/* Category Chips */}
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 15px var(--accentGlow)',
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectCategory(category)}
              className={`
                flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                transition-all duration-300 ease-out
                ${
                  selectedCategory === category
                    ? 'bg-accent text-white shadow-glow'
                    : 'bg-card text-zinc-400 hover:text-white hover:bg-card/80 border border-white/10'
                }
              `}
              aria-pressed={selectedCategory === category}
            >
              {formatCategoryName(category)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gradient fade for scroll indication */}
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-bg/95 to-transparent pointer-events-none sm:hidden" />
    </nav>
  );
}
