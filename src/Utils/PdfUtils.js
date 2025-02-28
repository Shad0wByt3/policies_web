import jsPDF from 'jspdf';

export function generatePDF(policy) {
  const doc = new jsPDF();
  const downloadDate = new Date().toLocaleDateString();
  const logoUrl = `${window.location.origin}/logo.png`;
  const imgWidth = 30; 
  const imgHeight = 30;

  const img = new Image();
  img.src = logoUrl;
  img.onload = function() {
    doc.addImage(img, 'PNG', 20, 10, imgWidth, imgHeight);

    doc.setFontSize(18);
    doc.text('Datos de la Póliza', 20, 40);

    doc.setFontSize(12);
    doc.text(`#Póliza: ${policy.id}`, 20, 60);
    doc.text(`Empleado: ${policy.employee} (${policy.employeeName})`, 20, 70);
    doc.text(`SKU: ${policy.sku}`, 20, 80);
    doc.text(`Cantidad: ${policy.quantity}`, 20, 90);
    doc.text(`Póliza generada el: ${policy.date}`, 20, 100);
    doc.text(`PÓLIZA DESCARGADA el: ${downloadDate}`, 20, 120);

    doc.save(`poliza_${policy.id}.pdf`);
  };

  img.onerror = function() {
    console.error("No se pudo cargar la imagen del logo.");
  };
}
