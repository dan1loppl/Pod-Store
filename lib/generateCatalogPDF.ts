import jsPDF from 'jspdf';
import { products, formatCategoryName, getCategories } from '@/data/products';

// Cores do tema
const COLORS = {
  white: [255, 255, 255] as [number, number, number],
  accent: [160, 32, 240] as [number, number, number],
  accentDark: [80, 16, 120] as [number, number, number],
  secondary: [0, 191, 255] as [number, number, number],
  green: [34, 197, 94] as [number, number, number],
  red: [239, 68, 68] as [number, number, number],
  redDark: [80, 20, 20] as [number, number, number],
  zinc400: [161, 161, 170] as [number, number, number],
  zinc600: [82, 82, 91] as [number, number, number],
  cardBg: [18, 18, 24] as [number, number, number],
  darkBg: [8, 8, 12] as [number, number, number],
};

// Cores dos sabores
const getFlavorColor = (flavor: string): [number, number, number] => {
  const f = flavor.toLowerCase();
  if (f.includes('strawberry') || f.includes('morango')) return [239, 68, 68];
  if (f.includes('banana')) return [234, 179, 8];
  if (f.includes('watermelon') || f.includes('melancia')) return [34, 197, 94];
  if (f.includes('grape') || f.includes('uva')) return [168, 85, 247];
  if (f.includes('mint') || f.includes('menthol') || f.includes('menta')) return [6, 182, 212];
  if (f.includes('apple') || f.includes('maçã')) return [74, 222, 128];
  if (f.includes('mango') || f.includes('manga')) return [249, 115, 22];
  if (f.includes('peach') || f.includes('pêssego')) return [251, 146, 60];
  if (f.includes('blueberry') || f.includes('blue')) return [59, 130, 246];
  if (f.includes('lime') || f.includes('lemon')) return [132, 204, 22];
  if (f.includes('kiwi')) return [16, 185, 129];
  if (f.includes('coconut') || f.includes('coco')) return [217, 119, 6];
  if (f.includes('raspberry')) return [236, 72, 153];
  if (f.includes('tutti') || f.includes('splash')) return [217, 70, 239];
  if (f.includes('ice')) return [14, 165, 233];
  return [160, 32, 240];
};

// Versão escura da cor (para backgrounds)
const getDarkColor = (color: [number, number, number]): [number, number, number] => {
  return [Math.floor(color[0] * 0.2), Math.floor(color[1] * 0.2), Math.floor(color[2] * 0.2)];
};

// Carregar imagem como base64
const loadImageAsBase64 = async (src: string): Promise<string | null> => {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

export async function generateCatalogPDF(onProgress?: (progress: number) => void): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 8;
  const contentWidth = pageWidth - margin * 2;

  // Função para desenhar background
  const drawBackground = () => {
    // Fundo escuro base
    pdf.setFillColor(...COLORS.darkBg);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Decoração no topo (círculo accent escuro)
    pdf.setFillColor(...COLORS.accentDark);
    pdf.circle(pageWidth * 0.3, -30, 80, 'F');

    // Decoração no canto inferior
    pdf.setFillColor(0, 50, 80);
    pdf.circle(pageWidth + 20, pageHeight + 20, 60, 'F');
  };

  // Pré-carregar todas as imagens
  const imageCache: Record<string, string | null> = {};
  let processed = 0;
  const total = products.length;

  for (const product of products) {
    if (product.images.hero && !product.images.hero.includes('placeholder')) {
      imageCache[product.id] = await loadImageAsBase64(product.images.hero);
    }
    processed++;
    onProgress?.(Math.round((processed / total) * 40));
  }

  const categories = getCategories();
  let currentY = margin;
  let isFirstPage = true;
  processed = 0;

  // Layout em grid 2x2 com cards grandes
  const cardGap = 6;
  const cardWidth = (contentWidth - cardGap) / 2;
  const cardHeight = 58;
  const imgSize = 42;
  const headerHeight = 14;

  for (const categoryId of categories) {
    const categoryProducts = products.filter(p => p.category_id === categoryId);
    if (categoryProducts.length === 0) continue;

    // Verificar espaço para header + pelo menos 1 linha de produtos
    const spaceNeeded = headerHeight + cardHeight + 5;
    if (!isFirstPage && currentY + spaceNeeded > pageHeight - margin) {
      pdf.addPage();
      drawBackground();
      currentY = margin;
    } else if (isFirstPage) {
      drawBackground();
      isFirstPage = false;
    }

    // Header da categoria - fundo escuro accent
    pdf.setFillColor(...COLORS.accentDark);
    pdf.roundedRect(margin, currentY, contentWidth, headerHeight - 2, 3, 3, 'F');

    // Linha accent à esquerda do header
    pdf.setFillColor(...COLORS.accent);
    pdf.roundedRect(margin, currentY, 3, headerHeight - 2, 1, 1, 'F');

    pdf.setTextColor(...COLORS.accent);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text(formatCategoryName(categoryId).toUpperCase(), margin + 8, currentY + 9);

    pdf.setTextColor(...COLORS.zinc400);
    pdf.setFontSize(10);
    pdf.text(`${categoryProducts.length} itens`, pageWidth - margin - 5, currentY + 9, { align: 'right' });

    currentY += headerHeight + 2;

    // Grid de produtos 2 por linha
    let col = 0;
    for (let i = 0; i < categoryProducts.length; i++) {
      const product = categoryProducts[i];

      // Verificar se precisa de nova página
      if (currentY + cardHeight > pageHeight - 15) {
        pdf.addPage();
        drawBackground();
        currentY = margin;
        col = 0;
      }

      const cardX = margin + col * (cardWidth + cardGap);
      const cardY = currentY;

      // Background do card
      pdf.setFillColor(...COLORS.cardBg);
      pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 4, 4, 'F');

      // Borda accent
      pdf.setDrawColor(...COLORS.accentDark);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 4, 4, 'S');

      // === IMAGEM ===
      const imgX = cardX + 4;
      const imgY = cardY + 4;

      // Fundo da imagem
      pdf.setFillColor(25, 25, 32);
      pdf.roundedRect(imgX, imgY, imgSize, imgSize, 3, 3, 'F');

      const imageData = imageCache[product.id];
      if (imageData) {
        try {
          pdf.addImage(imageData, 'JPEG', imgX + 2, imgY + 2, imgSize - 4, imgSize - 4);
        } catch {
          // Placeholder
          pdf.setTextColor(...COLORS.zinc600);
          pdf.setFontSize(20);
          pdf.text('?', imgX + imgSize/2 - 3, imgY + imgSize/2 + 5);
        }
      }

      // Badge destaque no canto da imagem
      if (product.is_featured) {
        pdf.setFillColor(...COLORS.accent);
        pdf.roundedRect(imgX, imgY, 22, 7, 2, 2, 'F');
        pdf.setTextColor(...COLORS.white);
        pdf.setFontSize(6);
        pdf.setFont('helvetica', 'bold');
        pdf.text('DESTAQUE', imgX + 2, imgY + 5);
      }

      // === INFO DO PRODUTO ===
      const infoX = imgX + imgSize + 6;
      const infoWidth = cardWidth - imgSize - 14;

      // Nome do produto
      pdf.setTextColor(...COLORS.white);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);

      // Quebrar nome se necessário
      const nameLines = pdf.splitTextToSize(product.name, infoWidth);
      pdf.text(nameLines.slice(0, 2), infoX, cardY + 12);

      // Preço
      pdf.setTextColor(...COLORS.accent);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`R$ ${product.price.toFixed(2)}`, infoX, cardY + 28);

      // Disponibilidade
      const statusY = cardY + 36;
      const statusColor = product.is_available ? COLORS.green : COLORS.red;
      pdf.setFillColor(...statusColor);
      pdf.circle(infoX + 3, statusY, 2, 'F');
      pdf.setTextColor(...statusColor);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text(product.is_available ? 'Disponivel' : 'Esgotado', infoX + 8, statusY + 3);

      // === SABORES ===
      if (product.flavors.length > 0) {
        const flavorY = cardY + cardHeight - 10;
        let fx = cardX + 4;
        const maxFlavorWidth = cardWidth - 8;
        let flavorsShown = 0;

        for (let j = 0; j < product.flavors.length; j++) {
          const flavor = product.flavors[j];
          const flavorColor = getFlavorColor(flavor);
          const darkFlavorColor = getDarkColor(flavorColor);

          pdf.setFontSize(7);
          const textW = pdf.getTextWidth(flavor) + 5;

          // Se não couber mais, mostrar contador
          if (fx + textW > cardX + maxFlavorWidth) {
            const remaining = product.flavors.length - flavorsShown;
            if (remaining > 0) {
              pdf.setTextColor(...COLORS.zinc400);
              pdf.setFontSize(8);
              pdf.text(`+${remaining}`, fx + 1, flavorY + 5);
            }
            break;
          }

          // Badge do sabor com cor escura
          pdf.setFillColor(...darkFlavorColor);
          pdf.roundedRect(fx, flavorY, textW, 7, 2, 2, 'F');

          pdf.setTextColor(...flavorColor);
          pdf.text(flavor, fx + 2.5, flavorY + 5);

          fx += textW + 3;
          flavorsShown++;
        }
      }

      col++;
      if (col >= 2) {
        col = 0;
        currentY += cardHeight + cardGap;
      }

      processed++;
      onProgress?.(40 + Math.round((processed / total) * 55));
    }

    // Se terminou em coluna ímpar, avançar linha
    if (col === 1) {
      col = 0;
      currentY += cardHeight + cardGap;
    }

    // Espaço entre categorias
    currentY += 4;
  }

  // === RODAPÉ NA ÚLTIMA PÁGINA ===
  const footerY = pageHeight - 14;

  // Linha separadora
  pdf.setDrawColor(...COLORS.accent);
  pdf.setLineWidth(0.5);
  pdf.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  // Aviso +18 (esquerda)
  pdf.setFillColor(...COLORS.redDark);
  pdf.roundedRect(margin, footerY, 75, 10, 3, 3, 'F');

  pdf.setTextColor(...COLORS.red);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.text('PROIBIDO MENORES DE 18', margin + 3, footerY + 7);

  // WhatsApp (direita)
  pdf.setFillColor(22, 80, 50);
  pdf.roundedRect(pageWidth - margin - 60, footerY, 60, 10, 3, 3, 'F');
  pdf.setTextColor(...COLORS.white);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text('(61) 98213-1123', pageWidth - margin - 57, footerY + 7);

  // Data (centro)
  pdf.setTextColor(...COLORS.zinc400);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  const date = new Date().toLocaleDateString('pt-BR');
  pdf.text(`Atualizado: ${date}`, pageWidth / 2, footerY + 7, { align: 'center' });

  onProgress?.(100);

  // Salvar PDF
  pdf.save(`catalogo-${new Date().toISOString().split('T')[0]}.pdf`);
}
