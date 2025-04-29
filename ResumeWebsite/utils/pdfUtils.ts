import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

export const generatePdf = async (elementId: string, filename: string): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const dataUrl = await toPng(element, {
      cacheBust: true,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
        background: 'white',
      },
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();  // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      const imgWidth = img.width;
      const imgHeight = img.height;

      // Calculate image size keeping aspect ratio
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const width = imgWidth * ratio;
      const height = imgHeight * ratio;

      const x = (pdfWidth - width) / 2;  // Center horizontally
      const y = (pdfHeight - height) / 2; // Center vertically

      pdf.addImage(img, 'PNG', x, y, width, height);
      pdf.save(`${filename}.pdf`);
    };
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
