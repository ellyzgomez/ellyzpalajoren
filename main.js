/**
 * Ellyz Gomez — Portfolio Master JavaScript
 * Handles Theme Management, Project Case Studies, Story Highlights,
 * Interactive 3D Certificate Stack, Navigation ScrollSpy, Form Submissions, and Social Actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme Switcher
  initThemeToggle();

  // 2. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 3. Initialize Core Interactive Components
  initProjectModals();
  initCertificatesModal();
  initStoryViewer();
  initNavigation();
  initSocialInteractions();
  initCertificatesStack();
  initResumeButtons();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. THEME SWITCHER (Dark / Light Mode with LocalStorage Persistence)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('headerThemeToggle');
  const savedTheme = localStorage.getItem('ellyz-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('ellyz-theme', nextTheme);
      showToast(`✓ Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }
}

/* --------------------------------------------------------------------------
   2. PROJECT DATABASE & CASE STUDY MODAL HANDLER
   -------------------------------------------------------------------------- */
const PROJECTS_DATABASE = {
  'chic-wear': {
    title: 'Chic Wear E-commerce',
    category: 'Branding & UI / Web Application',
    image: 'assets/project_chic_wear.jpg',
    likes: '4.1k',
    comments: '289',
    tags: ['#Figma', '#HTML5/CSS3', '#Branding', '#ECommerce', '#ResponsiveDesign'],
    description: `A high-end editorial fashion e-commerce interface and brand identity designed for luxury boutique retail. Features intuitive category filtering, elegant micro-interactions, responsive grid layout, and seamless cart & checkout prototypes.`,
    prototypeUrl: 'https://github.com/ellyzgomez',
    sourceUrl: 'https://github.com/ellyzgomez'
  },
  'zenith-health': {
    title: 'Zenith Health App',
    category: 'App Design / Healthcare UI/UX',
    image: 'assets/project_zenith_health.jpg',
    likes: '3.5k',
    comments: '198',
    tags: ['#MobileUI', '#UIUX', '#HealthTech', '#Figma', '#React'],
    description: `A modern mobile health & wellness dashboard app. Features real-time vitals tracking (Heart Rate, Blood Pressure, Steps, Sleep analytics), personalized wellness score calculations, and clean visual data charts for patients and doctors.`,
    prototypeUrl: 'https://github.com/ellyzgomez',
    sourceUrl: 'https://github.com/ellyzgomez'
  },
  'aria-music': {
    title: 'Aria Music Platform',
    category: 'Streaming UI / Audio Visualizer',
    image: 'assets/project_aria_music.jpg',
    likes: '5.2k',
    comments: '340',
    tags: ['#MusicPlayer', '#DarkMode', '#AudioVisualizer', '#UIUX', '#WebAudio'],
    description: `An immersive dark mode audio streaming platform with real-time waveform visualizers, dynamic track queue management, playlist curation, and synchronized lyrics support.`,
    prototypeUrl: 'https://github.com/ellyzgomez',
    sourceUrl: 'https://github.com/ellyzgomez'
  },
  'bloom-branding': {
    title: 'Bloom Cosmetics',
    category: 'Brand Identity & Packaging',
    image: 'assets/project_bloom_branding.jpg',
    likes: '2.8k',
    comments: '112',
    tags: ['#BrandIdentity', '#Typography', '#Packaging', '#Canva', '#Photoshop'],
    description: `Comprehensive brand identity design and sustainable packaging system for Bloom Cosmetics. Includes embossed business cards, stationery, product packaging, and cohesive color harmony.`,
    prototypeUrl: 'https://github.com/ellyzgomez',
    sourceUrl: 'https://github.com/ellyzgomez'
  },
  'echo-podcast': {
    title: 'Echo Podcast Player',
    category: 'Mobile Application UI/UX',
    image: 'assets/project_echo_podcast.jpg',
    likes: '3.1k',
    comments: '175',
    tags: ['#PodcastApp', '#AudioStreaming', '#Prototyping', '#Figma', '#MobileUI'],
    description: `An intuitive podcast discovery and player application with dark purple gradient themes, episode chapter bookmarks, audio speed controls, and interactive creator profiles.`,
    prototypeUrl: 'https://github.com/ellyzgomez',
    sourceUrl: 'https://github.com/ellyzgomez'
  },
  'luxe-interior': {
    title: 'Luxe Interior Architecture',
    category: 'Architectural Web Design & Spatial Systems',
    image: 'assets/project_luxe_interior.jpg',
    likes: '4.6k',
    comments: '312',
    tags: ['#InteriorDesign', '#Architecture', '#WebDesign', '#CSSGrid', '#Minimalism'],
    description: `A minimalist luxury interior architecture portfolio showcasing spatial living room designs, curated bespoke furniture, and smooth editorial galleries.`,
    prototypeUrl: 'https://github.com/ellyzgomez',
    sourceUrl: 'https://github.com/ellyzgomez'
  },
  'veridia-fintech': {
    title: 'Veridia FinTech Mobile',
    category: 'FinTech & Investment Dashboard',
    image: 'assets/project_veridia_campaign.jpg',
    likes: '6.3k',
    comments: '420',
    tags: ['#FinTech', '#Crypto', '#InvestmentApp', '#Dashboard', '#UIUX'],
    description: `A high-performance crypto and stock portfolio management mobile application. Features live candlestick charting, asset distribution breakdown, and instant transaction flows.`,
    prototypeUrl: 'https://github.com/ellyzgomez',
    sourceUrl: 'https://github.com/ellyzgomez'
  },
  'cisco-networking': {
    title: 'Cisco Packet Tracer Suite',
    category: 'Networking Architecture & Cyber Defense',
    image: 'assets/cisco-packet-tracer.png',
    likes: '2.9k',
    comments: '142',
    tags: ['#Cisco', '#PacketTracer', '#CyberSecurity', '#Subnetting', '#Networking'],
    description: `Comprehensive multi-router network topology and cybersecurity framework engineered in Cisco Packet Tracer. Features VLAN segmentation, ACL firewall rules, and threat mitigation.`,
    prototypeUrl: 'https://github.com/ellyzgomez',
    sourceUrl: 'https://github.com/ellyzgomez'
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('caseStudyModalContent');
  const closeBtn = document.getElementById('closeProjectModalBtn');
  const projectCards = document.querySelectorAll('.featured-project-card, .feed-project-card, [data-project-trigger]');

  const openProjectModal = (projectId) => {
    const project = PROJECTS_DATABASE[projectId];
    if (!project || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-case-header">
        <span class="modal-case-category">${project.category}</span>
        <h2 class="modal-case-title">${project.title}</h2>
      </div>
      <div class="modal-case-hero-img-wrap">
        <img src="${project.image}" alt="${project.title}" class="modal-case-hero-img">
      </div>
      <p class="modal-case-desc">${project.description}</p>
      <div class="modal-case-tags">
        ${project.tags.map(tag => `<span class="modal-case-tag-chip">${tag}</span>`).join('')}
      </div>
      <div class="modal-case-actions">
        <a href="${project.prototypeUrl}" target="_blank" rel="noopener noreferrer" class="btn-modal-action">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          <span>View Live Prototype</span>
        </a>
        <a href="${project.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn-modal-action" style="background: var(--bg-frame); color: var(--text-pure); border: 1px solid var(--border-dark);">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <span>Source Code</span>
        </a>
      </div>
    `;

    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeProjectModal = () => {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.projectTrigger || card.dataset.projectId;
      if (projectId) openProjectModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }
}

/* --------------------------------------------------------------------------
   3. STORY HIGHLIGHT VIEWER
   -------------------------------------------------------------------------- */
const STORY_DATA = {
  'design-projects': {
    title: 'Design Projects & Wireframes',
    slides: [
      {
        image: 'assets/story_wireframes_preview.jpg',
        caption: 'Behind-the-Scenes: Figma design system components, layout grids, and user flow schematics.'
      },
      {
        image: 'assets/project_chic_wear.jpg',
        caption: 'Chic Wear E-commerce: Responsive high-fidelity layout prototype.'
      },
      {
        image: 'assets/project_zenith_health.jpg',
        caption: 'Zenith Health: Interactive mobile screen architecture & vitals analytics.'
      }
    ]
  },
  'awards': {
    title: 'Certifications & Recognitions',
    slides: [
      {
        image: 'assets/cisco-network-addressing.png',
        caption: 'Cisco Networking Academy • Network Addressing and Basic Troubleshooting Certified.'
      },
      {
        image: 'assets/canva-essentials.png',
        caption: 'Canva Design School • Canva Essentials Certified Specialist.'
      }
    ]
  },
  'about-me': {
    title: 'About Ellyz Gomez',
    slides: [
      {
        image: 'assets/hero-portrait.png',
        caption: '4th Year IT Student at Quezon City University • Specializing in UI/UX & Web Development.'
      },
      {
        image: 'assets/story_wireframes_preview.jpg',
        caption: 'Crafting user-centered interfaces with Figma, modern JavaScript, and clean CSS.'
      }
    ]
  },
  'certificates': {
    title: 'Verified Certificates',
    slides: [
      {
        image: 'assets/cisco-packet-tracer.png',
        caption: 'Cisco Networking Academy • Getting Started with Cisco Packet Tracer.'
      },
      {
        image: 'assets/cisco-cyber-threat.png',
        caption: 'Cisco Networking Academy • Cyber Threat Management Certified.'
      },
      {
        image: 'assets/canva-graphic-design.png',
        caption: 'Canva Design School • Graphic Design Essentials Certificate.'
      }
    ]
  },
  'skills': {
    title: 'Skills Matrix',
    slides: [
      {
        image: 'assets/story_wireframes_preview.jpg',
        caption: 'Development: HTML5, CSS3, JavaScript, React, Node.js, PHP, Python, SQL.'
      },
      {
        image: 'assets/cisco-packet-tracer.png',
        caption: 'Design & Tools: Canva, Video Editing, Microsoft Office, Google Workspace, Troubleshooting.'
      }
    ]
  },
  'behind-the-scenes': {
    title: 'Behind The Scenes Workflow',
    slides: [
      {
        image: 'assets/story_wireframes_preview.jpg',
        caption: 'Initial low-fidelity wireframes and user journey mapping.'
      },
      {
        image: 'assets/project_aria_music.jpg',
        caption: 'Polishing dark mode contrast, glowing visualizers, and responsive cards.'
      }
    ]
  }
};

function initStoryViewer() {
  const storyModal = document.getElementById('storyViewerModal');
  const storyCategoryTitle = document.getElementById('storyCategoryTitle');
  const storyViewport = document.getElementById('storySlideViewport');
  const closeStoryBtn = document.getElementById('closeStoryViewerBtn');
  const prevBtn = document.getElementById('storyPrevBtn');
  const nextBtn = document.getElementById('storyNextBtn');
  const storyItems = document.querySelectorAll('.story-highlight-item');

  let currentCategory = 'design-projects';
  let currentSlideIndex = 0;
  let storyTimer = null;

  const renderSlide = () => {
    const story = STORY_DATA[currentCategory];
    if (!story || !story.slides[currentSlideIndex]) return;

    const slide = story.slides[currentSlideIndex];
    if (storyCategoryTitle) storyCategoryTitle.textContent = story.title;

    if (storyViewport) {
      storyViewport.innerHTML = `
        <div style="position: relative; width: 100%; height: 100%;">
          <img src="${slide.image}" alt="${story.title}" class="story-slide-img">
          <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 24px 18px 20px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);">
            <p style="font-size: 0.82rem; color: #fff; line-height: 1.4; text-shadow: 0 1px 4px rgba(0,0,0,0.8);">${slide.caption}</p>
          </div>
        </div>
      `;
    }

    // Update Progress Bars
    const progressBar = document.getElementById('storyProgressBar');
    if (progressBar) {
      progressBar.innerHTML = story.slides.map((_, idx) => `
        <div class="story-progress-segment ${idx === currentSlideIndex ? 'active' : ''}"></div>
      `).join('');
    }

    // Auto Advance after 5 seconds
    if (storyTimer) clearTimeout(storyTimer);
    storyTimer = setTimeout(() => {
      if (currentSlideIndex < story.slides.length - 1) {
        currentSlideIndex++;
        renderSlide();
      } else {
        closeStory();
      }
    }, 5000);
  };

  const openStory = (categoryKey) => {
    currentCategory = categoryKey;
    currentSlideIndex = 0;
    renderSlide();
    if (storyModal) storyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeStory = () => {
    if (storyTimer) clearTimeout(storyTimer);
    if (storyModal) storyModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  storyItems.forEach(item => {
    item.addEventListener('click', () => {
      const key = item.dataset.story;
      openStory(key);
    });
  });

  if (closeStoryBtn) closeStoryBtn.addEventListener('click', closeStory);
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const story = STORY_DATA[currentCategory];
      if (story && currentSlideIndex < story.slides.length - 1) {
        currentSlideIndex++;
        renderSlide();
      } else {
        closeStory();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. SMOOTH NAVIGATION & ACTIVE SCROLLSPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  // Smooth scroll with sticky header offset for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 68;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if active
        const navMenu = document.querySelector('.center-nav-links');
        const menuBtn = document.getElementById('mobileMenuBtn');
        if (navMenu && navMenu.classList.contains('mobile-active')) {
          navMenu.classList.remove('mobile-active');
          if (menuBtn) menuBtn.classList.remove('open');
        }
      }
    });
  });

  // ScrollSpy to highlight active nav link
  const sections = document.querySelectorAll('.feed-section-block');
  const navLinks = document.querySelectorAll('.center-nav-links .nav-item-link');

  const onScroll = () => {
    let currentSectionId = 'home';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const centerNav = document.querySelector('.center-nav-links');
  if (mobileMenuBtn && centerNav) {
    mobileMenuBtn.addEventListener('click', () => {
      centerNav.classList.toggle('mobile-active');
      mobileMenuBtn.classList.toggle('open');
    });
  }

  // Global Escape Key to close open modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop-blur.active').forEach(m => {
        m.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });
}

/* --------------------------------------------------------------------------
   5. SOCIAL INTERACTIONS (Likes, Follows, Shares)
   -------------------------------------------------------------------------- */
function initSocialInteractions() {
  // Likes
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isLiked = btn.classList.toggle('is-liked');
      if (isLiked) {
        showToast('❤️ You liked this project!');
      }
    });
  });

  // Follow buttons
  const followButtons = [
    document.getElementById('leftFollowBtn'),
    ...document.querySelectorAll('.btn-mini-follow')
  ];

  followButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isFollowing = btn.classList.toggle('is-following');
      const textEl = btn.querySelector('.follow-text') || btn.querySelector('.btn-text');

      if (isFollowing) {
        if (textEl) textEl.textContent = 'Following ✓';
        else btn.textContent = 'Following ✓';
        showToast('✓ Following @ellyzcreative');
      } else {
        if (textEl) textEl.textContent = 'Follow';
        else btn.textContent = 'Follow';
        showToast('Unfollowed @ellyzcreative');
      }
    });
  });

  // Message pill button scrolls smoothly to Contact form
  const leftMsgBtn = document.getElementById('leftMessageBtn');
  if (leftMsgBtn) {
    leftMsgBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('contactName');
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
    });
  }

  // Share button
  const shareBtn = document.getElementById('leftShareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('🔗 Portfolio link copied to clipboard!');
      } else {
        showToast('🔗 Share URL: ' + window.location.href);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. 3D CERTIFICATE STACK (React Bits 3D Stack Component)
   -------------------------------------------------------------------------- */
const CERTIFICATES_DATA = [
  {
    id: 1,
    image: 'assets/canva-essentials.png',
    title: 'Canva Essentials',
    tag: 'DESIGN & VISUAL CREATION'
  },
  {
    id: 2,
    image: 'assets/canva-graphic-design.png',
    title: 'Graphic Design Essentials',
    tag: 'GRAPHIC DESIGN & CREATIVE'
  },
  {
    id: 3,
    image: 'assets/cisco-cyber-threat.png',
    title: 'Cyber Threat Management',
    tag: 'CYBERSECURITY'
  },
  {
    id: 4,
    image: 'assets/cisco-packet-tracer.png',
    title: 'Getting Started with Cisco Packet Tracer',
    tag: 'SIMULATION & TOOLS'
  },
  {
    id: 5,
    image: 'assets/cisco-network-addressing.png',
    title: 'Network Addressing and Basic Troubleshooting',
    tag: 'NETWORKING & TROUBLESHOOTING'
  }
];

class ReactBitsStack {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = {
      randomRotation: options.randomRotation ?? true,
      cards: options.cards || CERTIFICATES_DATA
    };

    this.stack = this.options.cards.map((card, idx) => ({
      ...card,
      id: card.id || idx + 1,
      randomRotate: this.options.randomRotation ? (Math.random() * 8 - 4) : 0
    }));

    this.cardElements = new Map();
    this.init();
  }

  init() {
    this.buildDOM();
    this.bindEvents();
    this.updateStackPositions(false);
  }

  buildDOM() {
    this.container.innerHTML = '';
    this.stack.forEach((card) => {
      const rotateWrapper = document.createElement('div');
      rotateWrapper.className = 'card-rotate';
      rotateWrapper.dataset.cardId = card.id;

      rotateWrapper.innerHTML = `
        <div class="card">
          <div class="card-image-wrap">
            <img src="${card.image}" alt="${card.title}" class="card-image" draggable="false" />
          </div>
        </div>
      `;

      this.cardElements.set(card.id, rotateWrapper);
      this.container.appendChild(rotateWrapper);
    });
  }

  updateStackPositions(animate = true) {
    const total = this.stack.length;
    const duration = animate ? 0.4 : 0;
    const ease = "power2.out";

    this.stack.forEach((card, index) => {
      const el = this.cardElements.get(card.id);
      if (!el) return;

      const depth = total - index - 1;
      const rotateZ = depth * 3.5 + card.randomRotate;
      const scale = 1 - depth * 0.045;
      const yOffset = depth * 4;
      const xOffset = depth * 3;
      const zIndex = index + 1;

      el.style.zIndex = zIndex;

      if (window.gsap) {
        gsap.to(el, {
          x: xOffset,
          y: yOffset,
          scale: scale,
          rotateZ: rotateZ,
          opacity: depth > 3 ? 0.4 : 1,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });
      } else {
        el.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) scale(${scale}) rotateZ(${rotateZ}deg)`;
      }
    });
  }

  sendToBack() {
    if (this.stack.length <= 1) return;
    const topCard = this.stack[this.stack.length - 1];
    const topEl = this.cardElements.get(topCard.id);

    const [card] = this.stack.splice(this.stack.length - 1, 1);
    this.stack.unshift(card);

    if (topEl && window.gsap) {
      gsap.timeline()
        .to(topEl, {
          x: 240,
          y: -20,
          rotateZ: 15,
          opacity: 0.5,
          scale: 0.95,
          duration: 0.2,
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

  bindEvents() {
    this.container.addEventListener('click', () => {
      this.sendToBack();
    });
  }
}

function initCertificatesStack() {
  new ReactBitsStack('certificatesStack', {
    randomRotation: true,
    cards: CERTIFICATES_DATA
  });
}

/* --------------------------------------------------------------------------
   7. RESUME DOWNLOAD HANDLER
   -------------------------------------------------------------------------- */
function initResumeButtons() {
  const downloadResume = (e) => {
    if (e) e.preventDefault();
    const link = document.createElement('a');
    link.href = 'Resume/Ellyz Gomez Resume.docx';
    link.download = 'Ellyz Gomez Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✓ Downloading Ellyz Gomez Resume (.docx)...');
  };

  const resumeBtns = document.querySelectorAll('.download-resume-btn, #downloadCvLeftBtn, #downloadResumeBtn');
  resumeBtns.forEach(btn => btn.addEventListener('click', downloadResume));
}

/* --------------------------------------------------------------------------
   8. DIRECT CONTACT FORM AJAX SUBMISSION
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
      console.warn('FormSubmit AJAX fallback to mailto:', err);
      const mailtoUrl = `mailto:ellyzpalajoren62@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('Sender: ' + name + ' (' + email + ')\n\nMessage:\n' + message)}`;
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
   9. TOAST NOTIFICATION SYSTEM
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
   10. CERTIFICATE FOLDER MODAL VIEWER
   -------------------------------------------------------------------------- */
const CERTIFICATES_DATABASE = {
  'canva-essentials': {
    title: 'Canva Essentials',
    issuer: 'Canva Design School',
    date: 'August 21, 2026',
    credentialId: 'c701b2',
    image: 'assets/canva-essentials.png',
    tag: 'DESIGN & DIGITAL CREATION',
    description: 'Official Certificate of Completion awarded to Ellyz Gomez by Canva Design School for completing the Canva Essentials course.'
  },
  'canva-graphic-design': {
    title: 'Graphic Design Essentials',
    issuer: 'Canva Design School',
    date: 'August 21, 2026',
    credentialId: 'aba828',
    image: 'assets/canva-graphic-design.png',
    tag: 'GRAPHIC DESIGN & CREATIVE',
    description: 'Official Certificate of Completion awarded to Ellyz Gomez by Canva Design School for completing the Graphic Design Essentials training course.'
  },
  'cisco-cyber-threat': {
    title: 'Cyber Threat Management',
    issuer: 'Cisco Networking Academy',
    date: 'June 13, 2025',
    image: 'assets/cisco-cyber-threat.png',
    tag: 'CYBERSECURITY & DEFENSE',
    description: 'Awarded to Ellyz Gomez for successfully completing the Cyber Threat Management course through the Cisco Networking Academy program.'
  },
  'cisco-network-addressing': {
    title: 'Network Addressing and Basic Troubleshooting',
    issuer: 'Cisco Networking Academy',
    date: 'May 31, 2025',
    image: 'assets/cisco-network-addressing.png',
    tag: 'NETWORKING & TROUBLESHOOTING',
    description: 'Student-level credential awarded to Ellyz Gomez for successfully completing the Network Addressing and Basic Troubleshooting course under Cisco Networking Academy.'
  },
  'cisco-packet-tracer': {
    title: 'Getting Started with Cisco Packet Tracer',
    issuer: 'Cisco Networking Academy',
    date: 'June 09, 2025',
    credentialId: '6e950d61-796d-4155-9a10-dfde0a3b6934',
    image: 'assets/cisco-packet-tracer.png',
    tag: 'SIMULATION & TOPOLOGY',
    description: 'Awarded to Ellyz Gomez for successfully completing the Getting Started with Cisco Packet Tracer course through the Cisco Networking Academy program.'
  }
};

function initCertificatesModal() {
  const modal = document.getElementById('certificateModal');
  const modalContent = document.getElementById('certModalContent');
  const closeBtn = document.getElementById('closeCertModalBtn');
  const certRows = document.querySelectorAll('.interactive-cert-row');

  const openCertModal = (certKey) => {
    const cert = CERTIFICATES_DATABASE[certKey];
    if (!cert || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-cert-header">
        <span class="modal-cert-tag">${cert.tag} • ${cert.date}</span>
        <h2 class="modal-cert-title">${cert.title}</h2>
        <span class="modal-cert-issuer">${cert.issuer} ${cert.credentialId ? `• ID: ${cert.credentialId}` : ''}</span>
      </div>
      <div class="modal-cert-img-wrap">
        <img src="${cert.image}" alt="${cert.title}" class="modal-cert-img">
      </div>
      <p class="modal-cert-desc">${cert.description}</p>
      <div class="modal-cert-folder-tabs">
        ${Object.keys(CERTIFICATES_DATABASE).map(k => `
          <button class="cert-folder-tab-pill ${k === certKey ? 'active' : ''}" data-folder-key="${k}">
            ${CERTIFICATES_DATABASE[k].title}
          </button>
        `).join('')}
      </div>
    `;

    // Folder tab switching inside modal
    modalContent.querySelectorAll('.cert-folder-tab-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.folderKey;
        openCertModal(key);
      });
    });

    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeCertModal = () => {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  certRows.forEach(row => {
    row.addEventListener('click', () => {
      const certId = row.dataset.certId;
      if (certId) openCertModal(certId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCertModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCertModal();
    });
  }
}
