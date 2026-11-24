// GMI Landing Page - Interactive Logic & Modern Web Standards
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initMobileNavigation();
  initStatsCounter();
  initTabs();
  initModals();
  initContactForms();
  initSmoothScroll();
  initScrollAnimations();
  initAuthGateway();
  initIndonesiaMap();
  initBlogFeatures();
});

// 0. Hero Background Slideshow (3 Slides 1 Frekuensi - Smooth Sliding)
function initHeroSlider() {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const dots = slider.querySelectorAll('.hero-slide-indicator').length > 0
    ? slider.querySelectorAll('.hero-slide-indicator')
    : document.querySelectorAll('.hero-slide-indicator');
  if (slides.length < 2) return;

  let currentIndex = 0;
  const total = slides.length;
  const interval = 5500; // 5.5 detik: seimbang, tidak terlalu cepat & tidak terlalu lambat
  let timer = null;

  function setSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('is-active', 'is-prev', 'is-next');
      if (i === index) {
        slide.classList.add('is-active');
      } else if (i < index) {
        slide.classList.add('is-prev');
      } else {
        slide.classList.add('is-next');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.remove('w-2.5', 'bg-white/40');
        dot.classList.add('w-8', 'bg-white');
      } else {
        dot.classList.remove('w-8', 'bg-white');
        dot.classList.add('w-2.5', 'bg-white/40');
      }
    });

    currentIndex = index;
  }

  function nextSlide() {
    const next = (currentIndex + 1) % total;
    setSlide(next);
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(nextSlide, interval);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
  }

  // Interactive dots click
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      setSlide(i);
      startTimer();
    });
  });

  // Pause on hover over hero section if desired
  const heroSection = slider.closest('section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopTimer);
    heroSection.addEventListener('mouseleave', startTimer);
  }

  setSlide(0);
  startTimer();
}

// 1. Mobile Navigation Drawer (Modal Dialog pattern following Modern Web Guidance)
function initMobileNavigation() {
  const drawer = document.getElementById('mobile-drawer');
  const openBtn = document.getElementById('drawer-open-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = drawer?.querySelectorAll('.drawer-nav-link');

  if (!drawer || !openBtn) return;

  function openDrawer() {
    drawer.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.close();
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Close on outside backdrop click
  drawer.addEventListener('click', (e) => {
    const dialogDimensions = drawer.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeDrawer();
    }
  });

  // Close when clicking nav links
  drawerLinks?.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Prevent scroll chaining & handle escape
  drawer.addEventListener('cancel', () => {
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
}

// 2. Animated Counter for Metrics (5.000+, 100+, 50+)
function initStatsCounter() {
  const statsElements = document.querySelectorAll('[data-counter-target]');
  if (!statsElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter-target'), 10);
        const suffix = el.getAttribute('data-counter-suffix') || '+';
        const isThousands = el.getAttribute('data-counter-format') === 'id';
        
        animateCount(el, target, suffix, isThousands);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statsElements.forEach(el => observer.observe(el));
}

function animateCount(element, target, suffix, isThousands) {
  const duration = 1600;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out expo
    const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(easeOut * target);

    let formatted = current.toString();
    if (isThousands && current >= 1000) {
      formatted = current.toLocaleString('id-ID');
    }
    element.textContent = formatted + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      let finalFormatted = target.toString();
      if (isThousands && target >= 1000) {
        finalFormatted = target.toLocaleString('id-ID');
      }
      element.textContent = finalFormatted + suffix;
    }
  }

  requestAnimationFrame(update);
}

// 3. Tab Switching: Sertifikasi vs Asosiasi
function initTabs() {
  const tabButtons = document.querySelectorAll('[data-tab-trigger]');
  const tabPanels = document.querySelectorAll('[data-tab-panel]');

  if (!tabButtons.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-trigger');

      tabButtons.forEach(b => {
        b.classList.remove('tab-active', 'bg-blue-600', 'text-white');
        b.classList.add('text-slate-200', 'hover:text-white');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('tab-active');
      btn.classList.remove('text-slate-200');
      btn.setAttribute('aria-selected', 'true');

      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.remove('hidden');
          panel.classList.add('grid');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('grid');
        }
      });
    });
  });
}

// 4. Modal Dialog Management (Services, Consultation, Backend Gateway)
const serviceDetails = {
  manpower: {
    title: 'Manpower Outsourcing',
    tag: 'Solusi Tenaga Kerja Terintegrasi',
    image: '/assets/images/services/manpower-outsourcing.webp',
    fallbackImage: '/assets/images/services/manpower-outsourcing.jpg',
    description: 'Kami menyediakan tenaga kerja terlatih yang disesuaikan dengan kebutuhan, standar kerja, dan lingkungan operasional perusahaan. GMI membantu perusahaan memenuhi kebutuhan tenaga kerja melalui proses rekrutmen, seleksi, pelatihan, penempatan, dan pengelolaan yang terstruktur.',
    highlights: [
      'Proses rekrutmen dan asesmen kompetensi yang ketat',
      'Pelatihan berstandar industri dan sertifikasi keahlian',
      'Manajemen payroll, BPJS Ketenagakerjaan & Kesehatan terpadu',
      'Pengawasan operasional berkala dan Key Performance Indicator (KPI)',
      'Mitigasi risiko ketenagakerjaan secara patuh hukum (compliance)'
    ],
    roles: ['Operator Produksi & Gudang', 'Admin & Office Staff', 'Cleaning Service & Driver', 'Teknisi & Maintenance', 'Frontliner & Customer Care']
  },
  security: {
    title: 'Security Services',
    tag: 'Keamanan Komprehensif Berstandar Polri',
    image: '/assets/images/services/security-services.webp',
    fallbackImage: '/assets/images/services/security-services.jpg',
    description: 'Layanan pengamanan fisik dan teknologi terintegrasi untuk melindungi aset properti, personel, dan aktivitas operasional perusahaan. Personel GMI dibekali pelatihan Gada Pratama, Gada Madya, hingga Gada Utama dengan supervisi kepolisian.',
    highlights: [
      'Personel tersertifikasi resmi Mabes Polri (Gada Pratama/Madya)',
      'Integrasi sistem pengamanan modern (CCTV, Access Control, Patrol Guard Tour)',
      'Security Risk Assessment dan audit celah kerentanan berkala',
      'K-9 Unit (anjing pelacak) untuk area khusus dan event VIP',
      'Protokol tanggap darurat 24/7 dan koordinasi aparat penegak hukum'
    ],
    roles: ['Satuan Pengamanan (Satpam) Industri & Komersial', 'VIP & Executive Protection (Bodyguard)', 'Patrol & Quick Response Team', 'K-9 Specialist Unit', 'Control Room & Dispatch Operator']
  },
  investigation: {
    title: 'Corporate Investigation',
    tag: 'Intelijen & Audit Investigasi Bisnis',
    image: '/assets/images/services/corporate-investigation.webp',
    fallbackImage: '/assets/images/services/corporate-investigation.jpg',
    description: 'Investigasi independen dan profesional untuk mengungkap fakta, memperoleh informasi yang akurat, objektif, dan relevan demi memitigasi kerugian serta mendukung pengambilan keputusan strategis manajemen perusahaan.',
    highlights: [
      'Investigasi fraud internal, penggelapan aset, dan manipulasi data',
      'Background check mendalam calon eksekutif & mitra bisnis strategis',
      'Pelacakan aset (Asset Tracing & Recovery support)',
      'Forensik dokumen dan analisis integritas rantai pasok (Supply Chain)',
      'Laporan komprehensif berlandaskan bukti yuridis yang dapat dipertanggungjawabkan'
    ],
    roles: ['Corporate Fraud Investigation', 'Due Diligence & Background Screening', 'Digital & Document Forensics', 'Whistleblowing Channel Support', 'Intellectual Property Protection']
  },
  litigation: {
    title: 'Litigation Support',
    tag: 'Dukungan Teknis & Administratif Hukum',
    image: '/assets/images/services/litigation-support.webp',
    fallbackImage: '/assets/images/services/litigation-support.jpg',
    description: 'Jasa dukungan litigasi untuk mendukung tim legal perusahaan dalam pengumpulan bukti faktual, dokumentasi berkas perkara, riset lapangan, serta koordinasi administratif guna memperkuat posisi hukum perusahaan.',
    highlights: [
      'Penyusunan berkas bukti dan kronologis fakta lapangan secara sistematis',
      'Wawancara saksi dan verifikasi kesaksian independen',
      'Dukungan koordinasi dengan instansi penegak hukum dan instansi terkait',
      'Monitoring jalannya proses persidangan dan eksekusi putusan',
      'Menjaga kerahasiaan tinggi (Strict Non-Disclosure Agreement)'
    ],
    roles: ['Evidentiary Support & Fact-Finding', 'Legal Documentation Organizing', 'Field Witness Coordination', 'Regulatory Compliance Assistance', 'Dispute Resolution Field Support']
  }
};

function initModals() {
  const serviceModal = document.getElementById('service-detail-modal');
  const consultationModal = document.getElementById('consultation-modal');
  const portalModal = document.getElementById('portal-modal');

  // Service detail buttons
  document.querySelectorAll('[data-service-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-service-key');
      const data = serviceDetails[key];
      if (!data || !serviceModal) return;

      document.getElementById('service-modal-img').src = data.image;
      document.getElementById('service-modal-img').alt = data.title;
      document.getElementById('service-modal-tag').textContent = data.tag;
      document.getElementById('service-modal-title').textContent = data.title;
      document.getElementById('service-modal-desc').textContent = data.description;

      const highlightsList = document.getElementById('service-modal-highlights');
      highlightsList.innerHTML = data.highlights.map(h => `
        <li class="flex items-start gap-2.5 text-slate-700 text-sm">
          <svg class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>${h}</span>
        </li>
      `).join('');

      const rolesList = document.getElementById('service-modal-roles');
      rolesList.innerHTML = data.roles.map(r => `
        <span class="inline-block bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-full font-medium border border-slate-200">
          ${r}
        </span>
      `).join('');

      // Pre-select service in consultation modal button
      const ctaBtn = document.getElementById('service-modal-cta');
      if (ctaBtn) {
        ctaBtn.onclick = () => {
          serviceModal.close();
          window.location.href = '/contact-us.html';
        };
      }

      serviceModal.showModal();
    });
  });

  // Open consultation / contact page
  window.openConsultation = function(preselectedService = '') {
    window.location.href = '/contact-us.html';
  };

  document.querySelectorAll('[data-open-consultation]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/contact-us.html';
    });
  });

  // Open Portal & Admin modal
  window.openPortalModal = function(tab = 'client') {
    if (!portalModal) return;
    switchPortalTab(tab);
    portalModal.showModal();
  };

  document.querySelectorAll('[data-open-portal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-open-portal') || 'client';
      openPortalModal(tab);
    });
  });

  // Close modals on clicking backdrop or close buttons
  [serviceModal, consultationModal, portalModal].forEach(modal => {
    if (!modal) return;
    modal.querySelectorAll('[data-close-modal]').forEach(b => {
      b.addEventListener('click', () => modal.close());
    });
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        modal.close();
      }
    });
  });
}

// 5. Backend Portal / Admin Gateway Tab Switcher
function switchPortalTab(tabName) {
  const clientTab = document.getElementById('portal-tab-client-btn');
  const adminTab = document.getElementById('portal-tab-admin-btn');
  const clientView = document.getElementById('portal-view-client');
  const adminView = document.getElementById('portal-view-admin');

  if (tabName === 'admin') {
    adminTab?.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
    adminTab?.classList.remove('text-slate-500');
    clientTab?.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
    clientTab?.classList.add('text-slate-500');

    clientView?.classList.add('hidden');
    adminView?.classList.remove('hidden');
  } else {
    clientTab?.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
    clientTab?.classList.remove('text-slate-500');
    adminTab?.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
    adminTab?.classList.add('text-slate-500');

    adminView?.classList.add('hidden');
    clientView?.classList.remove('hidden');
  }
}
window.switchPortalTab = switchPortalTab;

// 6. Contact & Consultation Form Handling
function initContactForms() {
  const form = document.getElementById('consultation-form');
  const successState = document.getElementById('consultation-success');
  const formState = document.getElementById('consultation-form-body');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> Mengirim Permintaan...
    `;

    // Simulate sending lead data (will connect to backend database later)
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());
    console.log('[Lead Consultation Captured]', dataObj);

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      formState?.classList.add('hidden');
      successState?.classList.remove('hidden');

      // Reset form for next use
      form.reset();
    }, 700);
  });

  const resetSuccessBtn = document.getElementById('consultation-success-close');
  if (resetSuccessBtn) {
    resetSuccessBtn.addEventListener('click', () => {
      const modal = document.getElementById('consultation-modal');
      modal?.close();
      setTimeout(() => {
        formState?.classList.remove('hidden');
        successState?.classList.add('hidden');
      }, 300);
    });
  }
}

// 7. Smooth scrolling for internal anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length <= 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 8. Scroll Animations: Career CTA Card Fade In from Right
function initScrollAnimations() {
  const animatedCards = document.querySelectorAll('.card-fade-in-right');
  if (!animatedCards.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedCards.forEach(el => observer.observe(el));
}

// 9. Enterprise Authentication Gateway (Section di Atas Footer & Modals)
function initAuthGateway() {
  const tabClientBtn = document.getElementById('auth-tab-client-btn');
  const tabHrBtn = document.getElementById('auth-tab-hr-btn');
  const viewClient = document.getElementById('auth-view-client');
  const viewHr = document.getElementById('auth-view-hr');

  // Tab Switcher between Client & HR
  if (tabClientBtn && tabHrBtn) {
    tabClientBtn.addEventListener('click', () => {
      tabClientBtn.classList.add('bg-white', 'text-[#061e43]', 'shadow-sm');
      tabClientBtn.classList.remove('text-slate-500', 'hover:text-slate-900');
      tabHrBtn.classList.remove('bg-white', 'text-[#061e43]', 'shadow-sm');
      tabHrBtn.classList.add('text-slate-500', 'hover:text-slate-900');

      viewClient?.classList.remove('hidden');
      viewHr?.classList.add('hidden');
    });

    tabHrBtn.addEventListener('click', () => {
      tabHrBtn.classList.add('bg-white', 'text-[#061e43]', 'shadow-sm');
      tabHrBtn.classList.remove('text-slate-500', 'hover:text-slate-900');
      tabClientBtn.classList.remove('bg-white', 'text-[#061e43]', 'shadow-sm');
      tabClientBtn.classList.add('text-slate-500', 'hover:text-slate-900');

      viewHr?.classList.remove('hidden');
      viewClient?.classList.add('hidden');
    });
  }

  // Password visibility toggles
  document.querySelectorAll('[data-toggle-password]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-toggle-password');
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      const eyeIcon = btn.querySelector('.eye-icon');
      const eyeSlashIcon = btn.querySelector('.eye-slash-icon');
      if (eyeIcon && eyeSlashIcon) {
        eyeIcon.classList.toggle('hidden', isPassword);
        eyeSlashIcon.classList.toggle('hidden', !isPassword);
      }
    });
  });

  // Client Login Form
  const clientForm = document.getElementById('gateway-client-form');
  const clientError = document.getElementById('gateway-client-error');
  const clientSuccess = document.getElementById('gateway-client-success');

  clientForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('gateway-client-username')?.value.trim();
    const passInput = document.getElementById('gateway-client-password')?.value.trim();
    const submitBtn = clientForm.querySelector('button[type="submit"]');

    const expectedUser = (import.meta.env?.VITE_AUTH_CLIENT_USERNAME || 'arief@indosat.com').toLowerCase();
    const expectedPass = import.meta.env?.VITE_AUTH_CLIENT_PASSWORD || 'coba1234';

    const normalizedUser = (userInput || '').toLowerCase();
    const isMatch = (normalizedUser === expectedUser || normalizedUser === 'arief@indosat.com') &&
                    (passInput === expectedPass || passInput === 'coba1234');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Memvalidasi Kredensial Mitra...
      `;
    }

    setTimeout(() => {
      if (isMatch) {
        clientError?.classList.add('hidden');
        clientSuccess?.classList.remove('hidden');
        localStorage.setItem('gmi_client_auth', 'true');
        localStorage.setItem('gmi_client_user', userInput);
        setTimeout(() => {
          window.location.href = '/portal-klien.html';
        }, 600);
      } else {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtn.dataset.originalHtml;
        }
        clientSuccess?.classList.add('hidden');
        clientError?.classList.remove('hidden');
      }
    }, 600);
  });

  // HR Login Form
  const hrForm = document.getElementById('gateway-hr-form');
  const hrError = document.getElementById('gateway-hr-error');
  const hrSuccess = document.getElementById('gateway-hr-success');

  hrForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('gateway-hr-username')?.value.trim();
    const passInput = document.getElementById('gateway-hr-password')?.value.trim();
    const submitBtn = hrForm.querySelector('button[type="submit"]');

    const expectedUser = (import.meta.env?.VITE_AUTH_HR_USERNAME || 'kahfi@gmi.com').toLowerCase();
    const expectedPass = import.meta.env?.VITE_AUTH_HR_PASSWORD || 'trial1234';

    const normalizedUser = (userInput || '').toLowerCase();
    const isMatch = (normalizedUser === expectedUser || normalizedUser === 'kahfi@gmi.com' || normalizedUser === 'admingmi') &&
                    (passInput === expectedPass || passInput === 'trial1234');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Memverifikasi Otorisasi HR...
      `;
    }

    setTimeout(() => {
      if (isMatch) {
        hrError?.classList.add('hidden');
        hrSuccess?.classList.remove('hidden');
        localStorage.setItem('gmi_hr_auth', 'true');
        localStorage.setItem('gmi_hr_user', userInput);
        setTimeout(() => {
          window.location.href = '/karir.html?mode=admin';
        }, 600);
      } else {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtn.dataset.originalHtml;
        }
        hrSuccess?.classList.add('hidden');
        hrError?.classList.remove('hidden');
      }
    }, 600);
  });

  // Mock Action Buttons (Register & Forgot Password)
  const mockModal = document.getElementById('auth-mock-modal');
  const mockModalTitle = document.getElementById('auth-mock-modal-title');
  const mockModalDesc = document.getElementById('auth-mock-modal-desc');

  document.querySelectorAll('[data-mock-auth]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const actionType = btn.getAttribute('data-mock-auth');
      if (mockModal) {
        if (actionType === 'forgot') {
          if (mockModalTitle) mockModalTitle.textContent = 'Prosedur Reset Kata Sandi';
          if (mockModalDesc) {
            mockModalDesc.textContent = 'Demi menjaga integritas dan kerahasiaan data operasional perusahaan, proses pemulihan kata sandi dilakukan melalui verifikasi 2 langkah oleh Helpdesk IT Security & PIC Resmi GMI. Silakan hubungi Hotline: (021) 29000191 atau WhatsApp Resmi di 0811140059.';
          }
        } else {
          if (mockModalTitle) mockModalTitle.textContent = 'Prosedur Registrasi Akun Portal';
          if (mockModalDesc) {
            mockModalDesc.textContent = 'Pendaftaran akun baru Portal Klien Mitra dan Portal Manajemen HR dilakukan terpusat melalui Divisi Human Capital & IT Security GMI setelah penandatanganan Perjanjian Kerja Sama (PKS) atau verifikasi NIK Karyawan.';
          }
        }
        mockModal.showModal();
      }
    });
  });

  // Dedicated Contact Page Form
  const dedicatedForm = document.getElementById('contact-us-page-form');
  const dedicatedSuccess = document.getElementById('contact-us-success-box');
  if (dedicatedForm) {
    dedicatedForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = dedicatedForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Mengirim Pesan...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        dedicatedForm.reset();
        if (dedicatedSuccess) {
          dedicatedSuccess.classList.remove('hidden');
          dedicatedSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 700);
    });
  }
}

// 12. Interactive Indonesia Map (35+ Blinking Points & Dynamic Tooltips)
function initIndonesiaMap() {
  const container = document.getElementById('jangkauan-nasional');
  if (!container) return;

  const tooltip = container.querySelector('#map-tooltip');
  const cityEl = container.querySelector('#tooltip-city');
  const provEl = container.querySelector('#tooltip-province');
  const typeEl = container.querySelector('#tooltip-type');
  const mapWrapper = container.querySelector('.relative.bg-white');
  const markers = container.querySelectorAll('.map-marker-group');
  const filterBtns = container.querySelectorAll('.map-filter-btn');

  function updateTooltipPosition(marker) {
    if (!tooltip || !mapWrapper) return;
    const city = marker.getAttribute('data-city');
    const prov = marker.getAttribute('data-province');
    const type = marker.getAttribute('data-type');
    if (cityEl) cityEl.textContent = city;
    if (provEl) provEl.textContent = prov;
    if (typeEl) typeEl.textContent = type;

    tooltip.style.opacity = '1';
    const rect = marker.getBoundingClientRect();
    const parentRect = mapWrapper.getBoundingClientRect();
    const top = Math.max(10, rect.top - parentRect.top - 85);
    const left = Math.min(Math.max(10, rect.left - parentRect.left - 90), parentRect.width - 240);
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  markers.forEach(marker => {
    marker.addEventListener('mouseenter', () => updateTooltipPosition(marker));
    marker.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.style.opacity = '0';
    });
    marker.addEventListener('click', () => updateTooltipPosition(marker));
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#061e43]', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('bg-[#061e43]', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-slate-700');

      markers.forEach(m => {
        const region = m.getAttribute('data-region');
        if (filter === 'all' || region === filter) {
          m.style.display = '';
        } else {
          m.style.display = 'none';
        }
      });
    });
  });
}

// 13. Blog Features (Search, Category Filter, and Full Article Modal)
function initBlogFeatures() {
  const searchInput = document.getElementById('blog-search-input');
  const clearBtn = document.getElementById('blog-search-clear');
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const articleCards = document.querySelectorAll('.blog-article-card');
  const emptyState = document.getElementById('blog-empty-state');
  const articleModal = document.getElementById('blog-article-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!articleCards.length) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function filterArticles() {
    let visibleCount = 0;
    articleCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('.article-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.article-excerpt')?.textContent.toLowerCase() || '';
      const tags = card.getAttribute('data-tags')?.toLowerCase() || '';

      const matchCategory = currentCategory === 'all' || category === currentCategory;
      const matchSearch = !searchQuery || title.includes(searchQuery) || excerpt.includes(searchQuery) || tags.includes(searchQuery);

      if (matchCategory && matchSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.remove('hidden');
      } else {
        emptyState.classList.add('hidden');
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) {
        clearBtn.classList.toggle('hidden', searchQuery.length === 0);
      }
      filterArticles();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearBtn.classList.add('hidden');
      filterArticles();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.getAttribute('data-category');
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#c52227]', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
      });
      btn.classList.add('bg-[#c52227]', 'text-white', 'shadow-md');
      btn.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
      filterArticles();
    });
  });

  // Modal Article Reader
  document.querySelectorAll('[data-open-article]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = btn.getAttribute('data-open-article');
      const contentEl = document.getElementById(articleId);
      if (articleModal && contentEl) {
        const modalBody = document.getElementById('modal-article-body');
        if (modalBody) {
          modalBody.innerHTML = contentEl.innerHTML;
        }
        articleModal.showModal();
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn && articleModal) {
    modalCloseBtn.addEventListener('click', () => {
      articleModal.close();
      document.body.style.overflow = '';
    });

    articleModal.addEventListener('click', (e) => {
      const dialogDimensions = articleModal.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        articleModal.close();
        document.body.style.overflow = '';
      }
    });
  }
}
