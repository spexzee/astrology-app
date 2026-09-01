import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { ChartData } from '../astrology/types/chart';

/**
 * Draws the classical North Indian style D1 Kundali diamond chart onto a jsPDF canvas.
 */
function drawNorthIndianChartPDF(
  doc: jsPDF,
  x: number,
  y: number,
  size: number,
  chartData: ChartData
) {
  const half = size / 2;

  // Outer square
  doc.setDrawColor(65, 55, 45); // Classical dark charcoal/bronze
  doc.setLineWidth(0.8);
  doc.rect(x, y, size, size);

  // Inner diagonals connecting corners
  doc.line(x, y, x + size, y + size);
  doc.line(x + size, y, x, y + size);

  // Diamond connecting midpoints
  doc.line(x + half, y, x + size, y + half);
  doc.line(x + size, y + half, x + half, y + size);
  doc.line(x + half, y + size, x, y + half);
  doc.line(x, y + half, x + half, y);

  const houseCenters: Record<number, { x: number; y: number; signY: number }> = {
    1: { x: x + half, y: y + size * 0.23, signY: y + size * 0.15 },
    2: { x: x + size * 0.25, y: y + size * 0.16, signY: y + size * 0.08 },
    3: { x: x + size * 0.13, y: y + size * 0.29, signY: y + size * 0.20 },
    4: { x: x + size * 0.25, y: y + half, signY: y + size * 0.42 },
    5: { x: x + size * 0.13, y: y + size * 0.72, signY: y + size * 0.80 },
    6: { x: x + size * 0.25, y: y + size * 0.85, signY: y + size * 0.93 },
    7: { x: x + half, y: y + size * 0.75, signY: y + size * 0.84 },
    8: { x: x + size * 0.75, y: y + size * 0.85, signY: y + size * 0.93 },
    9: { x: x + size * 0.87, y: y + size * 0.72, signY: y + size * 0.80 },
    10: { x: x + size * 0.75, y: y + half, signY: y + size * 0.42 },
    11: { x: x + size * 0.87, y: y + size * 0.29, signY: y + size * 0.20 },
    12: { x: x + size * 0.75, y: y + size * 0.16, signY: y + size * 0.08 },
  };

  chartData.houses.forEach((h) => {
    const center = houseCenters[h.houseNumber];
    if (!center) return;

    // Draw Rashi (Sign number) in subtle color
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(115, 95, 70);
    doc.text(`${h.sign}`, center.x, center.signY, { align: 'center' });

    // Draw Planets inside this house
    const planetsInHouse = h.planets;
    if (h.houseNumber === 1) {
      // Include Asc/Lagna label in House 1
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(140, 85, 25);
      doc.text('Asc', center.x, center.y - 4, { align: 'center' });
    }

    if (planetsInHouse.length > 0) {
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(25, 25, 25);

      const planetLines = planetsInHouse.map(
        (p) => `${p.shortCode}${p.isRetrograde ? ' (R)' : ''}`
      );

      const startY = h.houseNumber === 1 ? center.y + 2 : center.y - (planetLines.length * 3) / 2;

      planetLines.forEach((text, idx) => {
        doc.text(text, center.x, startY + idx * 3.5, { align: 'center' });
      });
    }
  });
}

/**
 * Generates and exports the Kundali PDF report.
 */
export async function generatePdfReport(chartData: ChartData): Promise<{ success: boolean; filePath?: string }> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;

  // Header Banner
  doc.setFillColor(36, 32, 28); // Refined warm charcoal header
  doc.rect(0, 0, pageWidth, 26, 'F');

  // Title
  doc.setTextColor(250, 248, 244);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('VEDIC ASTROLOGY STUDIO', margin, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(200, 195, 185);
  doc.text('D1 / Rashi Janam Kundali & Planetary Ephemeris Report', margin, 17);

  doc.setFontSize(8);
  doc.setTextColor(215, 175, 110);
  doc.text(`Ayanamsa: ${chartData.ayanamsa.name} (${chartData.ayanamsa.formatted})`, pageWidth - margin, 17, {
    align: 'right',
  });

  // Section 1: Subject Details Card
  let currentY = 32;

  doc.setFillColor(252, 250, 247);
  doc.setDrawColor(220, 215, 205);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, currentY, pageWidth - margin * 2, 26, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(25, 25, 25);
  doc.text(chartData.birthDetails.name || 'Unnamed Profile', margin + 5, currentY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(75, 75, 75);

  const col1X = margin + 5;
  const col2X = margin + 65;
  const col3X = margin + 125;

  doc.text(`Date of Birth: ${chartData.birthDetails.dateOfBirth}`, col1X, currentY + 13);
  doc.text(`Time of Birth: ${chartData.birthDetails.timeOfBirth}`, col1X, currentY + 19);

  doc.text(`Place of Birth: ${chartData.birthDetails.placeOfBirth}`, col2X, currentY + 13);
  doc.text(
    `Coordinates: ${chartData.birthDetails.latitude.toFixed(2)}°N, ${chartData.birthDetails.longitude.toFixed(2)}°E`,
    col2X,
    currentY + 19
  );

  doc.text(`Ascendant (Lagna): ${chartData.ascendant.signName} (${chartData.ascendant.signSanskrit})`, col3X, currentY + 13);
  doc.text(`Moon Sign (Rashi): ${chartData.moonSign.name} (${chartData.moonSign.sanskrit})`, col3X, currentY + 19);

  // Section 2: D1 Rashi Chart & Key Highlights
  currentY = 63;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(25, 25, 25);
  doc.text('D1 / Rashi Chart (North Indian Format)', margin, currentY);

  const chartSize = 74;
  const chartX = margin;
  const chartY = currentY + 4;

  drawNorthIndianChartPDF(doc, chartX, chartY, chartSize, chartData);

  // Quick astrological summary beside chart
  const summaryX = chartX + chartSize + 8;
  const summaryWidth = pageWidth - margin - summaryX;

  doc.setFillColor(252, 250, 247);
  doc.setDrawColor(220, 215, 205);
  doc.roundedRect(summaryX, chartY, summaryWidth, chartSize, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(35, 30, 25);
  doc.text('Astrological Fundamentals', summaryX + 4, chartY + 6.5);

  const highlights = [
    { label: 'Ascendant (Lagna)', val: `${chartData.ascendant.signName} ${chartData.ascendant.degreeFormatted}` },
    { label: 'Ascendant Lord', val: chartData.ascendant.signLord },
    { label: 'Moon Sign (Rashi)', val: `${chartData.moonSign.name} (${chartData.moonSign.sanskrit})` },
    { label: 'Rashi Lord', val: chartData.moonSign.lord },
    { label: 'Janma Nakshatra', val: `${chartData.nakshatra.name} (Pada ${chartData.nakshatra.pada})` },
    { label: 'Nakshatra Lord', val: chartData.nakshatra.lord },
    { label: 'Timezone Offset', val: `UTC ${chartData.birthDetails.timezone >= 0 ? '+' : ''}${chartData.birthDetails.timezone}` },
  ];

  doc.setFontSize(7.5);
  highlights.forEach((h, i) => {
    const rowY = chartY + 13.5 + i * 8.2;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(h.label, summaryX + 4, rowY);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(25, 25, 25);
    doc.text(h.val, summaryX + summaryWidth - 4, rowY, { align: 'right' });
  });

  // Section 3: Planetary Positions Table
  const tableY = chartY + chartSize + 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(25, 25, 25);
  doc.text('Planetary Positions', margin, tableY);

  const tableRows = [
    [
      chartData.ascendant.name,
      chartData.ascendant.sanskritName,
      `${chartData.ascendant.signName} (${chartData.ascendant.signSanskrit})`,
      chartData.ascendant.degreeFormatted,
      'House 1',
      `${chartData.ascendant.nakshatra.name} (Pada ${chartData.ascendant.nakshatra.pada})`,
      'Direct',
    ],
    ...chartData.planets.map((p) => [
      p.name,
      p.sanskritName,
      `${p.signName} (${p.signSanskrit})`,
      p.degreeFormatted,
      `House ${p.house}`,
      `${p.nakshatra.name} (Pada ${p.nakshatra.pada})`,
      p.isRetrograde ? 'Retrograde (R)' : 'Direct',
    ]),
  ];

  autoTable(doc, {
    startY: tableY + 3,
    margin: { left: margin, right: margin },
    head: [['Graha / Planet', 'Sanskrit', 'Rashi (Sign)', 'Degree', 'House', 'Janma Nakshatra', 'Motion']],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: [45, 40, 35],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 30, 30],
    },
    alternateRowStyles: {
      fillColor: [250, 248, 245],
    },
    columnStyles: {
      0: { fontStyle: 'bold' },
      3: { halign: 'right' },
      4: { halign: 'center' },
    },
  });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(140, 140, 140);
  doc.text(
    `Generated by Vedic Astrology Studio • Calculation Methodology: Lahiri Sidereal Ephemeris • ${new Date().toLocaleDateString()}`,
    margin,
    footerY
  );
  doc.text('Page 1 of 1', pageWidth - margin, footerY, { align: 'right' });

  // Save to file via Electron dialog or browser download
  const defaultFileName = `${(chartData.birthDetails.name || 'Kundali').replace(/[^a-zA-Z0-9_-]/g, '_')}_Birth_Chart.pdf`;

  if (window.electronAPI?.dialog) {
    try {
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      const res = await window.electronAPI.dialog.savePdf({
        defaultName: defaultFileName,
        pdfBase64,
      });
      if (res && res.success) {
        return { success: true, filePath: res.filePath };
      }
      if (res && res.canceled) {
        return { success: false };
      }
    } catch (ipcErr) {
      console.warn('Native Electron PDF dialog failed, falling back to direct save:', ipcErr);
    }
  }

  // Direct save / download fallback
  try {
    doc.save(defaultFileName);
    return { success: true, filePath: defaultFileName };
  } catch (saveErr: any) {
    console.error('PDF save error:', saveErr);
    throw new Error('Unable to download PDF file: ' + (saveErr?.message || 'Unknown error'));
  }
}
