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
});

