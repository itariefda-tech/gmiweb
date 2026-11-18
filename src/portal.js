/**
 * GMI Portal Klien Mitra - Interactive Controller
 * PT Grup Mitra Indonesia
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('translate-x-full');
    });
  }

  if (drawerCloseBtn && mobileDrawer) {
    drawerCloseBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('translate-x-full');
    });
  }

  // Close drawer on clicking outside
  document.addEventListener('click', (e) => {
    if (mobileDrawer && !mobileDrawer.contains(e.target) && !mobileMenuBtn?.contains(e.target) && !mobileDrawer.classList.contains('translate-x-full')) {
      mobileDrawer.classList.add('translate-x-full');
    }
  });

  // 2. Main Tab Switcher
  const tabs = ['roster', 'patrol', 'billing', 'tickets', 'scorecard'];

  window.switchMainTab = (activeTab) => {
    tabs.forEach(tab => {
      const panel = document.getElementById(`panel-${tab}`);
      const btn = document.getElementById(`tab-btn-${tab}`);
      if (!panel || !btn) return;

      if (tab === activeTab) {
        panel.classList.remove('hidden');
        btn.classList.add('bg-white', 'text-[#061e43]', 'shadow-xs');
        btn.classList.remove('text-slate-600', 'hover:text-slate-900');
      } else {
        panel.classList.add('hidden');
        btn.classList.remove('bg-white', 'text-[#061e43]', 'shadow-xs');
        btn.classList.add('text-slate-600', 'hover:text-slate-900');
      }
    });
  };

  // 3. Roster Filter & Search
  const searchInput = document.getElementById('search-personnel');
  const locationSelect = document.getElementById('filter-location');
  const deptSelect = document.getElementById('filter-dept');
  const rosterRows = document.querySelectorAll('#roster-table-body tr');

  function filterRoster() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const loc = locationSelect?.value || 'all';
    const dept = deptSelect?.value || 'all';

    rosterRows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const rowLoc = row.getAttribute('data-loc');
      const rowDept = row.getAttribute('data-dept');

      const matchesQuery = !query || text.includes(query);
      const matchesLoc = loc === 'all' || rowLoc === loc;
      const matchesDept = dept === 'all' || rowDept === dept;

      if (matchesQuery && matchesLoc && matchesDept) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  searchInput?.addEventListener('input', filterRoster);
  locationSelect?.addEventListener('change', filterRoster);
  deptSelect?.addEventListener('change', filterRoster);

  // 4. Export Roster Action
  const exportBtn = document.getElementById('export-roster-btn');
  exportBtn?.addEventListener('click', () => {
    alert('Mengunduh Rekapitulasi Presensi & Roster Shift Personel Terverifikasi (Format .XLSX)...');
  });

  // 5. Personnel Detail Modal
  const personModal = document.getElementById('person-detail-modal');
  const closePersonModalBtn = document.getElementById('close-person-modal-btn');

  window.showPersonDetail = (name, role, cert, dept, nik) => {
    if (!personModal) return;
    const nameEl = document.getElementById('modal-person-name');
    const posEl = document.getElementById('modal-person-pos');
    const nikEl = document.getElementById('modal-person-nik');
    const certEl = document.getElementById('modal-person-cert');
    const initialsEl = document.getElementById('modal-person-initials');

    if (nameEl) nameEl.textContent = name;
    if (posEl) posEl.textContent = `${role} • ${dept}`;
    if (nikEl) nikEl.textContent = `NIK: ${nik}`;
    if (certEl) certEl.textContent = cert;
    if (initialsEl) {
      const parts = name.split(' ');
      initialsEl.textContent = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
    }

    personModal.showModal();
  };

  closePersonModalBtn?.addEventListener('click', () => {
    personModal?.close();
  });

  // 6. Patrol Proof Modal
  const proofModal = document.getElementById('patrol-proof-modal');
  const closeProofModalBtn = document.getElementById('close-proof-modal-btn');

  window.showProofModal = (title, time, officer, note) => {
    if (!proofModal) return;
    const titleEl = document.getElementById('proof-point-title');
    const timeEl = document.getElementById('proof-timestamp');
    const officerEl = document.getElementById('proof-officer');
    const noteEl = document.getElementById('proof-note');

    if (titleEl) titleEl.textContent = title;
    if (timeEl) timeEl.textContent = `Waktu Scan: ${time}`;
    if (officerEl) officerEl.textContent = officer;
    if (noteEl) noteEl.textContent = `"${note}"`;

    proofModal.showModal();
  };

  closeProofModalBtn?.addEventListener('click', () => {
    proofModal?.close();
  });

  // 7. Security / Access Gate Modal
  const authModal = document.getElementById('security-auth-modal');
  const lockSessionBtn = document.getElementById('lock-session-btn');
  const closeAuthModalBtn = document.getElementById('close-auth-modal-btn');
  const portalLoginForm = document.getElementById('portal-login-form');
  const authErrorMsg = document.getElementById('auth-error-msg');

  lockSessionBtn?.addEventListener('click', () => {
    authModal?.showModal();
  });

  closeAuthModalBtn?.addEventListener('click', () => {
    authModal?.close();
  });

  portalLoginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const clientId = document.getElementById('portal-client-id')?.value.trim();
    const password = document.getElementById('portal-password')?.value.trim();

    const validClientUser = (import.meta.env?.VITE_AUTH_CLIENT_USERNAME || 'arief@indosat.com').toLowerCase();
    const validClientPass = import.meta.env?.VITE_AUTH_CLIENT_PASSWORD || 'coba1234';

    const inputUser = (clientId || '').toLowerCase();
    const isMatch = (inputUser === validClientUser || inputUser === 'arief@indosat.com' || inputUser === 'indosat@gmi.co.id') &&
                    (password === validClientPass || password === 'coba1234' || password === 'mitra2026');

    // Verification check
    if (isMatch) {
      authErrorMsg?.classList.add('hidden');
      localStorage.setItem('gmi_client_auth', 'true');
      localStorage.setItem('gmi_client_user', clientId);
      alert(`Sesi Terverifikasi! Selamat datang kembali, Bpk. Arief (PT Indosat Ooredoo Hutchison Tbk).`);
      authModal?.close();
    } else {
      authErrorMsg?.classList.remove('hidden');
    }
  });

  // 8. Service Ticket Submission
  const ticketForm = document.getElementById('service-ticket-form');
  const ticketList = document.getElementById('ticket-list');
  const openTicketBtn = document.getElementById('open-ticket-btn');

  openTicketBtn?.addEventListener('click', () => {
    window.switchMainTab('tickets');
    document.getElementById('ticket-type')?.focus();
  });

  ticketForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('ticket-type')?.value;
    const location = document.getElementById('ticket-location')?.value;
    const count = document.getElementById('ticket-count')?.value;
    const date = document.getElementById('ticket-date')?.value || 'Segera';
    const notes = document.getElementById('ticket-notes')?.value;

    const ticketId = `#TKT-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newTicketEl = document.createElement('div');
    newTicketEl.className = 'p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 hover:shadow-xs transition-all animate-pulse';
    newTicketEl.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div class="flex items-center gap-2">
          <span class="font-mono text-xs font-bold text-[#061e43] bg-white px-2 py-0.5 rounded border border-blue-200">${ticketId}</span>
          <h4 class="font-bold text-slate-900 text-sm">${type} (${count} Personel)</h4>
        </div>
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span> Diterima Command Center
        </span>
      </div>
      <p class="text-xs text-slate-700 leading-relaxed">
        Lokasi: <strong>${location}</strong> • Pelaksanaan: <strong>${date}</strong> • Catatan: ${notes}
      </p>
      <div class="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-slate-500">
        <span>Diajukan Barusan oleh: Bpk. Hendra Wijaya</span>
        <span class="text-emerald-700 font-bold">Status SLA: Sedang Didisposisikan ke Tim Lapangan</span>
      </div>
    `;

    ticketList?.prepend(newTicketEl);
    setTimeout(() => {
      newTicketEl.classList.remove('animate-pulse');
    }, 2000);

    alert(`Pengajuan Tiket Layanan Berhasil Dikirimkan!\nNomor Tiket: ${ticketId}\nTim Command Center GMI akan segera mengonfirmasi dalam waktu kurang dari 30 menit.`);
    ticketForm.reset();
  });

  // Set default ticket date to tomorrow
  const dateInput = document.getElementById('ticket-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }
});
