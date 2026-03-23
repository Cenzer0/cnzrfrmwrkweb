// Optimized Framer Motion-like animations with vanilla JS
// Lightweight alternative for smooth animations with performance optimizations

class MotionElement {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      duration: options.duration || 0.6,
      delay: options.delay || 0,
      ease: options.ease || 'cubic-bezier(0.4, 0, 0.2, 1)',
      ...options
    };
  }

  fadeIn() {
    this.element.style.opacity = '0';
    this.element.style.transform = 'translateY(20px)';
    this.element.style.transition = `opacity ${this.options.duration}s ${this.options.ease} ${this.options.delay}s, transform ${this.options.duration}s ${this.options.ease} ${this.options.delay}s`;
    this.element.style.willChange = 'opacity, transform';
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.element.style.opacity = '1';
        this.element.style.transform = 'translateY(0)';
        
        // Remove will-change after animation
        setTimeout(() => {
          this.element.style.willChange = 'auto';
        }, (this.options.duration + this.options.delay) * 1000);
      });
    });
    
    return this;
  }
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
  // Animate hero elements with reduced motion check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      new MotionElement(heroTitle, { duration: 0.6, delay: 0.1 }).fadeIn();
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      new MotionElement(heroSubtitle, { duration: 0.6, delay: 0.2 }).fadeIn();
    }

    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
      new MotionElement(heroButtons, { duration: 0.6, delay: 0.3 }).fadeIn();
    }
  }

  // Optimized Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !prefersReducedMotion) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      } else if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    if (!prefersReducedMotion) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }
    observer.observe(el);
  });

  // Optimized parallax with throttling
  let ticking = false;
  const handleScroll = () => {
    if (!ticking && !prefersReducedMotion) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.speed) || 0.5;
          el.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
        });
        
        ticking = false;
      });
      ticking = true;
    }
  };

  // Only add parallax on desktop for better performance
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Optimized hover effects with delegation
  document.addEventListener('mouseenter', (e) => {
    if (e.target.classList.contains('hover-lift')) {
      e.target.style.transform = 'translateY(-4px)';
      e.target.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }, true);
  
  document.addEventListener('mouseleave', (e) => {
    if (e.target.classList.contains('hover-lift')) {
      e.target.style.transform = 'translateY(0)';
    }
  }, true);
  
  // Counter animation for stats
  const animateCounter = (element) => {
    const target = element.getAttribute('data-target');
    const isVersion = target.includes('.');
    
    if (isVersion) {
      element.textContent = target;
      return;
    }
    
    const targetNum = parseInt(target);
    const duration = 2000;
    const increment = targetNum / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < targetNum) {
        if (targetNum >= 1000) {
          element.textContent = Math.floor(current / 1000) + 'K+';
        } else {
          element.textContent = Math.floor(current) + '+';
        }
        requestAnimationFrame(updateCounter);
      } else {
        if (targetNum >= 1000) {
          element.textContent = Math.floor(targetNum / 1000) + 'K+';
        } else {
          element.textContent = targetNum + '+';
        }
      }
    };
    
    updateCounter();
  };
  
  // Observe counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
  });
});

// Optimized smooth scroll
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Copy code functionality
window.copyCode = function(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
};

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  showToast('Copied to clipboard!');
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-pixel-cyan text-pixel-dark px-6 py-3 rounded-lg font-semibold shadow-lg z-50';
  toast.textContent = message;
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(20px)';
  toast.style.transition = 'all 0.3s ease';
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}
