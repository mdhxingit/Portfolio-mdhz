/* ------------------------------------------------------------------
   CURSOR
------------------------------------------------------------------ */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left  = (mouseX - 4) + 'px';
  dot.style.top   = (mouseY - 4) + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX - 16) * 0.18;
  ringY += (mouseY - ringY - 16) * 0.18;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* Cursor scale on hover */
document.querySelectorAll('a, button, .skill-tag, .cert-card, .project-card, .fact-card').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.transform = 'scale(1.6)'; ring.style.opacity = '0.4'; });
  el.addEventListener('mouseleave', () => { ring.style.transform = 'scale(1)'; ring.style.opacity = '0.6'; });
});

/* ------------------------------------------------------------------
   SCROLL PROGRESS BAR
------------------------------------------------------------------ */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scroll-bar').style.width = (scrollTop / docH * 100) + '%';

  /* Navbar scroll class */
  document.getElementById('navbar').classList.toggle('scrolled', scrollTop > 60);

  /* Active nav link */
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const btm = top + sec.offsetHeight;
    const link = document.querySelector('.nav-links a[href="#' + sec.id + '"]');
    if (link) link.classList.toggle('active', scrollTop >= top && scrollTop < btm);
  });
});

/* ------------------------------------------------------------------
   MOBILE NAV
------------------------------------------------------------------ */
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

/* ------------------------------------------------------------------
   REVEAL ON SCROLL
------------------------------------------------------------------ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ------------------------------------------------------------------
   ANIMATED COUNTERS
------------------------------------------------------------------ */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.target);
    const decimal = parseInt(el.dataset.decimal || 0);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const current = (target * ease);
      el.textContent = current.toFixed(decimal) + suffix;
      if (t < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

/* ------------------------------------------------------------------
   TYPING ANIMATION
------------------------------------------------------------------ */
const roles = [
  'AI/ML Enthusiast',
  'Robotics Builder',
  'IoT Developer',
  'Python Programmer',
  'Azure Certified',
  'Problem Solver'
];
let rIdx = 0, cIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const word = roles[rIdx];
  if (!deleting) {
    typingEl.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typingEl.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 800);

/* ------------------------------------------------------------------
   HERO CANVAS — CIRCUIT / PARTICLE ANIMATION
------------------------------------------------------------------ */
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let nodes = [], W, H;

function resize() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initNodes(); });

function initNodes() {
  nodes = [];
  const count = Math.floor((W * H) / 18000);
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1
    });
  }
}
initNodes();

function drawCanvas() {
  ctx.clearRect(0, 0, W, H);
  const teal = '15,118,110';

  /* Draw connections */
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 140) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(${teal},${0.25 * (1 - d/140)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  /* Draw nodes */
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${teal},0.5)`;
    ctx.fill();

    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  });

  requestAnimationFrame(drawCanvas);
}
drawCanvas();

// animation code
// canvas code
// modal code
// other JS logic


// ===== CONTACT FORM (EmailJS) =====
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contactForm");
  const btn = document.querySelector(".btn-send");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Enter a valid email address.");
      return;
    }

    btn.disabled = true;
    btn.innerText = "Sending...";

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message
    };

    emailjs.send("service_2275a12", "template_imdtdi6", templateParams)
      .then(function () {
        alert("Message sent successfully!");
        form.reset();
      })
      .catch(function (error) {
        console.error("EmailJS Error:", error);
        alert("Failed to send message.");
      })
      .finally(function () {
        btn.disabled = false;
        btn.innerHTML = 'Send Message <i class="fas fa-paper-plane" style="margin-left:0.5rem"></i>';
      });

  });

});

/* ------------------------------------------------------------------
   CERTIFICATE MODAL
------------------------------------------------------------------ */
const certModal       = document.getElementById('cert-modal');
const certModalImg    = document.getElementById('certModalImg');
const certModalTitle  = document.getElementById('certModalTitle');
const certModalClose  = document.getElementById('certModalClose');

// Open modal on cert card click
document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const img  = card.dataset.certImg;
    const name = card.dataset.certName;
    certModalImg.src    = img;
    certModalImg.alt    = name;
    certModalTitle.textContent = name;
    certModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  });
});

// Close on ✕ button
certModalClose.addEventListener('click', closeCertModal);

// Close on background overlay click
certModal.addEventListener('click', e => {
  if (e.target === certModal) closeCertModal();
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCertModal();
});

function closeCertModal() {
  certModal.classList.remove('active');
  document.body.style.overflow = ''; // restore scroll
  setTimeout(() => { certModalImg.src = ''; }, 300); // clear img after animation
}