const tools = [
{
  id: 1,
  title: 'AAC to MP3 Converter',
  slug: 'aac-to-mp3',
  category: 'audio',
  categoryLabel: 'Audio Tools',

  description: 'Convert AAC audio files to MP3 instantly with iamrango\'s browser-based AAC to MP3 converter. No installation needed, secure and easy.',

  aiSummary: 'Instantly convert AAC audio files to MP3 directly in your browser — no uploads, no tracking, fully secure and mobile-friendly.',

  keywords: [
    'aac to mp3',
    '.aac to mp3',
    'convert aac to mp3',
    'convert .aac to mp3 online',
    'aac audio to mp3'
  ],

  tags: [
    'AAC to MP3',
    'Convert AAC Audio',
    'Browser Audio Converter',
    'Online MP3 Converter',
    'Audio Conversion'
  ],

  relatedTools: ['flac-to-mp3', 'wav-to-mp3', 'm4a-to-mp3'],

  canonical: 'aac-to-mp3',
  lastUpdated: '2025-10-14',

  meta: {
    title: 'AAC to MP3 Converter - Fast & Free Online Tool',
    description: 'Convert AAC audio files to MP3 instantly with iamrango\'s browser-based AAC to MP3 converter. No installation needed, secure and easy.'
  },

  structuredData: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AAC to MP3 Converter",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web",
    "url": "aac-to-mp3",
    "description": "Convert AAC audio files to MP3 instantly with  browser-based converter. Secure and easy to use."
  },

  faq: [
    {
      question: "Is my audio file safe during conversion?",
      answer: "Yes, the conversion happens entirely in your browser. Your files are never uploaded to any server."
    },
    {
      question: "Can I convert multiple files at once?",
      answer: "Currently, our AAC to MP3 tool converts one file at a time to ensure fast and reliable processing."
    },
    {
      question: "Does converting AAC to MP3 affect audio quality?",
      answer: "Our converter keeps audio quality as high as possible. The output MP3 will sound close to the original AAC file."
    },
    {
      question: "Do I need to install any software to use this tool?",
      answer: "No installation is required. This AAC to MP3 converter works directly in your web browser."
    },
    {
      question: "Can I use this tool on mobile devices?",
      answer: "Yes, the AAC to MP3 converter is mobile-friendly and works on smartphones, tablets, and desktops."
    },
    {
      question: "Is this AAC to MP3 converter free to use?",
      answer: "Yes, our tool is completely free to use without hidden charges."
    },
    {
      question: "Which browsers are supported?",
      answer: "The AAC to MP3 converter works on all modern browsers including Chrome, Firefox, Edge, and Safari."
    }
  ],

  version: '1.0.0',
  author: 'iamrango.com',

  intent: 'convert AAC audio files to MP3',
  inputFormats: ['aac'],
  outputFormats: ['mp3'],
  isFree: true,
  requiresUpload: false,
  privacy: 'browser-based (no file upload)',
  difficultyLevel: 'beginner',
  useCases: [
    'convert iPhone recordings to MP3',
    'compress audio for web',
    'convert AAC podcasts to MP3'
  ]
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
                  <a href="${tool.slug}" class="ss-tool-card">
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
        