document.addEventListener('DOMContentLoaded', function() {
  // Back to top
  document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initialize gallery
  const galleryItems = [
    {
      type: 'video',
      src: '../videos/video.mp4',
      thumbnail: '../images/sample.avif',
      alt: 'Gallery Video 1'
    },
    {
      type: 'image',
      src: '../images/sample.avif',
      alt: 'Gallery Image 1'
    },
    
    {
      type: 'image',
      src: '../images/sample.avif',
      alt: 'Gallery Image 2'
    },
    {
      type: 'video',
      src: '../videos/video.mp4',
      thumbnail: '../images/sample.avif',
      alt: 'Gallery Video 2'
    },
    {
      type: 'image',
      src: '../images/sample.avif',
      alt: 'Gallery Image 3'
    }
  ];

  new Gallery('media', galleryItems);

  const menuBtn = document.querySelector('.mobile-menu-btn');
  const menuLinks = document.querySelector('.links');
  
  menuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    menuLinks.classList.toggle('active');
    document.body.style.overflow = menuLinks.classList.contains('active') ? 'hidden' : '';
  });


  // show and hide hero cards
  
  const showMoreBtn = document.querySelector('.show-more-btn');
  const heroCards = document.querySelector('.hero-cards');
  const expandIcon = showMoreBtn.querySelector('img');
  
  showMoreBtn.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
      const expandedHeight = heroCards.scrollHeight + 'px';
      
      if (!heroCards.classList.contains('expanded')) {
        // Expanding
        heroCards.style.height = '300px'; // Starting height
        requestAnimationFrame(() => {
          heroCards.classList.add('expanded');
          heroCards.style.height = expandedHeight;
          // Rotate icon 180 degrees
          expandIcon.style.transform = 'rotate(180deg)';
        });
      } else {
        // Collapsing
        heroCards.style.height = expandedHeight;
        requestAnimationFrame(() => {
          heroCards.classList.remove('expanded');
          heroCards.style.height = '300px';
          // Reset icon rotation
          expandIcon.style.transform = 'rotate(0deg)';
        });
      }
    }
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      heroCards.style.height = '';
      heroCards.classList.remove('expanded');
      expandIcon.style.transform = '';
    }
  });

});

