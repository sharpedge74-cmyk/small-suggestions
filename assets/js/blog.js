const posts = [
    // {
    // title: "Software Product Ideas That Are Less Served",
    // author: "sohail",
    // authorName: ' Sohail Anwar ',
    // date: "2025, May 21 ",
    // categories: ['Product Ideas'],
    // img: 'software-product-ideas.jpg',
    // description: 'Discover software product ideas that target less served markets, from niche micro SaaS to IoT, fintech, education, and agriculture etc.',
    // url: 'software-product-ideas',
    // tags:['Software Product Ideas', 'Software Ideas For Starups', 'software ideas', 'software project ideas', 'software ideas for future','software ideas for 2025']
    // },
    
]
        const blogGrid = document.getElementById('blogGrid');
        
        function renderBlogPost(postArray) {
            blogGrid.innerHTML = '';
            
            postArray.forEach(post => {
                const postCard = document.createElement('div');
                postCard.innerHTML = `
                   <a href="${post.url}">
                    <div class="blog-post">
                    <div class="post-image" style="background-image: url('/assets/img/${post.img}');"></div>
                     <div class="post-content">
                      <h2 class="post-title">${post.title}</h2>
                      <div class="post-meta"> Published By ${post.authorName}  On ${post.date} </div>
                       <p class="post-description">
                         ${post.description}
                       </p>
                      </div>
                    </div> 
                    </a>
                `;
                blogGrid.appendChild(postCard);
            });
        }
        renderBlogPost(posts);
        
        // Search Functionality
        const blogSearch = document.getElementById('blogSearch');
        
        blogSearch.addEventListener('input', () => {
            const searchTerm = blogSearch.value.toLowerCase();
            
            if (searchTerm === '') {
                renderBlogPost(posts);
                return;
            }
            
            const filteredTools = posts.filter(post => 
                post.title.toLowerCase().includes(searchTerm) || 
                post.description.toLowerCase().includes(searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
            
            renderBlogPost(filteredTools);
        });              
        
        // Initialize with sample conversion
        window.addEventListener('DOMContentLoaded', () => {
        });