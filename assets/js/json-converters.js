const tools = [
    {
        id: 1,
        icon: 'fa-font',
        title: 'JSON To Excel Converter',
        description: 'Edit JSON , Preview And Convert JSON To Excel, Offline And Faster',
        tags: ['JSON To Excel', 'Convert JSON To Excel', 'JSON To XLSX', 'JSON To XLS'],
        category: 'JSON',
        url: 'json-to-excel'
    },
    {
        id: 2,
        icon: 'fa-font',
        title: 'JSON To CSV Converter',
        description: 'Edit JSON , Preview And Convert JSON To CSV',
        tags: ['JSON To CSV', 'Convert JSON To CSV', 'JSON To CSV Converter'],
        category: 'JSON',
        url: 'json-to-csv'
    },
    {
        id: 3,
        icon: 'fa-font',
        title: 'JSON To TXT Converter',
        description: 'Edit JSON , Preview And Convert JSON To TXT',
        tags: ['JSON To TXT', 'Convert JSON To TXT', 'JSON To TXT Converter'],
        category: 'JSON',
        url: 'json-to-txt'
    },
    {
        id: 4,
        icon: 'fa-font',
        title: 'JSON To HTML Converter',
        description: 'Edit JSON , Preview And Convert JSON To HTML',
        tags: ['JSON To HTML', 'Convert JSON To HTML', 'JSON To HTML Converter'],
        category: 'JSON',
        url: 'json-to-html'
    },
    {
        id: 5,
        icon: 'fa-font',
        title: 'JSON To PDF Converter',
        description: 'Edit JSON , Preview And Convert JSON To PDF',
        tags: ['JSON To PDF', 'Convert JSON To PDF', 'JSON To PDF Converter'],
        category: 'JSON',
        url: 'json-to-pdf'
    },
    {
        id: 6,
        icon: 'fa-font',
        title: 'JSON To XML Converter',
        description: 'Edit JSON , Preview And Convert JSON To XML. Edit XML and Export',
        tags: ['JSON To XML', 'Convert JSON To XML', 'JSON To XML Converter'],
        category: 'JSON',
        url: 'json-to-xml'
    },
    {
        id: 7,
        icon: 'fa-font',
        title: 'JSON To SQL Converter',
        description: 'Edit JSON , Preview And Convert JSON To SQL. Production Ready SQL',
        tags: ['JSON To SQL', 'Convert JSON To SQL', 'JSON To SQL Converter'],
        category: 'JSON',
        url: 'json-to-sql'
    },
    {
        id: 9,
        icon: 'fa-code',
        title: 'JSON String to JSON Object Converter',
        description: 'Instantly convert any JSON string to a fully formatted JSON object. Copy or download the converted object for your projects.',
        tags: ['JSON String to Object', 'JSON Parser', 'JSON Formatter', 'String to JSON Online'],
        category: 'JSON',
        url: 'json-string-to-json-object'
    },
    {
        id: 10,
        icon: 'fa-sitemap',
        title: 'JSON to JSON Schema Converter',
        description: 'Convert any JSON object to a valid JSON Schema online. Generate, copy, or download schemas instantly for API validation or data contracts.',
        tags: ['JSON to JSON Schema', 'Convert JSON to Schema', 'JSON Schema Generator', 'JSON to JSON Schema Online'],
        category: 'JSON',
        url: 'json-to-json-schema'
    },
    {
        id: 11,
        icon: 'fa-code',
        title: 'JSON to Dart Converter',
        description: 'Quickly convert any JSON object or string into fully structured Dart models online. Supports null safety, private fields, default values, and generates ready-to-use classes for Flutter and Dart applications.',
        tags: ['JSON to Dart Converter', 'JSON to Dart Model', 'JSON to Dart Null Safety', 'JSON to Dart Class', 'JSON to Dart Online', 'JSON to Dart Flutter', 'JSON to Dart Freezed', 'JSON to Dart QuickType'],
        category: 'JSON',
        url: 'json-to-dart'
    },
    {
        id: 11,
        icon: 'fa-file-code',
        title: 'JSON to YAML Converter',
        description: 'Instantly convert JSON objects and files to clean, readable YAML format. Perfect for configuration files, Docker Compose, Kubernetes manifests, and CI/CD pipelines. Supports nested structures and preserves data integrity.',
        tags: ['JSON to YAML Converter', 'JSON to YAML Online', 'JSON to YAML Format', 'JSON to YAML Parser', 'JSON to YAML Free', 'JSON to YAML Config', 'JSON to YAML Kubernetes', 'JSON to YAML Docker', 'JSON to YAML Docker Free'],
        category: 'JSON',
        url: 'json-to-yaml'
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
        