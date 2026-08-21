/**
 * Ellyz Gomez — Portfolio JavaScript
 * Handles navigation, drawer, cursor, case study modal, and toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dark / Light Mode Theme Initializer
  initThemeToggle();

  // 2. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 3. Navigation Drawer & ScrollSpy
  initNavigation();

  // 4. Resume Button Handler
  initResumeButton();

  // 5. React Bits Stack Component for Certificates
  initCertificatesStack();

  // 6. Contact Form Handler (Direct delivery to ellyzpalajoren62@gmail.com)
  initContactForm();
});

/* --------------------------------------------------------------------------
   3. Navigation (Header Menu, ScrollSpy, Drawer)
   -------------------------------------------------------------------------- */
function initNavigation() {
  const toggleBtn = document.getElementById('menuToggleBtn');
  const drawerOverlay = document.getElementById('navDrawerOverlay');
  const drawer = document.getElementById('navDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const navMenuLinks = document.querySelectorAll('.nav-menu-link');

  if (toggleBtn && drawerOverlay && drawer) {
    const openDrawer = () => {
      drawerOverlay.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawerOverlay.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    drawerOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
    });
  }

  // ScrollSpy Active Link Tracking
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navMenuLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Download Resume Button Handler
   -------------------------------------------------------------------------- */
function initResumeButton() {
  const resumeBtns = [
    document.getElementById('downloadResumeBtn'),
    document.getElementById('drawerDownloadResumeBtn')
  ];

  resumeBtns.forEach((btn) => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        if (e) e.preventDefault();
        
        // Automatic download from the Resume folder (.docx)
        const link = document.createElement('a');
        link.href = 'Resume/Ellyz Gomez Resume.docx';
        link.download = 'Ellyz Gomez Resume.docx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('✓ Downloading Ellyz Gomez Resume (.docx)...');
      });
    }
  });
}

/* --------------------------------------------------------------------------
   5. React Bits <Stack /> Component for Certificates
   -------------------------------------------------------------------------- */
const CERTIFICATES_DATA = [
  {
    id: 1,
    image: 'assets/canva-essentials.png',
    alt: 'Canva Essentials Certificate of Completion',
    title: 'Canva Essentials',
    tag: 'DESIGN & VISUAL CREATION',
    issuer: 'Canva Design School • The Canva Team',
    date: 'August 21, 2026',
    year: '2026',
    certId: 'c701b2'
  },
  {
    id: 2,
    image: 'assets/canva-graphic-design.png',
    alt: 'Graphic Design Essentials Certificate of Completion',
    title: 'Graphic Design Essentials',
    tag: 'GRAPHIC DESIGN & CREATIVE',
    issuer: 'Canva Design School • The Canva Team',
    date: 'August 21, 2026',
    year: '2026',
    certId: 'aba828'
  },
  {
    id: 3,
    image: 'assets/cisco-cyber-threat.png',
    alt: 'Cyber Threat Management Certificate',
    title: 'Cyber Threat Management',
    tag: 'CYBERSECURITY',
    issuer: 'Cisco Networking Academy • Lynn Bloomer, Director',
    date: '13 Jun 2025',
    year: '2025'
  },
  {
    id: 4,
    image: 'assets/cisco-packet-tracer.png',
    alt: 'Getting Started with Cisco Packet Tracer Certificate',
    title: 'Getting Started with Cisco Packet Tracer',
    tag: 'SIMULATION & TOOLS',
    issuer: 'Cisco Networking Academy • Lynn Bloomer, Director',
    date: '09 Jun 2025',
    year: '2025',
    certId: '6e950d61-796d-4155-9a10-dfde0a3b6934'
  },
  {
    id: 5,
    image: 'assets/cisco-network-addressing.png',
    alt: 'Network Addressing & Basic Troubleshooting Certificate',
    title: 'Network Addressing and Basic Troubleshooting',
    tag: 'NETWORKING & TROUBLESHOOTING',
    issuer: 'Cisco Networking Academy • Lynn Bloomer, Director',
    date: 'May 31, 2025',
    year: '2025'
  }
];

class ReactBitsStack {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      randomRotation: options.randomRotation ?? true,
      sensitivity: options.sensitivity ?? 110,
      sendToBackOnClick: options.sendToBackOnClick ?? true,
      animationConfig: options.animationConfig || { stiffness: 260, damping: 20 },
      autoplay: options.autoplay ?? false,
      autoplayDelay: options.autoplayDelay || 3200,
      pauseOnHover: options.pauseOnHover ?? true,
      mobileBreakpoint: options.mobileBreakpoint || 768,
      cards: options.cards || CERTIFICATES_DATA
    };

    // Initialize stack array with persistent unique IDs and randomized rotation offsets
    this.stack = this.options.cards.map((card, idx) => ({
      ...card,
      id: card.id || idx + 1,
      randomRotate: this.options.randomRotation ? (Math.random() * 8 - 4) : 0
    }));

    this.isPaused = false;
    this.autoplayInterval = null;
    this.hoverInterval = null;
    this.isDragging = false;
    this.dragPointerId = null;
    this.dragStart = { x: 0, y: 0 };
    this.currentOffset = { x: 0, y: 0 };
    this.cardElements = new Map(); // id -> DOM container (.card-rotate)

    this.init();
  }

  init() {
    this.buildDOM();
    this.bindEvents();
    this.updateStackPositions(false);
    this.initAutoplay();
  }

  buildDOM() {
    this.container.innerHTML = '';

    this.stack.forEach((card) => {
      const rotateWrapper = document.createElement('div');
      rotateWrapper.className = 'card-rotate';
      rotateWrapper.dataset.cardId = card.id;

      rotateWrapper.innerHTML = `
        <div class="card" style="transform-origin: 90% 90%;">
          <div class="card-image-wrap">
            <img src="${card.image}" alt="${card.alt || card.title}" class="card-image" draggable="false" />
          </div>
        </div>
      `;

      this.cardElements.set(card.id, rotateWrapper);
      this.container.appendChild(rotateWrapper);
    });
  }

  getTopCard() {
    return this.stack[this.stack.length - 1];
  }

  updateStackPositions(animate = true) {
    const total = this.stack.length;
    const duration = animate ? 0.45 : 0;
    const ease = "power2.out";

    this.stack.forEach((card, index) => {
      const el = this.cardElements.get(card.id);
      if (!el) return;

      const isTop = index === total - 1;
      const depth = total - index - 1; // 0 for top card, 1 for next, etc.
      
      // Calculate transforms according to React Bits Stack formula:
      // rotateZ: (stack.length - index - 1) * 4 + randomRotate
      // scale: 1 + index * 0.06 - stack.length * 0.06
      const rotateZ = depth * 3.5 + card.randomRotate;
      const scale = 1 - depth * 0.045;
      const yOffset = depth * 4;
      const xOffset = depth * 3;
      const zIndex = index + 1;

      el.style.zIndex = zIndex;

      if (isTop) {
        el.classList.remove('card-rotate-disabled');
        el.style.pointerEvents = 'auto';
      } else {
        el.style.pointerEvents = 'auto';
      }

      if (window.gsap) {
        gsap.to(el, {
          x: xOffset,
          y: yOffset,
          scale: scale,
          rotateZ: rotateZ,
          rotateX: 0,
          rotateY: 0,
          opacity: depth > 3 ? 0.4 : 1,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });
      } else {
        el.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) scale(${scale}) rotateZ(${rotateZ}deg)`;
        el.style.transition = animate ? 'transform 0.45s ease-out' : 'none';
      }
    });
  }

  sendToBack(cardId, flingDirection = 1) {
    const targetId = cardId !== undefined ? cardId : this.getTopCard()?.id;
    if (targetId === undefined) return;

    const index = this.stack.findIndex((c) => c.id === targetId);
    if (index === -1) return;

    const topEl = this.cardElements.get(targetId);
    const [card] = this.stack.splice(index, 1);
    this.stack.unshift(card); // Move to bottom of stack

    // Smooth throw & return-to-back animation
    if (topEl && window.gsap) {
      const flyX = flingDirection * (window.innerWidth < 768 ? 200 : 320);
      const flyRotate = flingDirection * 20;

      gsap.timeline()
        .to(topEl, {
          x: flyX,
          y: -20,
          rotateZ: flyRotate,
          opacity: 0.6,
          scale: 0.95,
          duration: 0.22,
          ease: "power2.in"
        })
        .set(topEl, {
          zIndex: 0,
          x: 0,
          y: 20,
          rotateZ: card.randomRotate,
          opacity: 0.4,
          scale: 0.8
        })
        .then(() => {
          this.updateStackPositions(true);
        });
    } else {
      this.updateStackPositions(true);
    }
  }

  bringPrevious() {
    if (this.stack.length <= 1) return;

    // Pop the bottom card and place it at the top
    const card = this.stack.shift();
    this.stack.push(card);

    const topEl = this.cardElements.get(card.id);
    if (topEl && window.gsap) {
      topEl.style.zIndex = this.stack.length + 10;
      gsap.fromTo(topEl, 
        { x: -260, y: -30, rotateZ: -15, opacity: 0.5, scale: 0.9 },
        {
          x: 0,
          y: 0,
          rotateZ: card.randomRotate,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.4)",
          onComplete: () => {
            this.updateStackPositions(true);
          }
        }
      );
    } else {
      this.updateStackPositions(true);
    }
  }

  bindEvents() {
    let startX = 0;
    let startY = 0;
    let deltaX = 0;
    let deltaY = 0;
    let isClick = true;

    const onPointerDown = (e) => {
      const topCard = this.getTopCard();
      if (!topCard) return;

      const topEl = this.cardElements.get(topCard.id);
      if (!topEl || !topEl.contains(e.target)) return;

      if (this.hoverInterval) {
        clearInterval(this.hoverInterval);
        this.hoverInterval = null;
      }

      this.isDragging = true;
      this.dragPointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      deltaX = 0;
      deltaY = 0;
      isClick = true;

      topEl.classList.add('is-dragging');
      topEl.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!this.isDragging || e.pointerId !== this.dragPointerId) return;

      deltaX = e.clientX - startX;
      deltaY = e.clientY - startY;

      if (Math.hypot(deltaX, deltaY) > 6) {
        isClick = false;
      }

      const topCard = this.getTopCard();
      const topEl = this.cardElements.get(topCard.id);
      if (!topEl) return;

      // 3D dynamic tilt calculation matching React Bits CardRotate:
      // rotateX: transform(y, [-100, 100], [60, -60])
      // rotateY: transform(x, [-100, 100], [-60, 60])
      const rotX = Math.max(-30, Math.min(30, -deltaY * 0.25));
      const rotY = Math.max(-30, Math.min(30, deltaX * 0.25));

      if (window.gsap) {
        gsap.set(topEl, {
          x: deltaX,
          y: deltaY,
          rotateX: rotX,
          rotateY: rotY,
          rotateZ: topCard.randomRotate + deltaX * 0.05
        });
      } else {
        topEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${topCard.randomRotate}deg)`;
      }
    };

    const onPointerUp = (e) => {
      if (!this.isDragging || e.pointerId !== this.dragPointerId) return;
      this.isDragging = false;

      const topCard = this.getTopCard();
      const topEl = this.cardElements.get(topCard.id);
      if (topEl) {
        topEl.classList.remove('is-dragging');
        try {
          topEl.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }

      const distance = Math.hypot(deltaX, deltaY);
      if (distance > this.options.sensitivity) {
        // Dragged beyond threshold -> Send to back in drag direction
        const flingDir = deltaX >= 0 ? 1 : -1;
        this.sendToBack(topCard.id, flingDir);
      } else if (isClick && this.options.sendToBackOnClick) {
        // Simple click without drag -> Cycle to next card
        this.sendToBack(topCard.id, 1);
      } else {
        // Released without threshold -> Spring back to rest position
        this.updateStackPositions(true);
      }
    };

    this.container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // Double click to open full lightbox
    this.container.addEventListener('dblclick', () => {
      const topCard = this.getTopCard();
      if (topCard) openCertificateLightbox(topCard);
    });

    // Automatic Next on Mouse Hover
    this.container.addEventListener('mouseenter', () => {
      if (this.isDragging) return;

      // 1. Advance immediately upon hovering
      this.sendToBack(undefined, 1);

      // 2. Continue advancing smoothly every 2.2s while cursor stays hovered
      if (this.hoverInterval) clearInterval(this.hoverInterval);
      this.hoverInterval = setInterval(() => {
        if (!this.isDragging) {
          this.sendToBack(undefined, 1);
        }
      }, 2200);
    });

    this.container.addEventListener('mouseleave', () => {
      if (this.hoverInterval) {
        clearInterval(this.hoverInterval);
        this.hoverInterval = null;
      }
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      const section = document.getElementById('certificates');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        this.sendToBack();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.bringPrevious();
      }
    });
  }

  initAutoplay() {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
    if (!this.options.autoplay) return;

    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused && !this.isDragging) {
        this.sendToBack(undefined, 1);
      }
    }, this.options.autoplayDelay);
  }
}

function initCertificatesStack() {
  const stack = new ReactBitsStack('certificatesStack', {
    randomRotation: true,
    sensitivity: 100,
    sendToBackOnClick: true,
    autoplay: false,
    autoplayDelay: 3200,
    pauseOnHover: true,
    cards: CERTIFICATES_DATA
  });

  // Lightbox close handlers
  const modal = document.getElementById('certLightboxModal');
  const closeBtn = document.getElementById('closeCertLightboxBtn');

  const closeCertModal = () => {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeCertModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCertModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeCertModal();
    }
  });
}

/* Lightbox Modal Opener with Zoom Toggle (Clean Image Only) */
function openCertificateLightbox(cert) {
  const modal = document.getElementById('certLightboxModal');
  const modalBody = document.getElementById('certLightboxBody');
  const screenFlash = document.getElementById('screenFlash');

  if (!modal || !modalBody || !cert) return;

  modalBody.innerHTML = `
    <div class="cert-lightbox-img-wrap" title="Click to zoom in/out">
      <img src="${cert.image}" alt="${cert.title}" class="cert-lightbox-img" id="certModalImg">
    </div>
  `;

  // Toggle image zoom on click inside modal
  const imgEl = document.getElementById('certModalImg');
  if (imgEl) {
    imgEl.addEventListener('click', () => {
      imgEl.classList.toggle('is-zoomed');
    });
  }

  // Screen Flash Effect
  if (screenFlash) {
    screenFlash.classList.add('flash-active');
    setTimeout(() => {
      screenFlash.classList.remove('flash-active');
    }, 120);
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* --------------------------------------------------------------------------
   6. Toast Notifications
   -------------------------------------------------------------------------- */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

/* --------------------------------------------------------------------------
   7. Contact Form Handler (Direct Delivery to ellyzpalajoren62@gmail.com)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const btnText = submitBtn.querySelector('.btn-text');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showToast('⚠️ Please fill out all fields before sending.');
      return;
    }

    // Disable button and indicate sending
    submitBtn.disabled = true;
    const originalText = btnText ? btnText.textContent : 'SEND MESSAGE';
    if (btnText) btnText.textContent = 'SENDING MESSAGE...';

    try {
      const response = await fetch('https://formsubmit.co/ajax/ellyzpalajoren62@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Portfolio Message from ${name} (${email})`,
          _replyto: email,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json();

      if (response.ok || data.success === "true" || data.success === true) {
        form.reset();
        showToast('✓ Message sent successfully to Ellyz!');
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX fallback to mailto draft:', err);
      // Fallback: Opens pre-filled email draft to ellyzpalajoren62@gmail.com
      const mailtoUrl = `mailto:ellyzpalajoren62@gmail.com?subject=${encodeURIComponent('Portfolio Message from ' + name)}&body=${encodeURIComponent('Sender: ' + name + ' (' + email + ')\n\nMessage:\n' + message)}`;
      window.location.href = mailtoUrl;
      showToast('✓ Email draft prepared for ellyzpalajoren62@gmail.com');
      form.reset();
    } finally {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = originalText;
    }
  });
}

/* --------------------------------------------------------------------------
   8. Dark / Light Mode Theme Toggle
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const drawerToggleBtn = document.getElementById('drawerThemeToggleBtn');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', initialTheme);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);

    showToast(`✓ Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  };

  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
  if (drawerToggleBtn) drawerToggleBtn.addEventListener('click', toggleTheme);
}


