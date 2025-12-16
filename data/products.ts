export interface ProductImages {
  hero: string;
  angle: string;
  detail: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  images: ProductImages;
  category_id: string;
  is_featured: boolean;
  flavors: string[];
  is_available: boolean;
}

// Placeholder for products without images
const PLACEHOLDER = '/placeholder.svg';

// Helper to create image object from single image path
const img = (path: string): ProductImages => ({
  hero: path,
  angle: path,
  detail: path,
});

export const products: Product[] = [
  {
    id: '1',
    name: 'IGNITE V55 5k',
    price: 115.00,
    images: img('/products/ignite_v55_5k.jpg'),
    category_id: 'descartaveis',
    is_featured: true,
    flavors: ['Strawberry Banana'],
    is_available: true
  },
  {
    id: '2',
    name: 'IGNITE V80 8k',
    price: 125.00,
    images: img('/products/ignite_v80_8k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: ['Watermelon Ice', 'Strawberry Ice'],
    is_available: true
  },
  {
    id: '3',
    name: 'IGNITE V150 15k',
    price: 135.00,
    images: img('/products/ignite_v150_15k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: ['Peppermint & Cream'],
    is_available: true
  },
  {
    id: '4',
    name: 'IGNITE V155 15k',
    price: 140.00,
    images: img('/products/ignite_v155_15k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: [],
    is_available: false
  },
  {
    id: '5',
    name: 'IGNITE V300 30k',
    price: 150.00,
    images: img('/products/ignite_v300_30k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: [],
    is_available: false
  },
  {
    id: '6',
    name: 'NIKBAR 10k',
    price: 115.00,
    images: img('/products/nikbar_10k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: ['Strawberry Raspberry', 'Menthol'],
    is_available: true
  },
  {
    id: '7',
    name: 'LOST MARY 20k',
    price: 130.00,
    images: img('/products/Lost_mary_ 20k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: ['Lime Grapefruit xx2', 'Ice Mint', 'Blue Baja Splash'],
    is_available: true
  },
  {
    id: '8',
    name: 'WAKA 25k',
    price: 145.00,
    images: img('/products/waka_25k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: ['Grape Ice'],
    is_available: true
  },
  {
    id: '9',
    name: 'SEX ADDICT 28k',
    price: 150.00,
    images: img('/products/sex_addict_28k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: ['Strawberry Banana Ice'],
    is_available: true
  },
  {
    id: '10',
    name: 'KIT ELFBAR EW 9k',
    price: 150.00,
    images: img('/products/kit_elfbar_ew_9k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: ['Grape Ice', 'Strawberry Kiwi'],
    is_available: true
  },
  {
    id: '11',
    name: 'ELFBAR GH 23k',
    price: 150.00,
    images: img('/products/elfbar_gh_23k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: ['Sprint Mint'],
    is_available: true
  },
  {
    id: '12',
    name: 'ELFBAR TE 30k',
    price: 165.00,
    images: img('/products/elfbar_te_30k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: ['Bubbaloo Tutti Frutti', 'Banana Coconut Ice'],
    is_available: true
  },
  {
    id: '13',
    name: 'ELFBAR ICE KING 40k',
    price: 170.00,
    images: img('/products/elfbar_ice_king_40k.jpeg'),
    category_id: 'descartaveis',
    is_featured: false,
    flavors: ['Double Apple Ice'],
    is_available: true
  },
  {
    id: '14',
    name: 'REFIL LIFE POD 10k',
    price: 110.00,
    images: img('/products/refil_lifePod_10k.jpeg'),
    category_id: 'refis',
    is_featured: false,
    flavors: ['Blueberry Watermelon', 'Watermelon Peach', 'Clear'],
    is_available: true
  },
  {
    id: '15',
    name: 'IGNITE P100 REFIL 10k',
    price: 120.00,
    images: img('/products/ignite_p100_refil_10k.jpeg'),
    category_id: 'refis',
    is_featured: false,
    flavors: ['Banana Ice'],
    is_available: true
  },
  {
    id: '16',
    name: 'REFIL EW 16k',
    price: 120.00,
    images: img('/products/refil_ew_16k.jpeg'),
    category_id: 'refis',
    is_featured: false,
    flavors: ['Sour Apple Ice', 'Mango Twist'],
    is_available: true
  },
  {
    id: '17',
    name: 'REFIL EW 9k',
    price: 120.00,
    images: img('/products/refil_ew_9k.jpeg'),
    category_id: 'refis',
    is_featured: false,
    flavors: ['Watermelon Ice'],
    is_available: true
  },
  {
    id: '18',
    name: 'COIL VAPORESSO 0.8 ou 1.2',
    price: 60.00,
    images: img('/products/coil_vaporesso_0.8_1.2.jpeg'),
    category_id: 'acessorios',
    is_featured: false,
    flavors: [],
    is_available: true
  },
  {
    id: '19',
    name: 'MASKKING 50 mg',
    price: 110.00,
    images: img('/products/juice_masking_50ml.jpeg'),
    category_id: 'liquidos',
    is_featured: false,
    flavors: ['Strawberry Berry Ice'],
    is_available: true
  },
  {
    id: '20',
    name: 'JUICE ALASKA 100 ML',
    price: 100.00,
    images: img('/products/juice_alaska_100ml.jpg'),
    category_id: 'liquidos',
    is_featured: false,
    flavors: ['Mixed Berries', 'Strawberry Limonade Ice', 'Tangerine Ice', 'Grape Ice'],
    is_available: true
  },
];

// Helper to get unique categories
export const getCategories = (): string[] => {
  const categoryIds = [...new Set(products.map(p => p.category_id))];
  return categoryIds;
};

// Helper to format category name
export const formatCategoryName = (categoryId: string): string => {
  const names: Record<string, string> = {
    descartaveis: 'Descartáveis',
    refis: 'Refis',
    acessorios: 'Acessórios',
    liquidos: 'Líquidos',
  };
  return names[categoryId] || categoryId;
};

// Helper to get available products
export const getAvailableProducts = (): Product[] => {
  return products.filter(p => p.is_available);
};

// Helper to filter by category
export const getProductsByCategory = (categoryId: string | null): Product[] => {
  if (!categoryId) return products;
  return products.filter(p => p.category_id === categoryId);
};
