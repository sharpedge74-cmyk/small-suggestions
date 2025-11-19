const tools = [
{
    id: 1,
    icon: 'fa-code',
    title: 'XML to XSD Generator',
    description: 'Generate XSD schemas directly from XML files in your browser — fast, free, and offline-friendly.',
    tags: [
        'xml to xsd generator online',
        'xml to xsd generator online free',
        'xml to xsd schema generator',
        'freeformatter xml to xsd generator',
        'free xml to xsd generator',
        'online xml to xsd generator'
    ],
    category: 'XML',
    url: 'xml-to-xsd-generator'
},

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
        