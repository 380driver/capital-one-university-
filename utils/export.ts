// PDF and Print utilities

export const exportToPDF = () => {
  if (typeof window !== 'undefined') {
    // Use browser's print dialog
    window.print();
  }
};

export const downloadPageAsHTML = () => {
  if (typeof window !== 'undefined') {
    const content = document.documentElement.outerHTML;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', 'capital-one-university-disruption.html');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
};

export const shareViaEmail = (subject: string = 'Check out this Digital Disruption case study') => {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Check out this Capital One case study: ' + url)}`;
  if (typeof window !== 'undefined') {
    window.location.href = mailtoLink;
  }
};

export const printStyles = `
  @media print {
    body {
      background: white;
      color: black;
    }
    .no-print {
      display: none;
    }
    .dark {
      color-scheme: light;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid;
    }
    p {
      orphans: 3;
      widows: 3;
    }
    img {
      max-width: 100%;
      page-break-inside: avoid;
    }
  }
`;

// Add print styles to document
export const initializePrintStyles = () => {
  if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = printStyles;
    document.head.appendChild(styleElement);
  }
};

export default {
  exportToPDF,
  downloadPageAsHTML,
  shareViaEmail,
  printStyles,
  initializePrintStyles
};
