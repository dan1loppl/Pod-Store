export type RGB = [number, number, number];

type BadgeClasses = { bg: string; border: string; text: string };

// Centraliza o mapeamento para manter consistência entre Site e PDF.
// Observação: as classes Tailwind precisam ser strings estáticas (nada de template dinâmico),
// senão podem ser removidas pelo purge.
const CLASS_MAP = {
  red: {
    subtle: { bg: 'bg-red-500/15', border: 'border-red-500/30', text: 'text-red-300' },
    strong: { bg: 'bg-red-500/20', border: 'border-red-500/40', text: 'text-red-300' },
  },
  yellow: {
    subtle: { bg: 'bg-yellow-500/15', border: 'border-yellow-500/30', text: 'text-yellow-300' },
    strong: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-300' },
  },
  green: {
    subtle: { bg: 'bg-green-500/15', border: 'border-green-500/30', text: 'text-green-300' },
    strong: { bg: 'bg-green-500/20', border: 'border-green-500/40', text: 'text-green-300' },
  },
  greenLight: {
    subtle: { bg: 'bg-green-400/15', border: 'border-green-400/30', text: 'text-green-300' },
    strong: { bg: 'bg-green-400/20', border: 'border-green-400/40', text: 'text-green-300' },
  },
  purple: {
    subtle: { bg: 'bg-purple-500/15', border: 'border-purple-500/30', text: 'text-purple-300' },
    strong: { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-300' },
  },
  cyan: {
    subtle: { bg: 'bg-cyan-500/15', border: 'border-cyan-500/30', text: 'text-cyan-300' },
    strong: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', text: 'text-cyan-300' },
  },
  orange: {
    subtle: { bg: 'bg-orange-500/15', border: 'border-orange-500/30', text: 'text-orange-300' },
    strong: { bg: 'bg-orange-500/20', border: 'border-orange-500/40', text: 'text-orange-300' },
  },
  orangeLight: {
    subtle: { bg: 'bg-orange-400/15', border: 'border-orange-400/30', text: 'text-orange-300' },
    strong: { bg: 'bg-orange-400/20', border: 'border-orange-400/40', text: 'text-orange-300' },
  },
  blue: {
    subtle: { bg: 'bg-blue-500/15', border: 'border-blue-500/30', text: 'text-blue-300' },
    strong: { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-300' },
  },
  lime: {
    subtle: { bg: 'bg-lime-500/15', border: 'border-lime-500/30', text: 'text-lime-300' },
    strong: { bg: 'bg-lime-500/20', border: 'border-lime-500/40', text: 'text-lime-300' },
  },
  emerald: {
    subtle: { bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', text: 'text-emerald-300' },
    strong: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/40', text: 'text-emerald-300' },
  },
  amber: {
    subtle: { bg: 'bg-amber-100/15', border: 'border-amber-100/30', text: 'text-amber-200' },
    strong: { bg: 'bg-amber-200/20', border: 'border-amber-200/40', text: 'text-amber-200' },
  },
  pink: {
    subtle: { bg: 'bg-pink-500/15', border: 'border-pink-500/30', text: 'text-pink-300' },
    strong: { bg: 'bg-pink-500/20', border: 'border-pink-500/40', text: 'text-pink-300' },
  },
  fuchsia: {
    subtle: { bg: 'bg-fuchsia-500/15', border: 'border-fuchsia-500/30', text: 'text-fuchsia-300' },
    strong: { bg: 'bg-fuchsia-500/20', border: 'border-fuchsia-500/40', text: 'text-fuchsia-300' },
  },
  slate: {
    subtle: { bg: 'bg-slate-500/15', border: 'border-slate-500/30', text: 'text-slate-300' },
    strong: { bg: 'bg-slate-500/20', border: 'border-slate-500/40', text: 'text-slate-300' },
  },
  rose: {
    subtle: { bg: 'bg-rose-500/15', border: 'border-rose-500/30', text: 'text-rose-300' },
    strong: { bg: 'bg-rose-500/20', border: 'border-rose-500/40', text: 'text-rose-300' },
  },
  sky: {
    subtle: { bg: 'bg-sky-500/15', border: 'border-sky-500/30', text: 'text-sky-300' },
    strong: { bg: 'bg-sky-500/20', border: 'border-sky-500/40', text: 'text-sky-300' },
  },
  accent: {
    subtle: { bg: 'bg-accent/15', border: 'border-accent/30', text: 'text-white' },
    strong: { bg: 'bg-accent/15', border: 'border-accent/30', text: 'text-white' },
  },
} as const;

type FlavorKey = keyof typeof CLASS_MAP;

type Strength = keyof (typeof CLASS_MAP)[FlavorKey];

export function getFlavorBadgeClasses(flavor: string, strength: Strength = 'subtle'): BadgeClasses {
  const key = getFlavorKey(flavor);
  return CLASS_MAP[key][strength];
}

export function getFlavorColorRGB(flavor: string): RGB {
  const key = getFlavorKey(flavor);
  switch (key) {
    case 'red':
      return [239, 68, 68];
    case 'yellow':
      return [234, 179, 8];
    case 'green':
      return [34, 197, 94];
    case 'greenLight':
      return [74, 222, 128];
    case 'purple':
      return [168, 85, 247];
    case 'cyan':
      return [6, 182, 212];
    case 'orange':
      return [249, 115, 22];
    case 'orangeLight':
      return [251, 146, 60];
    case 'blue':
      return [59, 130, 246];
    case 'lime':
      return [132, 204, 22];
    case 'emerald':
      return [16, 185, 129];
    case 'amber':
      return [217, 119, 6];
    case 'pink':
      return [236, 72, 153];
    case 'fuchsia':
      return [217, 70, 239];
    case 'slate':
      return [148, 163, 184];
    case 'rose':
      return [244, 63, 94];
    case 'sky':
      return [14, 165, 233];
    case 'accent':
    default:
      return [160, 32, 240];
  }
}

function getFlavorKey(flavor: string): FlavorKey {
  const f = flavor.toLowerCase();

  if (f.includes('strawberry') || f.includes('morango')) return 'red';
  if (f.includes('banana')) return 'yellow';
  if (f.includes('watermelon') || f.includes('melancia')) return 'green';
  if (f.includes('grape') || f.includes('uva')) return 'purple';
  if (f.includes('mint') || f.includes('menthol') || f.includes('menta') || f === 'ice') return 'cyan';
  if (f.includes('apple') || f.includes('maçã')) return 'greenLight';
  if (f.includes('mango') || f.includes('manga')) return 'orange';
  if (f.includes('peach') || f.includes('pêssego')) return 'orangeLight';
  if (f.includes('blueberry') || f.includes('mirtilo') || f.includes('blue')) return 'blue';
  if (f.includes('lime') || f.includes('lemon') || f.includes('limão')) return 'lime';
  if (f.includes('kiwi')) return 'emerald';
  if (f.includes('coconut') || f.includes('coco')) return 'amber';
  if (f.includes('raspberry') || f.includes('framboesa')) return 'pink';
  if (f.includes('tutti') || f.includes('splash') || f.includes('twist')) return 'fuchsia';
  if (f.includes('clear') || f.includes('neutro')) return 'slate';
  if (f.includes('grapefruit')) return 'rose';
  if (f.includes('ice')) return 'sky';

  return 'accent';
}
