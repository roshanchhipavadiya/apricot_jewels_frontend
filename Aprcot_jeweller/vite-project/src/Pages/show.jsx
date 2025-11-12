import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';

// Step 1: Separate component
const InvoiceContent = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ background: '#dcf4f3', padding: 20 }}>
    {/* Your full JSX invoice code here */}
    <h1 style={{ color: '#313b5e' }}>Apricot Jewellery</h1>
    <p>Full invoice content here...</p>
  </div>
));

const InvoicePage = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Apricot-Invoice',
    copyStyles: true,
  });

  const handleDownloadPDF = () => {
    const element = componentRef.current;
    const opt = {
      margin:       0.5,
      filename:     'Apricot-Invoice.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      <div className="flex gap-4 my-4">
        <button
          type="button"
          onClick={handlePrint}
          className="h-[40px] w-[120px] bg-primary text-white font-semibold rounded"
        >
          Print
        </button>

        <button
          type="button"
          onClick={handleDownloadPDF}
          className="h-[40px] w-[120px] bg-green-600 text-white font-semibold rounded"
        >
          PDF
        </button>
      </div>

      <InvoiceContent ref={componentRef} />
    </div>
  );
};

export default InvoicePage;
