// Mobile Navigation Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-question.active').forEach(q => q.classList.remove('active'));
  if (!isOpen) {
    answer.classList.add('open');
    el.classList.add('active');
  }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.program-card, .why-card, .team-card, .safety-card, .faq-item, .philosophy-item, .message-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Lightbox functionality
function openLightbox(imgElement) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (imgElement.tagName === 'IMG') {
    lightboxImg.src = imgElement.src;
  } else {
    const img = imgElement.querySelector('img');
    if (img) lightboxImg.src = img.src;
    else return;
  }
  lightbox.classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

// WhatsApp Form Submission
const form = document.forms['whatsapp-form'];
const msg = document.getElementById('msg');
const whatsappNumber = '918102016368';

if(form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Opening WhatsApp...';
    btn.disabled = true;

    const formData = new FormData(form);
    const parentName = formData.get('Parent_Name');
    const contactNumber = formData.get('Contact_Number');
    const studentClass = formData.get('Student_Class');
    const targetSchool = formData.get('Target_School');
    const programType = formData.get('Program_Type');
    const message = formData.get('Message') || 'No additional message';

    const whatsappMessage = `*New Inquiry from Website*%0A` +
      `--------------------------%0A` +
      `*Parent Name:* ${encodeURIComponent(parentName)}%0A` +
      `*Contact:* ${encodeURIComponent(contactNumber)}%0A` +
      `*Student Class:* ${encodeURIComponent(studentClass)}%0A` +
      `*Target School:* ${encodeURIComponent(targetSchool)}%0A` +
      `*Program Type:* ${encodeURIComponent(programType)}%0A` +
      `*Message:* ${encodeURIComponent(message)}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    window.open(whatsappURL, '_blank');

    msg.innerHTML = "✓ Opening WhatsApp chat...";
    msg.style.color = "#2d6a4f";
    
    setTimeout(function(){
        msg.innerHTML = "";
        btn.innerHTML = originalText;
        btn.disabled = false;
        form.reset();
    }, 3000);
  });
}