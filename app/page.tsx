'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/Hero';
import { CategoryChips } from '@/components/CategoryChips';
import { ProductCard } from '@/components/ProductCard';
import { ProductModal } from '@/components/ProductModal';
import { GlobalCTA } from '@/components/GlobalCTA';
import { Footer } from '@/components/Footer';
import { products, getCategories, type Product } from '@/data/products';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = getCategories();

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category_id === selectedCategory)
    : products;

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing product to allow exit animation
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <main className="min-h-screen bg-bg">
      {/* Hero Section */}
      <Hero />

      {/* Category Filter */}
      <CategoryChips
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Products Grid */}
      <section className="px-3 sm:px-4 py-6 sm:py-8 max-w-7xl mx-auto" aria-label="Catálogo de produtos">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-base sm:text-lg text-zinc-400">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <Footer />

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>

      {/* Global CTA */}
      <GlobalCTA />
    </main>
  );
}
