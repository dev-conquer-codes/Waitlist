
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePdf = async (elementId: string, filename: string): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }
    
    // Initialize PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Calculate scale to fit the element into A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Create a clone of the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = '210mm';
    clone.style.height = '297mm';
    clone.style.position = 'absolute';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);
    
    // Render the cloned element to canvas
    const canvas = await html2canvas(clone, {
      scale: 2, // Higher resolution
      useCORS: true,
      logging: false,
      allowTaint: true,
      width: clone.offsetWidth,
      height: clone.offsetHeight
    });
    
    document.body.removeChild(clone);
    
    const imgData = canvas.toDataURL('image/png');
    
    // Add the image at A4 dimensions, maintaining aspect ratio
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Add clickable areas over the links
    const links = element.querySelectorAll('a');
    links.forEach(link => {
      const rect = link.getBoundingClientRect();
      const { top, left, width, height } = rect;
      
      // Calculate position relative to the element
      const relativeTop = top - element.getBoundingClientRect().top;
      const relativeLeft = left - element.getBoundingClientRect().left;
      
      // Scale to PDF dimensions
      const pdfLeft = (relativeLeft / element.offsetWidth) * pdfWidth;
      const pdfTop = (relativeTop / element.offsetHeight) * pdfHeight;
      const pdfWidth2 = (width / element.offsetWidth) * pdfWidth;
      const pdfHeight2 = (height / element.offsetHeight) * pdfHeight;
      
      pdf.link(pdfLeft, pdfTop, pdfWidth2, pdfHeight2, { url: link.href });
    });
    
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
