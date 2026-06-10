// ===== On Point Electrical =====
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');
document.querySelectorAll('.gallery-item:not(.view-more) img').forEach(img => {
  img.parentElement.addEventListener('click', () => {
    lbImg.src = img.src.replace('w=800', 'w=1600');
    lbImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});

// Gallery expand / collapse
const viewMoreBtn = document.getElementById('galleryViewMore');
const galleryHidden = document.getElementById('galleryHidden');
if (viewMoreBtn && galleryHidden) {
  viewMoreBtn.addEventListener('click', () => {
    const isOpen = galleryHidden.classList.toggle('open');
    viewMoreBtn.querySelector('.view-more-text').innerHTML = isOpen
      ? '<i class="fa-solid fa-chevron-up"></i> Show Less'
      : '<i class="fa-solid fa-images"></i> View More Images';
    if (isOpen) {
      setTimeout(() => galleryHidden.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 350);
    }
  });
}

function closeLB(){ lightbox.classList.remove('open'); lbImg.src=''; }
lbClose.addEventListener('click', closeLB);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLB(); });

// Quote form (Web3Forms)
const form = document.getElementById('quoteForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.className = 'form-status';
  status.textContent = 'Sending...';
  const data = new FormData(form);
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    });
    const json = await res.json();
    if (json.success) {
      status.className = 'form-status success';
      status.textContent = '✅ Thanks! Your request has been sent — we\'ll be in touch shortly.';
      form.reset();
    } else {
      status.className = 'form-status error';
      status.textContent = json.message || 'Something went wrong. Please try again or call us.';
    }
  } catch (err) {
    status.className = 'form-status error';
    status.textContent = 'Network error. Please call us at +27 66 151 5822.';
  }
});
