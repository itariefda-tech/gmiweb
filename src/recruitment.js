// GMI Recruitment Portal & HR Workspace Engine
// Professional Security Authentication & State Management

document.addEventListener('DOMContentLoaded', () => {
  initModeSwitcher();
  initAdminSecurityAuth();
  initVacancySelector();
  initApplicationForm();
  initAdminDashboard();
});

// State for Admin Authentication
let isAdminAuthenticated = false;

// 1. Switcher between Public Portal & Administrator HR
function initModeSwitcher() {
  const adminBtn = document.getElementById('mode-admin-btn');
  const publicBtns = document.querySelectorAll('#mode-public-btn, [data-action="return-public"]');
  const publicView = document.getElementById('recruitment-public-view');
  const adminView = document.getElementById('recruitment-admin-view');
  const adminAuthModal = document.getElementById('admin-auth-modal');

  if (!publicView || !adminView) return;

  function switchToPublic() {
    publicView.classList.remove('hidden');
    adminView.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  publicBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchToPublic();
    });
  });

  if (adminBtn) {
    adminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isAdminAuthenticated) {
        // Require Authentication
        if (adminAuthModal) {
          adminAuthModal.showModal();
        }
      } else {
        showAdminWorkspace();
      }
    });
  }

  // Logout button in Admin Dashboard
  const adminLogoutBtn = document.getElementById('admin-logout-btn');
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      isAdminAuthenticated = false;
      switchToPublic();
    });
  }

  // Auto-trigger if query string has ?mode=admin
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('mode') === 'admin') {
    if (!isAdminAuthenticated) {
      if (adminAuthModal) {
        adminAuthModal.showModal();
      }
    } else {
      showAdminWorkspace();
    }
  }
}

// 2. Admin Security Authentication Gate
function initAdminSecurityAuth() {
  const authModal = document.getElementById('admin-auth-modal');
  const authForm = document.getElementById('admin-auth-form');
  const authError = document.getElementById('admin-auth-error');
  const authSuccess = document.getElementById('admin-auth-success');
  const submitBtn = document.getElementById('admin-auth-submit-btn');

  if (!authForm) return;

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('auth-username')?.value.trim();
    const password = document.getElementById('auth-password')?.value.trim();

    // Required Credentials
    const validUsername = 'admingmi';
    const validPassword = 'trial1234';

    if (username === validUsername && password === validPassword) {
      authError?.classList.add('hidden');
      authSuccess?.classList.remove('hidden');
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        isAdminAuthenticated = true;
        authModal?.close();
        authSuccess?.classList.add('hidden');
        if (submitBtn) submitBtn.disabled = false;
        authForm.reset();
        showAdminWorkspace();
      }, 700);
    } else {
      authError?.classList.remove('hidden');
      setTimeout(() => {
        authError?.classList.add('hidden');
      }, 4000);
    }
  });

  authModal?.querySelectorAll('[data-close-modal]').forEach(b => {
    b.addEventListener('click', () => authModal.close());
  });
}

function showAdminWorkspace() {
  const publicView = document.getElementById('recruitment-public-view');
  const adminView = document.getElementById('recruitment-admin-view');

  if (!publicView || !adminView) return;

  adminView.classList.remove('hidden');
  publicView.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Select vacancy and populate the position dropdown
function initVacancySelector() {
  const positionSelect = document.getElementById('form-position-select');
  const formSection = document.getElementById('apply-form-section');

  document.querySelectorAll('[data-apply-vacancy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const posValue = btn.getAttribute('data-apply-vacancy');
      if (positionSelect) {
        // Find matching option
        for (let i = 0; i < positionSelect.options.length; i++) {
          if (positionSelect.options[i].value === posValue || positionSelect.options[i].text.includes(posValue)) {
            positionSelect.selectedIndex = i;
            break;
          }
        }
      }
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        formSection.classList.add('ring-4', 'ring-red-100');
        setTimeout(() => formSection.classList.remove('ring-4', 'ring-red-100'), 1500);
      }
    });
  });
}

// 4. Multi-Step Form Logic (8 Steps Sesuai HRIS)
function initApplicationForm() {
  const form = document.getElementById('gmi-application-form');
  const steps = document.querySelectorAll('.form-step-pane');
  const stepTabs = document.querySelectorAll('.step-tab-btn');
  const progressBar = document.getElementById('step-progress-bar');
  const prevBtn = document.getElementById('form-prev-btn');
  const nextBtn = document.getElementById('form-next-btn');
  const submitBtn = document.getElementById('form-submit-btn');
  const stepCounter = document.getElementById('form-step-counter');
  const successState = document.getElementById('apply-success-state');
  const formBody = document.getElementById('apply-form-body');
  const formSection = document.getElementById('apply-form-section');

  let currentStep = 0;
  const totalSteps = steps.length;

  function updateStepUI() {
    steps.forEach((pane, idx) => {
      if (idx === currentStep) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    });

    stepTabs.forEach((tab, idx) => {
      const circle = tab.querySelector('.step-circle');
      if (idx === currentStep) {
        tab.classList.add('text-[#061e43]', 'border-b-2', 'border-[#c52227]');
        tab.classList.remove('text-slate-400');
        if (circle) circle.className = 'step-circle w-6 h-6 rounded-full bg-[#061e43] text-white flex items-center justify-center text-xs font-bold';
      } else if (idx < currentStep) {
        tab.classList.add('text-slate-600');
        tab.classList.remove('text-[#061e43]', 'border-b-2', 'border-[#c52227]');
        if (circle) circle.className = 'step-circle w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold';
      } else {
        tab.classList.remove('text-[#061e43]', 'border-b-2', 'border-[#c52227]');
        tab.classList.add('text-slate-400');
        if (circle) circle.className = 'step-circle w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold';
      }
    });

    if (progressBar) {
      const pct = ((currentStep + 1) / totalSteps) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (stepCounter) {
      stepCounter.textContent = `Bagian ${currentStep + 1} dari ${totalSteps}`;
    }

    if (prevBtn) {
      prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    }

    if (currentStep === totalSteps - 1) {
      nextBtn?.classList.add('hidden');
      submitBtn?.classList.remove('hidden');
    } else {
      nextBtn?.classList.remove('hidden');
      submitBtn?.classList.add('hidden');
    }
  }

  nextBtn?.addEventListener('click', () => {
    const activePane = steps[currentStep];
    const inputs = activePane.querySelectorAll('input[required], select[required], textarea[required]');
    let valid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        valid = false;
        input.reportValidity();
      }
    });

    if (valid && currentStep < totalSteps - 1) {
      currentStep++;
      updateStepUI();
      formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  prevBtn?.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateStepUI();
      formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  stepTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const stepIdx = parseInt(tab.getAttribute('data-step-target'), 10);
      if (!isNaN(stepIdx)) {
        currentStep = stepIdx;
        updateStepUI();
      }
    });
  });

  document.querySelectorAll('input[type="file"]').forEach(fileInput => {
    fileInput.addEventListener('change', () => {
      const dropZone = fileInput.closest('.upload-drop-zone') || fileInput.closest('.upload-card');
      const label = dropZone?.querySelector('.file-name-label') || dropZone?.querySelector('[data-file-name]');
      if (label && fileInput.files && fileInput.files.length > 0) {
        label.textContent = fileInput.files[0].name;
        label.classList.add('text-emerald-600', 'font-semibold');
      }
    });
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Mengunggah Berkas...
      `;
    }

    setTimeout(() => {
      formBody?.classList.add('hidden');
      successState?.classList.remove('hidden');

      const appNumber = 'GMI-REC-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
      const appNumberDisplay = document.getElementById('display-app-number');
      if (appNumberDisplay) {
        appNumberDisplay.textContent = appNumber;
      }

      // Add to mock candidates for Admin HR workspace
      const fullName = form?.querySelector('[name="full_name"]')?.value?.trim() || 'Kandidat Baru';
      const pos = form?.querySelector('[name="position"]')?.value || 'Security Operations (Satpam / Anggota)';
      const loc = form?.querySelector('[name="preferred_location"]')?.value || 'Tangerang & Serpong';
      const edu = form?.querySelector('[name="last_education"]')?.value || 'SMA / SMK / Sederajat';
      const cert = form?.querySelector('[name="security_certificate_level"]')?.value || 'Gada Pratama';
      const phone = form?.querySelector('[name="whatsapp"]')?.value || form?.querySelector('[name="phone"]')?.value || '08123456789';
      const email = form?.querySelector('[name="email"]')?.value || 'kandidat@email.com';

      mockCandidates.unshift({
        id: Date.now(),
        name: fullName,
        appNo: appNumber,
        position: pos,
        location: loc,
        education: edu,
        cert: cert.replace('_', ' '),
        exp: 'Baru Melamar',
        submitted: 'Baru saja',
        status: 'SUBMITTED',
        phone: phone,
        email: email
      });

      if (typeof window.refreshAdminTable === 'function') {
        window.refreshAdminTable();
      }

      formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
  });

  updateStepUI();
}

// 5. Admin Dashboard Interactive Table & Candidate Actions
const mockCandidates = [
  {
    id: 1,
    name: 'Ahmad Fauzi',
    appNo: 'GMI-REC-2026-10492',
    position: 'Security Operations (Anggota)',
    location: 'Cikarang (Kawasan GIIC)',
    education: 'SMA Negeri 1 Cikarang',
    cert: 'Gada Pratama',
    exp: '3 tahun (Kawasan Industri)',
    submitted: '13 Nov 2026, 10:15',
    status: 'SUBMITTED',
    phone: '081288491029',
    email: 'ahmad.fauzi@gmail.com'
  },
  {
    id: 2,
    name: 'Bambang Kusuma',
    appNo: 'GMI-REC-2026-10488',
    position: 'Komandan Regu (Danru)',
    location: 'Tangerang (Gading Serpong)',
    education: 'D3 Manajemen',
    cert: 'Gada Madya',
    exp: '6 tahun (Residential & Mall)',
    submitted: '12 Nov 2026, 16:40',
    status: 'SHORTLISTED',
    phone: '085719283741',
    email: 'bambang.kusuma@yahoo.com'
  },
  {
    id: 3,
    name: 'Rian Pratama',
    appNo: 'GMI-REC-2026-10475',
    position: 'Operator Logistik & Gudang',
    location: 'Karawang Timur',
    education: 'SMK Otomotif',
    cert: 'SIO Forklift Aktif',
    exp: '2 tahun (Warehouse FMCG)',
    submitted: '12 Nov 2026, 11:20',
    status: 'IN_REVIEW',
    phone: '081399482710',
    email: 'rian.pratama@gmail.com'
  },
  {
    id: 4,
    name: 'Dewi Anggraini',
    appNo: 'GMI-REC-2026-10461',
    position: 'Admin Lapangan & Payroll',
    location: 'Tangerang (Kantor Pusat)',
    education: 'S1 Administrasi Bisnis',
    cert: 'Brevet Pajak A&B, Excel Pro',
    exp: '3 tahun (Payroll & BPJS)',
    submitted: '11 Nov 2026, 14:10',
    status: 'HIRED',
    phone: '081293847561',
    email: 'dewi.anggraini@outlook.com'
  },
  {
    id: 5,
    name: 'Siti Rahmawati',
    appNo: 'GMI-REC-2026-10450',
    position: 'Cleaning Service & Housekeeping',
    location: 'Jakarta Barat',
    education: 'SMA Terpadu',
    cert: 'Sertifikasi Hygiene BPS',
    exp: '1.5 tahun (Rumah Sakit)',
    submitted: '10 Nov 2026, 09:30',
    status: 'SHORTLISTED',
    phone: '087819283746',
    email: 'siti.rahma@gmail.com'
  },
  {
    id: 6,
    name: 'Hendrik Wijaya',
    appNo: 'GMI-REC-2026-10433',
    position: 'Mekanik & Teknisi ME',
    location: 'Serpong BSD',
    education: 'SMK Listrik & Pendingin',
    cert: 'Sertifikat K3 Listrik',
    exp: '4 tahun (Gedung Perkantoran)',
    submitted: '09 Nov 2026, 13:55',
    status: 'HIRED',
    phone: '081387654321',
    email: 'hendrik.wijaya@gmail.com'
  }
];

function initAdminDashboard() {
  const tbody = document.getElementById('admin-candidates-tbody');
  const searchInput = document.getElementById('admin-search-input');
  const statusFilter = document.getElementById('admin-status-filter');
  const candidateModal = document.getElementById('candidate-detail-modal');

  if (!tbody) return;

  function renderTable(data) {
    if (data.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-12 text-slate-400">
            Tidak ada pelamar yang cocok dengan kriteria pencarian.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = data.map(item => {
      let badgeClass = 'bg-slate-100 text-slate-700';
      let statusLabel = 'Baru';

      if (item.status === 'SUBMITTED') {
        badgeClass = 'bg-amber-100 text-amber-800 border-amber-200';
        statusLabel = 'Baru';
      } else if (item.status === 'IN_REVIEW') {
        badgeClass = 'bg-blue-100 text-blue-800 border-blue-200';
        statusLabel = 'Review';
      } else if (item.status === 'SHORTLISTED') {
        badgeClass = 'bg-purple-100 text-purple-800 border-purple-200';
        statusLabel = 'Shortlisted';
      } else if (item.status === 'HIRED') {
        badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
        statusLabel = 'Diterima';
      }

      return `
        <tr class="border-b border-slate-100 hover:bg-slate-50/70 transition-colors">
          <td class="py-4 px-4">
            <div class="font-bold text-slate-900">${item.name}</div>
            <div class="text-xs text-slate-400 font-mono">${item.appNo}</div>
          </td>
          <td class="py-4 px-4 text-sm text-slate-700 font-medium">
            ${item.position}
          </td>
          <td class="py-4 px-4 text-xs text-slate-600">
            ${item.location}
          </td>
          <td class="py-4 px-4 text-xs">
            <div class="font-semibold text-slate-800">${item.cert}</div>
            <div class="text-slate-400">${item.exp}</div>
          </td>
          <td class="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">
            ${item.submitted}
          </td>
          <td class="py-4 px-4">
            <span class="inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${badgeClass}">
              ${statusLabel}
            </span>
          </td>
          <td class="py-4 px-4 text-right">
            <button type="button" onclick="viewCandidate(${item.id})" class="px-3 py-1.5 rounded-lg text-xs font-bold text-[#061e43] bg-slate-100 hover:bg-slate-200 transition-colors">
              Detail &amp; Aksi &rarr;
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function filterData() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const st = statusFilter?.value || '';

    const filtered = mockCandidates.filter(c => {
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.appNo.toLowerCase().includes(q) || c.position.toLowerCase().includes(q);
      const matchStatus = !st || c.status === st;
      return matchQ && matchStatus;
    });

    renderTable(filtered);
  }

  searchInput?.addEventListener('input', filterData);
  statusFilter?.addEventListener('change', filterData);
  window.refreshAdminTable = () => filterData();

  window.viewCandidate = function(id) {
    const item = mockCandidates.find(c => c.id === id);
    if (!item || !candidateModal) return;

    document.getElementById('cand-name').textContent = item.name;
    document.getElementById('cand-app-no').textContent = item.appNo;
    document.getElementById('cand-position').textContent = item.position;
    document.getElementById('cand-location').textContent = item.location;
    document.getElementById('cand-education').textContent = item.education;
    document.getElementById('cand-cert').textContent = item.cert;
    document.getElementById('cand-exp').textContent = item.exp;
    document.getElementById('cand-phone').textContent = item.phone;
    document.getElementById('cand-email').textContent = item.email;
    document.getElementById('cand-wa-link').href = `https://wa.me/62${item.phone.replace(/^0/, '')}`;

    candidateModal.showModal();
  };

  candidateModal?.querySelectorAll('[data-close-modal]').forEach(b => {
    b.addEventListener('click', () => candidateModal.close());
  });

  renderTable(mockCandidates);
}
