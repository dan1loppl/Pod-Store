# CentralPod - Catálogo de Cigarros Eletrônicos

Um catálogo visual moderno para head shop especializada em cigarros eletrônicos, desenvolvido com Next.js 14, TypeScript, Tailwind CSS e Framer Motion.

## 🚀 Tecnologias

- **Next.js 14** - App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização com design tokens customizados
- **Framer Motion** - Animações suaves e interativas
- **Radix UI** - Componentes acessíveis (Dialog/Modal)

## 📁 Estrutura do Projeto

```
my-vape-shop/
├── app/
│   ├── layout.tsx       # Layout raiz com fontes e metadata
│   ├── page.tsx         # Página principal
│   └── globals.css      # Estilos globais e CSS vars
├── components/
│   ├── Hero.tsx         # Hero section com overlay
│   ├── CategoryChips.tsx # Filtro de categorias
│   ├── ProductCard.tsx  # Card de produto animado
│   ├── ProductModal.tsx # Modal de detalhes com galeria
│   ├── GlobalCTA.tsx    # CTA fixo WhatsApp
│   └── Footer.tsx       # Rodapé com informações
├── data/
│   └── products.ts      # Dados dos produtos
├── public/
│   ├── bg.webp          # Background do hero
│   └── products/        # Imagens dos produtos
└── ...configs
```

## 🎨 Design System

### Cores (CSS Variables)
- `--bg`: #000000 (Fundo principal)
- `--card`: #0A0A0C (Cards e superfícies)
- `--accent`: #A020F0 (Roxo neon - destaque principal)
- `--secondary`: #00BFFF (Azul ciano - acentos secundários)
- `--tertiary`: #FF69B4 (Rosa - destaques terciários)

### Animações
- Fade-in no carregamento
- Scale + glow no hover dos cards
- Stagger nos itens do grid
- Pulse no CTA global
- Drag horizontal na galeria do modal

## 🏃‍♂️ Como Rodar

1. **Instale as dependências:**
```bash
cd my-vape-shop
npm install
```

2. **Rode em desenvolvimento:**
```bash
npm run dev
```

3. **Acesse:** [http://localhost:3000](http://localhost:3000)

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🖼️ Imagens

Coloque as imagens dos produtos em `public/products/[nome-produto]/`:
- `hero.webp` - Imagem principal (aspecto 1:1)
- `angle.webp` - Visão em ângulo
- `detail.webp` - Detalhe do produto

**Recomendações:**
- Formato: WebP
- Tamanho máximo: 150KB por imagem
- Dimensões: 800x800px (otimizado para retina)

## 📱 Responsividade

- **Mobile (< 640px)**: 1 coluna
- **Tablet (640-1024px)**: 2-3 colunas
- **Desktop (> 1024px)**: 4 colunas

## ♿ Acessibilidade

- Alt text em todas as imagens
- ARIA labels nos botões e modais
- Focus visible para navegação por teclado
- Focus trap no modal

## 🚀 Deploy

O projeto está pronto para deploy na Vercel:

```bash
vercel
```

Ou conecte diretamente via GitHub na [Vercel](https://vercel.com).

## 📝 Licença

Este projeto é apenas para fins demonstrativos.

---

**⚠️ AVISO:** Este site é apenas um catálogo. Proibido para menores de 18 anos.
