import { PDFDocument } from "pdf-lib";

/**
 * Tambahkan halaman baru ke PDF yang ada.
 * @param {ArrayBuffer} existingPdf - File PDF dalam bentuk ArrayBuffer.
 * @returns {Blob} - File PDF baru dalam bentuk Blob.
 */
export const addPageToPdf = async (existingPdf) => {
  const pdfDoc = await PDFDocument.load(existingPdf);
  const newPage = pdfDoc.addPage([600, 400]); // Ukuran halaman baru
  newPage.drawText("New Page Content", {
    x: 50,
    y: 350,
    size: 20,
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
};