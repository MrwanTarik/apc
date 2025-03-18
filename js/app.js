document.addEventListener('DOMContentLoaded', function() {
  // Back to top
  document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  

  const menuBtn = document.querySelector('.mobile-menu-btn');
  const menuLinks = document.querySelector('.links');
  
  menuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    menuLinks.classList.toggle('active');
    document.body.style.overflow = menuLinks.classList.contains('active') ? 'hidden' : '';
  });
  
    document.addEventListener('DOMContentLoaded', function() {
        
      // Initialize gallery
      const galleryItems = [
      {
        type: 'video',
        src: './videos/video.mp4',
        thumbnail: './images/sample.avif',
        alt: 'Gallery Video 1' 
      },
      {
        type: 'image',
        src: './images/sample.avif',
        alt: 'Gallery Image 1'
      },
      
      {
        type: 'image',
        src: './images/sample.avif',
        alt: 'Gallery Image 2'
      },
      {
        type: 'image',
        src: './images/sample.avif', 
        alt: 'Gallery Image 2'
      },
      {
        type: 'image',
        src: './images/sample.avif',
        alt: 'Gallery Image 3'
      }
    ];

    new Gallery('media', galleryItems);

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
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic',
      delay: 100,
      anchorPlacement: 'top-bottom',
      mirror: false,
    });
      // Enhanced department card animations
  document.querySelectorAll('.department-card').forEach((card, index) => {
    // Initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    
    // Animate cards with better timing and effects
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease-out';
      
      // Add hover effect
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.03)';
        
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
      });
    }, 100 * index);
  });

  // Intersection Observer for revealing elements
  const revealOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px'
    }
  );

  // Apply to mail cards
  document.querySelectorAll('.mail-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    revealOnScroll.observe(card);
  });


  // Mail card hover animation
  document.querySelectorAll('.mail-card:not(.active)').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.backgroundColor = 'rgba(255,202,58,0.05)';
      card.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.backgroundColor = 'transparent';
    });
  });
  });

});

