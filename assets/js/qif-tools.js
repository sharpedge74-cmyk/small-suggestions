const tools = [
  {
    id: 1,
    icon: 'fa-file-csv',
    title: 'QIF to CSV Converter',
    description: 'Convert QIF financial files into CSV format instantly in your browser. Preserve transaction details including date, amount, payee, and memo without uploading your data.',
    tags: [
      'QIF to CSV',
      'convert QIF to CSV',
      'QIF CSV converter',
      'QIF file conversion',
      'offline QIF to CSV',
      'QIF to spreadsheet'
    ],
    category: 'qif',
    url: 'qif-to-csv'
  },
  {
    id: 2,
    icon: 'fa-file-excel',
    title: 'QIF to Excel Converter',
    description: 'Easily transform QIF files into Excel XLS or XLSX formats in-browser. Retain all transaction details and format spreadsheets for analysis or accounting purposes.',
    tags: [
      'QIF to Excel',
      'QIF to XLS',
      'QIF to XLSX',
      'convert QIF to Excel',
      'offline QIF to Excel',
      'QIF spreadsheet converter'
    ],
    category: 'qif',
    url: 'qif-to-excel'
  },
  {
    id: 3,
    icon: 'fa-file-invoice-dollar',
    title: 'QIF to QBO Converter',
    description: 'Convert your QIF files to QuickBooks compatible QBO format directly in the browser. Perfect for importing transactions into QuickBooks securely and efficiently.',
    tags: [
      'QIF to QBO',
      'convert QIF to QBO',
      'QIF QuickBooks converter',
      'QIF to QuickBooks',
      'offline QIF to QBO'
    ],
    category: 'qif',
    url: 'qif-to-qbo'
  }
];

// Render Tools
const toolsGrid = document.getElementById('toolsGrid');

function renderTools(toolsArray) {
    toolsGrid.innerHTML = '';

    toolsArray.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.innerHTML = `
            <a href="${tool.url}">
                <div class="ss-card-header">
                    <h2>${tool.title}</h2>
                </div>
                <div class="ss-card-body">
                    <p class="ss-card-description">${tool.description}</p>
                    <div class="ss-card-tags">
                        ${tool.tags.map(tag => `<span class="ss-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </a>
        `;
        toolsGrid.appendChild(toolCard);
    });
}

// Initialize tools
renderTools(tools);

// Search Functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm === '') {
        renderTools(tools);
        return;
    }

    const filteredTools = tools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    renderTools(filteredTools);
});
