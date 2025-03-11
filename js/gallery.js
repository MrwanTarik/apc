class Gallery {
  constructor(containerId, items) {
    this.container = document.getElementById(containerId);
    this.items = items;
    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.createGalleryHTML();
    this.createModal();
    this.initializeEvents();
  }

  createGalleryHTML() {
    // First create the container
    const container = document.createElement('div');
    container.className = 'gallery-container';
    
    // Create the gallery items HTML
    const galleryHTML = this.items.map((item, index) => `
      <div class="gallery-card ${item.type === 'video' ? 'video' : ''} ${index === 0 ? 'active' : ''}">
        <div class="gallery-thumbnail">
          <img src="${item.thumbnail || item.src}" alt="${item.alt || 'Gallery item'}">
          ${item.type === 'video' ? `
            <button class="play-btn">
              <img src="./images/icons/play.svg" alt="play">
            </button>
          ` : ''}
        </div>
      </div>
    `).join('');

    // Set the HTML and append the container
    container.innerHTML = galleryHTML;
    this.container.innerHTML = ''; // Clear existing content
    this.container.appendChild(container);
  }
// <button class="nav-btn prev-btn">&lt;</button>
//<button class="nav-btn next-btn">&gt;</button> 
  createModal() {
    if (!document.getElementById('galleryModal')) {
      const modalHTML = `
        <div class="gallery-modal" id="galleryModal">
          <button class="close-modal">&times;</button>
          <div class="modal-content">
            <button class="nav-btn prev-btn">&lt;</button>
            <div class="content-container"></div>
            <button class="nav-btn next-btn">&gt;</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    this.modal = document.getElementById('galleryModal');
    this.contentContainer = this.modal.querySelector('.content-container');
    this.closeBtn = this.modal.querySelector('.close-modal');
    this.prevBtn = this.modal.querySelector('.prev-btn');
    this.nextBtn = this.modal.querySelector('.next-btn');
  }

  showItem(index) {
    const item = this.items[index];
    let content = '';
    
    if (item.type === 'video') {
      content = `
        <video controls>
          <source src="${item.src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>`;
    } else {
      content = `<img src="${item.src}" alt="${item.alt || 'Gallery item'}">`;
    }
    
    this.contentContainer.innerHTML = content;
  }

  initializeEvents() {
    // Gallery card clicks and hover effects
    const galleryCards = this.container.querySelector('.gallery-container').querySelectorAll('.gallery-card');
    
    galleryCards.forEach((card, index) => {
      // Click event for modal
      card.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentIndex = index;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        this.modal.classList.add('active');
        setTimeout(() => {
          this.modal.classList.add('visible');
        }, 10);
        this.showItem(index);
      });

      // Hover effect for active state
      card.addEventListener('mouseenter', () => {
        galleryCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });

    // Close button
    this.closeBtn.addEventListener('click', () => {
      this.modal.classList.remove('visible');
      setTimeout(() => {
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
      }, 300); // Match transition duration
    });

    // Navigation
    this.prevBtn.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
      this.showItem(this.currentIndex);
    });

    this.nextBtn.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.showItem(this.currentIndex);
    });

    // Click outside to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeBtn.click(); // Use the same close logic
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      
      if (e.key === 'Escape') this.modal.classList.remove('active');
      if (e.key === 'ArrowLeft') this.prevBtn.click();
      if (e.key === 'ArrowRight') this.nextBtn.click();
    });
  }
}
