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

});

