import jsPDF from 'jspdf';
import { products, formatCategoryName, getCategories } from '@/data/products';
import { getFlavorColorRGB } from '@/lib/flavorColors';

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

// Sabores (sempre mostrar todos, com wrap)
const FLAVOR_TEXT_SIZE = 7;
const FLAVOR_BADGE_HEIGHT = 7;
const FLAVOR_BADGE_GAP_X = 3;
const FLAVOR_BADGE_GAP_Y = 2;

// Versão escura da cor (para backgrounds)
const getDarkColor = (color: [number, number, number]): [number, number, number] => {
  return [Math.floor(color[0] * 0.2), Math.floor(color[1] * 0.2), Math.floor(color[2] * 0.2)];
};

const getLocalISODate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getImageFormatFromDataUrl = (dataUrl: string): 'JPEG' | 'PNG' | 'WEBP' => {
  if (dataUrl.startsWith('data:image/png')) return 'PNG';
  if (dataUrl.startsWith('data:image/webp')) return 'WEBP';
  return 'JPEG';
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

    // Decoração no canto inferior (mais integrado ao tema)
    pdf.setFillColor(...getDarkColor(COLORS.secondary));
    pdf.circle(pageWidth + 20, pageHeight + 20, 60, 'F');
  };

  const formatBRL = (value: number): string => {
    return value.toFixed(2).replace('.', ',');
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
  const baseCardHeight = 58;
  const imgSize = 42;
  const headerHeight = 14;

  const splitFlavorsIntoRows = (pdfDoc: jsPDF, flavors: string[], maxWidth: number) => {
    const rows: Array<Array<{ flavor: string; w: number }>> = [];
    let currentRow: Array<{ flavor: string; w: number }> = [];
    let currentW = 0;

    pdfDoc.setFontSize(FLAVOR_TEXT_SIZE);

    for (const flavor of flavors) {
      const w = pdfDoc.getTextWidth(flavor) + 5;
      const extraGap = currentRow.length > 0 ? FLAVOR_BADGE_GAP_X : 0;

      if (currentRow.length > 0 && currentW + extraGap + w > maxWidth) {
        rows.push(currentRow);
        currentRow = [];
        currentW = 0;
      }

      currentRow.push({ flavor, w });
      currentW += (currentRow.length > 1 ? FLAVOR_BADGE_GAP_X : 0) + w;
    }

    if (currentRow.length > 0) rows.push(currentRow);
    return rows;
  };

  for (const categoryId of categories) {
    const categoryProducts = products.filter(p => p.category_id === categoryId);
    if (categoryProducts.length === 0) continue;

    // Verificar espaço para header + pelo menos 1 linha de produtos
    const spaceNeeded = headerHeight + baseCardHeight + 5;
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

    // Título mais legível e com "highlight" discreto
    const titleX = margin + 8;
    const titleY = currentY + 9;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);

    // sombra/realce sutil em secondary
    pdf.setTextColor(...COLORS.secondary);
    pdf.text(formatCategoryName(categoryId).toUpperCase(), titleX + 0.4, titleY + 0.2);

    // texto principal em branco
    pdf.setTextColor(...COLORS.white);
    pdf.text(formatCategoryName(categoryId).toUpperCase(), titleX, titleY);

    // linha de detalhe no fundo do header
    pdf.setDrawColor(...COLORS.secondary);
    pdf.setLineWidth(0.6);
    pdf.line(margin + 6, currentY + (headerHeight - 2) - 1.2, pageWidth - margin - 6, currentY + (headerHeight - 2) - 1.2);

    pdf.setTextColor(...COLORS.zinc400);
    pdf.setFontSize(10);
    pdf.text(`${categoryProducts.length} itens`, pageWidth - margin - 5, currentY + 9, { align: 'right' });

    currentY += headerHeight + 2;

    // Render em linhas (2 colunas) com altura dinâmica para caber TODOS os sabores
    for (let rowStart = 0; rowStart < categoryProducts.length; rowStart += 2) {
      const left = categoryProducts[rowStart];
      const right = categoryProducts[rowStart + 1];

      const maxFlavorWidth = cardWidth - 8;
      const leftFlavorRows = left.flavors.length > 0 ? splitFlavorsIntoRows(pdf, left.flavors, maxFlavorWidth) : [];
      const rightFlavorRows = right?.flavors.length > 0 ? splitFlavorsIntoRows(pdf, right.flavors, maxFlavorWidth) : [];

      const leftRowsCount = left.flavors.length > 0 ? leftFlavorRows.length : 0;
      const rightRowsCount = right?.flavors.length ? rightFlavorRows.length : 0;
      const maxRows = Math.max(1, leftRowsCount, rightRowsCount);
      const dynamicCardHeight = baseCardHeight + (maxRows - 1) * (FLAVOR_BADGE_HEIGHT + FLAVOR_BADGE_GAP_Y);

      if (currentY + dynamicCardHeight > pageHeight - 15) {
        pdf.addPage();
        drawBackground();
        currentY = margin;
      }

      const cardY = currentY;

      const renderCard = (
        product: typeof left,
        cardX: number,
        cardHeight: number,
        precomputedFlavorRows: Array<Array<{ flavor: string; w: number }>>
      ) => {
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

        pdf.setFillColor(25, 25, 32);
        pdf.roundedRect(imgX, imgY, imgSize, imgSize, 3, 3, 'F');

        const imageData = imageCache[product.id];
        if (imageData) {
          try {
            pdf.addImage(
              imageData,
              getImageFormatFromDataUrl(imageData),
              imgX + 2,
              imgY + 2,
              imgSize - 4,
              imgSize - 4
            );
          } catch {
            pdf.setTextColor(...COLORS.zinc600);
            pdf.setFontSize(20);
            pdf.text('?', imgX + imgSize/2 - 3, imgY + imgSize/2 + 5);
          }
        }

        if (product.is_featured) {
          pdf.setFillColor(...COLORS.accent);
          const badgeW = 22;
          const badgeH = 7;
          pdf.roundedRect(imgX, imgY, badgeW, badgeH, 2, 2, 'F');
          pdf.setTextColor(...COLORS.white);
          pdf.setFontSize(6);
          pdf.setFont('helvetica', 'bold');
          pdf.text('DESTAQUE', imgX + badgeW / 2, imgY + badgeH / 2, { align: 'center', baseline: 'middle' });
        }

        // === INFO DO PRODUTO ===
        const infoX = imgX + imgSize + 6;
        const infoWidth = cardWidth - imgSize - 14;

        pdf.setTextColor(...COLORS.white);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(11);
        const nameLines = pdf.splitTextToSize(product.name, infoWidth);
        pdf.text(nameLines.slice(0, 2), infoX, cardY + 12);

        pdf.setTextColor(...COLORS.accent);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`R$ ${formatBRL(product.price)}`, infoX, cardY + 28);

        const statusCenterY = cardY + 36;
        const statusColor = product.is_available ? COLORS.green : COLORS.red;
        pdf.setFillColor(...statusColor);
        pdf.circle(infoX + 3, statusCenterY, 2, 'F');
        pdf.setTextColor(...statusColor);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.text(product.is_available ? 'Disponível' : 'Esgotado', infoX + 8, statusCenterY, { baseline: 'middle' });

        // === SABORES (todos) ===
        if (product.flavors.length > 0) {
          const rows = precomputedFlavorRows.length > 0
            ? precomputedFlavorRows
            : splitFlavorsIntoRows(pdf, product.flavors, maxFlavorWidth);

          const rowsCount = rows.length;
          const flavorAreaHeight = rowsCount * FLAVOR_BADGE_HEIGHT + (rowsCount - 1) * FLAVOR_BADGE_GAP_Y;
          const startY = cardY + cardHeight - 4 - flavorAreaHeight;

          for (let r = 0; r < rows.length; r++) {
            let fx = cardX + 4;
            const fy = startY + r * (FLAVOR_BADGE_HEIGHT + FLAVOR_BADGE_GAP_Y);

            for (const item of rows[r]) {
              const flavorColor = getFlavorColorRGB(item.flavor);
              const darkFlavorColor = getDarkColor(flavorColor);

              pdf.setFillColor(...darkFlavorColor);
              pdf.roundedRect(fx, fy, item.w, FLAVOR_BADGE_HEIGHT, 2, 2, 'F');

              pdf.setTextColor(...flavorColor);
              pdf.setFontSize(FLAVOR_TEXT_SIZE);
              pdf.text(item.flavor, fx + 2.5, fy + 5);

              fx += item.w + FLAVOR_BADGE_GAP_X;
            }
          }
        }
      };

      const leftX = right ? margin : margin + (contentWidth - cardWidth) / 2;
      renderCard(left, leftX, dynamicCardHeight, leftFlavorRows);

      if (right) {
        const rightX = margin + (cardWidth + cardGap);
        renderCard(right, rightX, dynamicCardHeight, rightFlavorRows);
      }

      currentY += dynamicCardHeight + cardGap;

      processed += right ? 2 : 1;
      onProgress?.(40 + Math.round((processed / total) * 55));
    }

    // Espaço entre categorias
    currentY += 4;
  }

  // === RODAPÉ NA ÚLTIMA PÁGINA ===
  // Rodapé em 2 linhas: pills (18+/WhatsApp) + data
  const footerBoxY = pageHeight - 22;
  const footerBoxH = 18;

  // Linha separadora
  pdf.setDrawColor(...COLORS.accentDark);
  pdf.setLineWidth(0.6);
  pdf.line(margin, footerBoxY - 3, pageWidth - margin, footerBoxY - 3);

  // Container do rodapé
  // sombra sutil (fake) + card
  pdf.setFillColor(0, 0, 0);
  pdf.roundedRect(margin, footerBoxY + 0.6, contentWidth, footerBoxH, 4, 4, 'F');
  pdf.setFillColor(...COLORS.cardBg);
  pdf.roundedRect(margin, footerBoxY, contentWidth, footerBoxH, 4, 4, 'F');
  pdf.setDrawColor(...COLORS.accentDark);
  pdf.setLineWidth(0.5);
  pdf.roundedRect(margin, footerBoxY, contentWidth, footerBoxH, 4, 4, 'S');

  const pillY = footerBoxY + 2;
  const pillH = 10;

  // Aviso +18 (esquerda) - mais premium
  const ageX = margin + 4;
  const ageW = 88;
  pdf.setFillColor(...getDarkColor(COLORS.red));
  pdf.roundedRect(ageX, pillY, ageW, pillH, 5, 5, 'F');
  pdf.setDrawColor(...COLORS.red);
  pdf.setLineWidth(0.6);
  pdf.roundedRect(ageX, pillY, ageW, pillH, 5, 5, 'S');

  const ageIconCx = ageX + 7;
  const ageIconCy = pillY + pillH / 2;
  pdf.setFillColor(...COLORS.red);
  pdf.circle(ageIconCx, ageIconCy, 3.2, 'F');
  pdf.setTextColor(...COLORS.white);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(6);
  pdf.text('18+', ageIconCx, ageIconCy, { align: 'center', baseline: 'middle' });

  pdf.setTextColor(...COLORS.white);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(6);
  pdf.text('PROIBIDO PARA', ageX + 13, pillY + 4.1);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.text('MENORES DE 18', ageX + 13, pillY + 8.2);

  // WhatsApp (direita) - destaque com ícone
  const waW = 72;
  const waX = pageWidth - margin - 4 - waW;
  pdf.setFillColor(...getDarkColor(COLORS.green));
  pdf.roundedRect(waX, pillY, waW, pillH, 5, 5, 'F');
  pdf.setDrawColor(...COLORS.green);
  pdf.setLineWidth(0.6);
  pdf.roundedRect(waX, pillY, waW, pillH, 5, 5, 'S');

  const waIconCx = waX + 7;
  const waIconCy = pillY + pillH / 2;
  pdf.setFillColor(...COLORS.green);
  pdf.circle(waIconCx, waIconCy, 3.2, 'F');
  pdf.setTextColor(...COLORS.white);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(6);
  pdf.text('WA', waIconCx, waIconCy, { align: 'center', baseline: 'middle' });

  pdf.setTextColor(...COLORS.white);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(6);
  pdf.text('WHATSAPP', waX + 13, pillY + 4.1);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.text('61 98213-1123', waX + 13, pillY + 8.3);

  // Data (linha de baixo, centro)
  pdf.setTextColor(...COLORS.zinc400);
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'normal');
  const now = new Date();
  const date = now.toLocaleDateString('pt-BR');
  pdf.text(`Atualizado: ${date}`, pageWidth / 2, footerBoxY + footerBoxH - 3.5, { align: 'center', baseline: 'middle' });

  onProgress?.(100);

  // Salvar PDF
  pdf.save(`catalogo-${getLocalISODate(now)}.pdf`);
}
