// Format angka dengan 2 desimal (atau bulat jika tanpa desimal) dalam format Indonesia
function fmt(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num) || !isFinite(num)) return '-';
  const rounded = Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
  return rounded.toLocaleString('id-ID', {
    minimumFractionDigits: Number.isInteger(rounded) ? 0 : decimals,
    maximumFractionDigits: decimals
  });
}

function fmtExact(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num) || !isFinite(num)) return '-';
  return num.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function val(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const v = parseFloat(el.value);
  return isNaN(v) ? 0 : v;
}

// Navigasi Bottom Bar Android
let currentActiveTab = 'tab-all';

const TAB_SUBTITLES = {
  'tab-all': 'Hitung BOR, LOS, TOI, BTO, NDR, GDR',
  'tab-component': 'Cari Komponen Dasar (Bolak-Balik)',
  'tab-cross': 'Rumus Pintas Antar-Indikator',
  'tab-reference': 'Ringkasan Rumus & Standar Ideal'
};

function switchTab(tabId) {
  const isChanged = currentActiveTab !== tabId;
  currentActiveTab = tabId;
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.bnav-item').forEach(b => b.classList.remove('active'));

  const targetPanel = document.getElementById(tabId);
  if (targetPanel) targetPanel.classList.add('active');

  const targetBtn = document.querySelector(`.bnav-item[data-tab="${tabId}"]`);
  if (targetBtn) targetBtn.classList.add('active');

  const sub = document.getElementById('headerSubtitle');
  if (sub && TAB_SUBTITLES[tabId]) sub.textContent = TAB_SUBTITLES[tabId];

  const actions = document.getElementById('topBarActions');
  if (actions) {
    actions.style.display = (tabId === 'tab-all') ? 'flex' : 'none';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Beri tahu Android (MainActivity) saat pengguna berpindah menu untuk pemicu Iklan Interstisial
  if (isChanged && window.AndroidAdBridge && typeof window.AndroidAdBridge.onTabChanged === 'function') {
    try {
      window.AndroidAdBridge.onTabChanged();
    } catch (e) {
      // Abaikan jika dibuka di browser biasa
    }
  }
}

// Dipanggil dari MainActivity.kt saat tombol Back HP Android ditekan
function handleAndroidBack() {
  if (currentActiveTab !== 'tab-all') {
    switchTab('tab-all');
    return true;
  }
  return false;
}

// Preset Periode Hari (t)
function setPeriod(inputId, days, callback) {
  const el = document.getElementById(inputId);
  if (el) {
    el.value = days;
    document.querySelectorAll('.q-chip').forEach((chip) => {
      const handler = chip.getAttribute('onclick') || '';
      if (handler.includes(`'${inputId}'`)) {
        const match = handler.match(/setPeriod\([^,]+,\s*(\d+)/);
        chip.classList.toggle('active-chip', !!match && Number(match[1]) === Number(days));
      }
    });
    if (typeof callback === 'function') callback();
  }
}

// =========================================================
// TAB 1: HITUNG 6 INDIKATOR DARI DATA DASAR
// =========================================================

function onHPChange() {
  const sync = document.getElementById('syncHPLD').checked;
  if (sync) {
    document.getElementById('inLD').value = document.getElementById('inHP').value;
  }
  calculateAll();
}

function onLDChange() {
  const hp = document.getElementById('inHP').value;
  const ld = document.getElementById('inLD').value;
  if (hp !== ld) {
    document.getElementById('syncHPLD').checked = false;
  }
  calculateAll();
}

function onSyncToggle() {
  if (document.getElementById('syncHPLD').checked) {
    document.getElementById('inLD').value = document.getElementById('inHP').value;
    calculateAll();
  }
}

function setPatientMode(mode) {
  document.getElementById('modePasien').value = mode;
  document.getElementById('segTotal').classList.toggle('active', mode === 'total');
  document.getElementById('segRinci').classList.toggle('active', mode === 'rinci');

  if (mode === 'rinci') {
    document.getElementById('boxTotalD').style.display = 'none';
    document.getElementById('boxHidup').style.display = 'block';
  } else {
    document.getElementById('boxTotalD').style.display = 'block';
    document.getElementById('boxHidup').style.display = 'none';
  }
  calculateAll();
}

function setBadge(id, text, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = 'm-badge ' + type;
}

function calculateAll() {
  const A = val('inA');
  const t = val('inT');
  const HP = val('inHP');
  const LD = val('inLD');
  const mode = document.getElementById('modePasien').value;
  const mKurang = val('inMatiKurang');
  const mLebih = val('inMatiLebih');
  const mTotal = mKurang + mLebih;

  let D = 0;
  let hidup = 0;
  if (mode === 'rinci') {
    hidup = val('inHidup');
    D = hidup + mTotal;
    document.getElementById('inD').value = D;
  } else {
    D = val('inD');
    hidup = Math.max(0, D - mTotal);
  }

  const At = A * t;
  const BOR = At > 0 ? (HP / At) * 100 : 0;
  const LOS = D > 0 ? LD / D : 0;
  const TOI = D > 0 ? (At - HP) / D : 0;
  const BTO = A > 0 ? D / A : 0;
  const NDR = D > 0 ? (mLebih / D) * 1000 : 0;
  const GDR = D > 0 ? (mTotal / D) * 1000 : 0;

  // Tampilkan nilai KPI
  document.getElementById('valBOR').textContent = fmtExact(BOR) + '%';
  document.getElementById('valLOS').textContent = fmtExact(LOS) + ' hr';
  document.getElementById('valTOI').textContent = fmtExact(TOI) + ' hr';
  document.getElementById('valBTO').textContent = fmtExact(BTO) + ' kl';
  document.getElementById('valNDR').textContent = fmtExact(NDR) + ' ‰';
  document.getElementById('valGDR').textContent = fmtExact(GDR) + ' ‰';

  // Evaluasi Standar Ideal Depkes RI
  if (BOR >= 60 && BOR <= 85) {
    setBadge('badgeBOR', 'Ideal', 'badge-ideal');
  } else if (BOR < 60) {
    setBadge('badgeBOR', 'Rendah', 'badge-low');
  } else {
    setBadge('badgeBOR', 'Tinggi', 'badge-warn');
  }

  if (LOS >= 6 && LOS <= 9) {
    setBadge('badgeLOS', 'Ideal Depkes', 'badge-ideal');
  } else if (LOS >= 3 && LOS <= 12) {
    setBadge('badgeLOS', 'Ideal BJ', 'badge-warn');
  } else {
    setBadge('badgeLOS', 'Tidak Ideal', 'badge-danger');
  }

  if (TOI >= 1 && TOI <= 3) {
    setBadge('badgeTOI', 'Ideal', 'badge-ideal');
  } else if (TOI < 1) {
    setBadge('badgeTOI', 'Cepat (<1)', 'badge-warn');
  } else {
    setBadge('badgeTOI', 'Lama (>3)', 'badge-danger');
  }

  const btoYearly = t > 0 ? BTO * (365 / t) : BTO;
  if (btoYearly >= 40 && btoYearly <= 50) {
    setBadge('badgeBTO', 'Ideal', 'badge-ideal');
  } else if (btoYearly >= 30) {
    setBadge('badgeBTO', 'Ideal BJ', 'badge-warn');
  } else {
    setBadge('badgeBTO', 'Rendah', 'badge-low');
  }

  if (NDR < 25) {
    setBadge('badgeNDR', 'Ideal', 'badge-ideal');
  } else {
    setBadge('badgeNDR', 'Tinggi', 'badge-danger');
  }

  if (GDR < 45) {
    setBadge('badgeGDR', 'Ideal', 'badge-ideal');
  } else {
    setBadge('badgeGDR', 'Tinggi', 'badge-danger');
  }

  // Render Langkah-Langkah Perhitungan (Mobile Accordion)
  const stepsHTML = `
    <details class="step-item" open>
      <summary class="step-summary">
        <span>1. BOR (Bed Occupancy Rate)</span>
        <span class="step-val-pill">${fmtExact(BOR)}%</span>
      </summary>
      <div class="step-body">Rumus : [ HP / (A × t) ] × 100%
Hitung: [ ${fmt(HP)} / (${fmt(A)} × ${fmt(t)}) ] × 100%
      = ( ${fmt(HP)} / ${fmt(At)} ) × 100%
      = ${fmtExact(BOR)}%</div>
    </details>

    <details class="step-item" open>
      <summary class="step-summary">
        <span>2. AvLOS (Average Length of Stay)</span>
        <span class="step-val-pill">${fmtExact(LOS)} hr</span>
      </summary>
      <div class="step-body">Rumus : LD / D
Hitung: ${fmt(LD)} / ${fmt(D)} = ${fmtExact(LOS)} hari</div>
    </details>

    <details class="step-item" open>
      <summary class="step-summary">
        <span>3. TOI (Turn Over Interval)</span>
        <span class="step-val-pill">${fmtExact(TOI)} hr</span>
      </summary>
      <div class="step-body">Rumus : [ (A × t) − HP ] / D
Hitung: [ (${fmt(A)} × ${fmt(t)}) − ${fmt(HP)} ] / ${fmt(D)}
      = ( ${fmt(At)} − ${fmt(HP)} ) / ${fmt(D)}
      = ${fmt(At - HP)} / ${fmt(D)} = ${fmtExact(TOI)} hari</div>
    </details>

    <details class="step-item">
      <summary class="step-summary">
        <span>4. BTO (Bed Turn Over)</span>
        <span class="step-val-pill">${fmtExact(BTO)} kali</span>
      </summary>
      <div class="step-body">Rumus : D / A
Hitung: ${fmt(D)} / ${fmt(A)} = ${fmtExact(BTO)} kali</div>
    </details>

    <details class="step-item">
      <summary class="step-summary">
        <span>5. NDR (Net Death Rate)</span>
        <span class="step-val-pill">${fmtExact(NDR)} ‰</span>
      </summary>
      <div class="step-body">Rumus : (Mati ≥ 48 jam / D) × 1.000‰
Hitung: (${fmt(mLebih)} / ${fmt(D)}) × 1.000‰ = ${fmtExact(NDR)} ‰</div>
    </details>

    <details class="step-item">
      <summary class="step-summary">
        <span>6. GDR (Gross Death Rate)</span>
        <span class="step-val-pill">${fmtExact(GDR)} ‰</span>
      </summary>
      <div class="step-body">Rumus : (Total Mati / D) × 1.000‰
Total Mati = ${fmt(mKurang)} + ${fmt(mLebih)} = ${fmt(mTotal)} pasien
Hitung: (${fmt(mTotal)} / ${fmt(D)}) × 1.000‰ = ${fmtExact(GDR)} ‰</div>
    </details>
  `;

  document.getElementById('stepsAll').innerHTML = stepsHTML;
  drawBarberJohnson(TOI, LOS, BOR);
}

function drawBarberJohnson(toi, los, bor) {
  const canvas = document.getElementById('bjCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const padL = 44;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const maxX = Math.max(6, Math.ceil(toi + 1.5));
  const maxY = Math.max(15, Math.ceil(los + 3));

  const toX = x => padL + (x / maxX) * plotW;
  const toY = y => padT + plotH - (y / maxY) * plotH;

  // Grid
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#64748b';
  ctx.font = '11px sans-serif';

  for (let x = 0; x <= maxX; x += 1) {
    const px = toX(x);
    ctx.beginPath();
    ctx.moveTo(px, padT);
    ctx.lineTo(px, padT + plotH);
    ctx.stroke();
    ctx.fillText(x.toString(), px - 3, padT + plotH + 15);
  }

  const yStep = maxY > 20 ? 5 : 3;
  for (let y = 0; y <= maxY; y += yStep) {
    const py = toY(y);
    ctx.beginPath();
    ctx.moveTo(padL, py);
    ctx.lineTo(padL + plotW, py);
    ctx.stroke();
    ctx.fillText(y.toString(), padL - 22, py + 4);
  }

  // Daerah Efisiensi Barber-Johnson
  ctx.fillStyle = 'rgba(22, 163, 74, 0.2)';
  ctx.strokeStyle = '#16a34a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(toX(1), toY(3));
  ctx.lineTo(toX(1), toY(12));
  ctx.lineTo(toX(3), toY(12));
  ctx.lineTo(toX(3), toY(9));
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Garis diagonal BOR 75%
  ctx.strokeStyle = '#0f766e';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(0));
  const endToi75 = Math.min(maxX, maxY / 3);
  ctx.lineTo(toX(endToi75), toY(endToi75 * 3));
  ctx.stroke();
  ctx.setLineDash([]);

  // Sumbu
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padL, padT);
  ctx.lineTo(padL, padT + plotH);
  ctx.lineTo(padL + plotW, padT + plotH);
  ctx.stroke();

  // Label Sumbu
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('TOI (Hari Kosong)', padL + plotW / 2 - 48, H - 8);

  ctx.save();
  ctx.translate(14, padT + plotH / 2 + 35);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('AvLOS (Hari)', 0, 0);
  ctx.restore();

  // Plot Titik RS
  if (toi >= 0 && los >= 0 && isFinite(toi) && isFinite(los)) {
    const ptX = toX(Math.min(maxX, toi));
    const ptY = toY(Math.min(maxY, los));

    ctx.strokeStyle = '#dc2626';
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(ptX, padT + plotH);
    ctx.lineTo(ptX, ptY);
    ctx.lineTo(padL, ptY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(ptX, ptY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#991b1b';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`(${fmtExact(toi)}, ${fmtExact(los)})`, Math.min(W - 85, ptX + 8), Math.max(18, ptY - 7));
  }

  const isEfficient = toi >= 1 && toi <= 3 && los >= 3 && los <= 12 && bor >= 75;
  const bjBadge = document.getElementById('bjStatusBadge');
  if (bjBadge) {
    if (isEfficient) {
      bjBadge.textContent = 'Efisien (BJ)';
      bjBadge.className = 'm-badge badge-ideal';
    } else {
      bjBadge.textContent = 'Di Luar Daerah BJ';
      bjBadge.className = 'm-badge badge-warn';
    }
  }
}

function loadSampleBasic() {
  document.getElementById('inA').value = 120;
  document.getElementById('inT').value = 365;
  document.getElementById('inHP').value = 35040;
  document.getElementById('inLD').value = 35040;
  document.getElementById('syncHPLD').checked = true;
  setPatientMode('total');
  document.getElementById('inD').value = 5840;
  document.getElementById('inMatiKurang').value = 45;
  document.getElementById('inMatiLebih').value = 85;
  calculateAll();
}

function resetBasic() {
  document.getElementById('inA').value = 100;
  document.getElementById('inT').value = 365;
  document.getElementById('inHP').value = 27375;
  document.getElementById('inLD').value = 27375;
  document.getElementById('syncHPLD').checked = true;
  setPatientMode('total');
  document.getElementById('inD').value = 5475;
  document.getElementById('inMatiKurang').value = 60;
  document.getElementById('inMatiLebih').value = 90;
  calculateAll();
}

// =========================================================
// TAB 2: CARI KOMPONEN DASAR (BOLAK-BALIK RUMUS)
// =========================================================

const COMP_CATEGORIES = {
  bor: [
    { val: 'bor_hp', text: 'Cari Hari Perawatan (HP)' },
    { val: 'bor_a', text: 'Cari Tempat Tidur (A)' },
    { val: 'bor_t', text: 'Cari Periode Hari (t)' }
  ],
  los: [
    { val: 'los_ld', text: 'Cari Lama Dirawat (LD)' },
    { val: 'los_d', text: 'Cari Pasien Keluar (D)' }
  ],
  toi: [
    { val: 'toi_a', text: 'Cari Tempat Tidur (A)' },
    { val: 'toi_hp', text: 'Cari Hari Perawatan (HP)' },
    { val: 'toi_d', text: 'Cari Pasien Keluar (D)' },
    { val: 'toi_t', text: 'Cari Periode Hari (t)' }
  ],
  bto: [
    { val: 'bto_d', text: 'Cari Pasien Keluar (D)' },
    { val: 'bto_a', text: 'Cari Tempat Tidur (A)' }
  ],
  death: [
    { val: 'ndr_m48', text: 'Cari Mati ≥ 48 Jam (dari NDR)' },
    { val: 'ndr_d', text: 'Cari Pasien Keluar D (dari NDR)' },
    { val: 'gdr_mtot', text: 'Cari Total Mati (dari GDR)' },
    { val: 'gdr_d', text: 'Cari Pasien Keluar D (dari GDR)' },
    { val: 'm_kurang48', text: 'Cari Mati < 48 Jam (GDR & NDR)' }
  ]
};

const COMPONENT_CONFIGS = {
  bor_hp: {
    title: 'Hasil Jumlah Hari Perawatan (HP)',
    fields: [
      { id: 'c_bor', label: 'Nilai BOR (%)', suffix: '%', val: 75 },
      { id: 'c_a', label: 'Tempat Tidur (A)', suffix: 'TT', val: 100 },
      { id: 'c_t', label: 'Periode Hari (t)', suffix: 'hr', val: 365 }
    ],
    calc: (v) => {
      const res = (v.c_bor * v.c_a * v.c_t) / 100;
      return {
        unit: 'hari perawatan',
        value: res,
        formula: 'HP = (BOR × A × t) / 100',
        steps: `HP = (${fmt(v.c_bor)} × ${fmt(v.c_a)} × ${fmt(v.c_t)}) / 100\nHP = ${fmt(v.c_bor * v.c_a * v.c_t)} / 100\nHP = ${fmt(res)} hari perawatan`
      };
    }
  },
  bor_a: {
    title: 'Hasil Jumlah Tempat Tidur (A)',
    fields: [
      { id: 'c_bor', label: 'Nilai BOR (%)', suffix: '%', val: 75 },
      { id: 'c_hp', label: 'Hari Perawatan (HP)', suffix: 'hr', val: 27375 },
      { id: 'c_t', label: 'Periode Hari (t)', suffix: 'hr', val: 365 }
    ],
    calc: (v) => {
      const denom = v.c_bor * v.c_t;
      const res = denom > 0 ? (v.c_hp * 100) / denom : 0;
      return {
        unit: 'TT',
        value: res,
        formula: 'A = (HP × 100) / (BOR × t)',
        steps: `A = (${fmt(v.c_hp)} × 100) / (${fmt(v.c_bor)} × ${fmt(v.c_t)})\nA = ${fmt(v.c_hp * 100)} / ${fmt(denom)}\nA = ${fmt(res)} tempat tidur`
      };
    }
  },
  bor_t: {
    title: 'Hasil Periode Hari (t)',
    fields: [
      { id: 'c_bor', label: 'Nilai BOR (%)', suffix: '%', val: 75 },
      { id: 'c_hp', label: 'Hari Perawatan (HP)', suffix: 'hr', val: 2250 },
      { id: 'c_a', label: 'Tempat Tidur (A)', suffix: 'TT', val: 100 }
    ],
    calc: (v) => {
      const denom = v.c_bor * v.c_a;
      const res = denom > 0 ? (v.c_hp * 100) / denom : 0;
      return {
        unit: 'hari',
        value: res,
        formula: 't = (HP × 100) / (BOR × A)',
        steps: `t = (${fmt(v.c_hp)} × 100) / (${fmt(v.c_bor)} × ${fmt(v.c_a)})\nt = ${fmt(v.c_hp * 100)} / ${fmt(denom)}\nt = ${fmt(res)} hari`
      };
    }
  },
  los_ld: {
    title: 'Hasil Jumlah Lama Dirawat (LD)',
    fields: [
      { id: 'c_los', label: 'Nilai AvLOS', suffix: 'hr', val: 5 },
      { id: 'c_d', label: 'Pasien Keluar (D)', suffix: 'psn', val: 5475 }
    ],
    calc: (v) => {
      const res = v.c_los * v.c_d;
      return {
        unit: 'hari',
        value: res,
        formula: 'LD = AvLOS × D',
        steps: `LD = ${fmt(v.c_los)} × ${fmt(v.c_d)}\nLD = ${fmt(res)} hari`
      };
    }
  },
  los_d: {
    title: 'Hasil Jumlah Pasien Keluar (D)',
    fields: [
      { id: 'c_los', label: 'Nilai AvLOS', suffix: 'hr', val: 5 },
      { id: 'c_ld', label: 'Lama Dirawat (LD)', suffix: 'hr', val: 27375 }
    ],
    calc: (v) => {
      const res = v.c_los > 0 ? v.c_ld / v.c_los : 0;
      return {
        unit: 'pasien',
        value: res,
        formula: 'D = LD / AvLOS',
        steps: `D = ${fmt(v.c_ld)} / ${fmt(v.c_los)}\nD = ${fmt(res)} pasien`
      };
    }
  },
  toi_a: {
    title: 'Hasil Jumlah Tempat Tidur (A)',
    fields: [
      { id: 'c_toi', label: 'Nilai TOI', suffix: 'hr', val: 2 },
      { id: 'c_d', label: 'Pasien Keluar (D)', suffix: 'psn', val: 4000 },
      { id: 'c_hp', label: 'Hari Perawatan (HP)', suffix: 'hr', val: 28500 },
      { id: 'c_t', label: 'Periode Hari (t)', suffix: 'hr', val: 365 }
    ],
    calc: (v) => {
      const num = (v.c_toi * v.c_d) + v.c_hp;
      const res = v.c_t > 0 ? num / v.c_t : 0;
      return {
        unit: 'TT',
        value: res,
        formula: 'A = [ (TOI × D) + HP ] / t',
        steps: `A = [ (${fmt(v.c_toi)} × ${fmt(v.c_d)}) + ${fmt(v.c_hp)} ] / ${fmt(v.c_t)}\nA = ${fmt(num)} / ${fmt(v.c_t)}\nA = ${fmt(res)} tempat tidur`
      };
    }
  },
  toi_hp: {
    title: 'Hasil Jumlah Hari Perawatan (HP)',
    fields: [
      { id: 'c_toi', label: 'Nilai TOI', suffix: 'hr', val: 2 },
      { id: 'c_a', label: 'Tempat Tidur (A)', suffix: 'TT', val: 100 },
      { id: 'c_t', label: 'Periode Hari (t)', suffix: 'hr', val: 365 },
      { id: 'c_d', label: 'Pasien Keluar (D)', suffix: 'psn', val: 4000 }
    ],
    calc: (v) => {
      const At = v.c_a * v.c_t;
      const td = v.c_toi * v.c_d;
      const res = At - td;
      return {
        unit: 'hari perawatan',
        value: res,
        formula: 'HP = (A × t) − (TOI × D)',
        steps: `HP = (${fmt(v.c_a)} × ${fmt(v.c_t)}) − (${fmt(v.c_toi)} × ${fmt(v.c_d)})\nHP = ${fmt(At)} − ${fmt(td)}\nHP = ${fmt(res)} hari perawatan`
      };
    }
  },
  toi_d: {
    title: 'Hasil Jumlah Pasien Keluar (D)',
    fields: [
      { id: 'c_toi', label: 'Nilai TOI', suffix: 'hr', val: 2 },
      { id: 'c_a', label: 'Tempat Tidur (A)', suffix: 'TT', val: 100 },
      { id: 'c_t', label: 'Periode Hari (t)', suffix: 'hr', val: 365 },
      { id: 'c_hp', label: 'Hari Perawatan (HP)', suffix: 'hr', val: 28500 }
    ],
    calc: (v) => {
      const num = (v.c_a * v.c_t) - v.c_hp;
      const res = v.c_toi > 0 ? num / v.c_toi : 0;
      return {
        unit: 'pasien',
        value: res,
        formula: 'D = [ (A × t) − HP ] / TOI',
        steps: `D = [ (${fmt(v.c_a)} × ${fmt(v.c_t)}) − ${fmt(v.c_hp)} ] / ${fmt(v.c_toi)}\nD = ${fmt(num)} / ${fmt(v.c_toi)}\nD = ${fmt(res)} pasien`
      };
    }
  },
  toi_t: {
    title: 'Hasil Periode Hari (t)',
    fields: [
      { id: 'c_toi', label: 'Nilai TOI', suffix: 'hr', val: 2 },
      { id: 'c_a', label: 'Tempat Tidur (A)', suffix: 'TT', val: 100 },
      { id: 'c_hp', label: 'Hari Perawatan (HP)', suffix: 'hr', val: 28500 },
      { id: 'c_d', label: 'Pasien Keluar (D)', suffix: 'psn', val: 4000 }
    ],
    calc: (v) => {
      const num = (v.c_toi * v.c_d) + v.c_hp;
      const res = v.c_a > 0 ? num / v.c_a : 0;
      return {
        unit: 'hari',
        value: res,
        formula: 't = [ (TOI × D) + HP ] / A',
        steps: `t = [ (${fmt(v.c_toi)} × ${fmt(v.c_d)}) + ${fmt(v.c_hp)} ] / ${fmt(v.c_a)}\nt = ${fmt(num)} / ${fmt(v.c_a)}\nt = ${fmt(res)} hari`
      };
    }
  },
  bto_d: {
    title: 'Hasil Jumlah Pasien Keluar (D)',
    fields: [
      { id: 'c_bto', label: 'Nilai BTO', suffix: 'kali', val: 45 },
      { id: 'c_a', label: 'Tempat Tidur (A)', suffix: 'TT', val: 100 }
    ],
    calc: (v) => {
      const res = v.c_bto * v.c_a;
      return {
        unit: 'pasien',
        value: res,
        formula: 'D = BTO × A',
        steps: `D = ${fmt(v.c_bto)} × ${fmt(v.c_a)}\nD = ${fmt(res)} pasien`
      };
    }
  },
  bto_a: {
    title: 'Hasil Jumlah Tempat Tidur (A)',
    fields: [
      { id: 'c_bto', label: 'Nilai BTO', suffix: 'kali', val: 45 },
      { id: 'c_d', label: 'Pasien Keluar (D)', suffix: 'psn', val: 4500 }
    ],
    calc: (v) => {
      const res = v.c_bto > 0 ? v.c_d / v.c_bto : 0;
      return {
        unit: 'TT',
        value: res,
        formula: 'A = D / BTO',
        steps: `A = ${fmt(v.c_d)} / ${fmt(v.c_bto)}\nA = ${fmt(res)} tempat tidur`
      };
    }
  },
  ndr_m48: {
    title: 'Hasil Pasien Mati ≥ 48 Jam',
    fields: [
      { id: 'c_ndr', label: 'Nilai NDR (‰)', suffix: '‰', val: 15 },
      { id: 'c_d', label: 'Pasien Keluar (D)', suffix: 'psn', val: 4000 }
    ],
    calc: (v) => {
      const res = (v.c_ndr * v.c_d) / 1000;
      return {
        unit: 'pasien',
        value: res,
        formula: 'Mati ≥ 48j = (NDR × D) / 1.000',
        steps: `Mati ≥ 48j = (${fmt(v.c_ndr)} × ${fmt(v.c_d)}) / 1.000\nMati ≥ 48j = ${fmt(res)} pasien`
      };
    }
  },
  ndr_d: {
    title: 'Hasil Jumlah Pasien Keluar (D)',
    fields: [
      { id: 'c_ndr', label: 'Nilai NDR (‰)', suffix: '‰', val: 15 },
      { id: 'c_m48', label: 'Mati ≥ 48 Jam', suffix: 'psn', val: 60 }
    ],
    calc: (v) => {
      const res = v.c_ndr > 0 ? (v.c_m48 * 1000) / v.c_ndr : 0;
      return {
        unit: 'pasien',
        value: res,
        formula: 'D = (Mati ≥ 48j × 1.000) / NDR',
        steps: `D = (${fmt(v.c_m48)} × 1.000) / ${fmt(v.c_ndr)}\nD = ${fmt(res)} pasien`
      };
    }
  },
  gdr_mtot: {
    title: 'Hasil Total Seluruh Pasien Mati',
    fields: [
      { id: 'c_gdr', label: 'Nilai GDR (‰)', suffix: '‰', val: 25 },
      { id: 'c_d', label: 'Pasien Keluar (D)', suffix: 'psn', val: 4000 }
    ],
    calc: (v) => {
      const res = (v.c_gdr * v.c_d) / 1000;
      return {
        unit: 'pasien',
        value: res,
        formula: 'Total Mati = (GDR × D) / 1.000',
        steps: `Total Mati = (${fmt(v.c_gdr)} × ${fmt(v.c_d)}) / 1.000\nTotal Mati = ${fmt(res)} pasien`
      };
    }
  },
  gdr_d: {
    title: 'Hasil Jumlah Pasien Keluar (D)',
    fields: [
      { id: 'c_gdr', label: 'Nilai GDR (‰)', suffix: '‰', val: 25 },
      { id: 'c_mtot', label: 'Total Pasien Mati', suffix: 'psn', val: 100 }
    ],
    calc: (v) => {
      const res = v.c_gdr > 0 ? (v.c_mtot * 1000) / v.c_gdr : 0;
      return {
        unit: 'pasien',
        value: res,
        formula: 'D = (Total Mati × 1.000) / GDR',
        steps: `D = (${fmt(v.c_mtot)} × 1.000) / ${fmt(v.c_gdr)}\nD = ${fmt(res)} pasien`
      };
    }
  },
  m_kurang48: {
    title: 'Hasil Pasien Mati < 48 Jam',
    fields: [
      { id: 'c_gdr', label: 'Nilai GDR (‰)', suffix: '‰', val: 25 },
      { id: 'c_ndr', label: 'Nilai NDR (‰)', suffix: '‰', val: 15 },
      { id: 'c_d', label: 'Pasien Keluar (D)', suffix: 'psn', val: 4000 }
    ],
    calc: (v) => {
      const mtot = (v.c_gdr * v.c_d) / 1000;
      const m48 = (v.c_ndr * v.c_d) / 1000;
      const res = mtot - m48;
      return {
        unit: 'pasien',
        value: res,
        formula: 'Mati < 48j = [ (GDR − NDR) × D ] / 1.000',
        steps: `Total Mati = (${fmt(v.c_gdr)} × ${fmt(v.c_d)}) / 1.000 = ${fmt(mtot)}\nMati ≥ 48j = (${fmt(v.c_ndr)} × ${fmt(v.c_d)}) / 1.000 = ${fmt(m48)}\nMati < 48j = ${fmt(mtot)} − ${fmt(m48)} = ${fmt(res)} pasien`
      };
    }
  }
};

function selectCompCat(catKey) {
  const buttons = document.querySelectorAll('#compCatPills .cat-pill');
  const keys = ['bor', 'los', 'toi', 'bto', 'death'];
  buttons.forEach((btn, idx) => {
    btn.classList.toggle('active', keys[idx] === catKey);
  });

  const sel = document.getElementById('compSelector');
  const options = COMP_CATEGORIES[catKey] || [];
  sel.innerHTML = options.map(o => `<option value="${o.val}">${o.text}</option>`).join('');
  renderComponentInputs();
}

function renderComponentInputs() {
  const key = document.getElementById('compSelector').value;
  const cfg = COMPONENT_CONFIGS[key];
  if (!cfg) return;

  let html = '<div class="grid-2-mobile">';
  cfg.fields.forEach(f => {
    html += `
      <div class="field-group">
        <label for="${f.id}">${f.label}</label>
        <div class="input-box">
          <input type="number" inputmode="decimal" id="${f.id}" value="${f.val}" step="any" oninput="calculateComponent()" />
          <span class="unit-tag">${f.suffix}</span>
        </div>
      </div>
    `;
  });
  html += '</div>';

  document.getElementById('compInputsContainer').innerHTML = html;
  calculateComponent();
}

function calculateComponent() {
  const key = document.getElementById('compSelector').value;
  const cfg = COMPONENT_CONFIGS[key];
  if (!cfg) return;

  const vals = {};
  cfg.fields.forEach(f => {
    vals[f.id] = val(f.id);
  });

  const out = cfg.calc(vals);

  document.getElementById('compResultContainer').innerHTML = `
    <div class="result-banner">
      <div class="rb-title">${cfg.title}</div>
      <div class="rb-val">${fmt(out.value)} <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-sub);">${out.unit}</span></div>
    </div>

    <div class="steps-list">
      <div class="step-item">
        <div class="step-summary"><span>Rumus Turunan</span></div>
        <div class="step-body">${out.formula}</div>
      </div>
      <div class="step-item">
        <div class="step-summary"><span>Cara Hitung</span></div>
        <div class="step-body">${out.steps}</div>
      </div>
    </div>
  `;
}

// =========================================================
// TAB 3: HUBUNGAN ANTAR-INDIKATOR (TANPA DATA DASAR)
// =========================================================

const CROSS_CONFIGS = {
  bor_toi: {
    fields: [
      { id: 'x_bor', label: 'BOR (%)', suffix: '%', val: 80 },
      { id: 'x_toi', label: 'TOI (hari)', suffix: 'hr', val: 1 }
    ],
    solve: (t, v) => {
      const BOR = v.x_bor;
      const TOI = v.x_toi;
      const LOS = (100 - BOR) !== 0 ? (BOR * TOI) / (100 - BOR) : 0;
      const BTO = (LOS + TOI) !== 0 ? t / (LOS + TOI) : 0;
      return {
        BOR, LOS, TOI, BTO,
        steps: [
          {
            title: '1. Cari AvLOS (dari BOR & TOI)',
            code: `Rumus : (BOR × TOI) / (100 − BOR)\nHitung: (${fmt(BOR)} × ${fmt(TOI)}) / (100 − ${fmt(BOR)})\n      = ${fmt(BOR * TOI)} / ${fmt(100 - BOR)} = ${fmt(LOS)} hari`
          },
          {
            title: '2. Cari BTO (dari AvLOS, TOI, t)',
            code: `Rumus : t / (AvLOS + TOI)\nHitung: ${fmt(t)} / (${fmt(LOS)} + ${fmt(TOI)}) = ${fmt(BTO)} kali`
          }
        ]
      };
    }
  },
  bor_los: {
    fields: [
      { id: 'x_bor', label: 'BOR (%)', suffix: '%', val: 75 },
      { id: 'x_los', label: 'AvLOS (hari)', suffix: 'hr', val: 6 }
    ],
    solve: (t, v) => {
      const BOR = v.x_bor;
      const LOS = v.x_los;
      const TOI = BOR !== 0 ? (LOS * (100 - BOR)) / BOR : 0;
      const BTO = LOS !== 0 ? (BOR * t) / (LOS * 100) : 0;
      return {
        BOR, LOS, TOI, BTO,
        steps: [
          {
            title: '1. Cari TOI (dari BOR & AvLOS)',
            code: `Rumus : [ AvLOS × (100 − BOR) ] / BOR\nHitung: [ ${fmt(LOS)} × (100 − ${fmt(BOR)}) ] / ${fmt(BOR)}\n      = ${fmt(TOI)} hari`
          },
          {
            title: '2. Cari BTO (dari BOR, AvLOS, t)',
            code: `Rumus : (BOR × t) / (AvLOS × 100)\nHitung: (${fmt(BOR)} × ${fmt(t)}) / (${fmt(LOS)} × 100) = ${fmt(BTO)} kali`
          }
        ]
      };
    }
  },
  bor_bto: {
    fields: [
      { id: 'x_bor', label: 'BOR (%)', suffix: '%', val: 75 },
      { id: 'x_bto', label: 'BTO (kali)', suffix: 'kl', val: 45 }
    ],
    solve: (t, v) => {
      const BOR = v.x_bor;
      const BTO = v.x_bto;
      const LOS = BTO !== 0 ? (BOR * t) / (BTO * 100) : 0;
      const TOI = BTO !== 0 ? ((100 - BOR) * t) / (BTO * 100) : 0;
      return {
        BOR, LOS, TOI, BTO,
        steps: [
          {
            title: '1. Cari AvLOS (dari BOR, BTO, t)',
            code: `Rumus : (BOR × t) / (BTO × 100)\nHitung: (${fmt(BOR)} × ${fmt(t)}) / (${fmt(BTO)} × 100) = ${fmt(LOS)} hari`
          },
          {
            title: '2. Cari TOI (dari BOR, BTO, t)',
            code: `Rumus : [ (100 − BOR) × t ] / (BTO × 100)\nHitung: [ (100 − ${fmt(BOR)}) × ${fmt(t)} ] / (${fmt(BTO)} × 100) = ${fmt(TOI)} hari`
          }
        ]
      };
    }
  },
  los_toi: {
    fields: [
      { id: 'x_los', label: 'AvLOS (hari)', suffix: 'hr', val: 6 },
      { id: 'x_toi', label: 'TOI (hari)', suffix: 'hr', val: 2 }
    ],
    solve: (t, v) => {
      const LOS = v.x_los;
      const TOI = v.x_toi;
      const sum = LOS + TOI;
      const BOR = sum !== 0 ? (LOS / sum) * 100 : 0;
      const BTO = sum !== 0 ? t / sum : 0;
      return {
        BOR, LOS, TOI, BTO,
        steps: [
          {
            title: '1. Cari BOR (dari AvLOS & TOI)',
            code: `Rumus : [ AvLOS / (AvLOS + TOI) ] × 100%\nHitung: [ ${fmt(LOS)} / (${fmt(LOS)} + ${fmt(TOI)}) ] × 100% = ${fmt(BOR)}%`
          },
          {
            title: '2. Cari BTO (dari AvLOS, TOI, t)',
            code: `Rumus : t / (AvLOS + TOI)\nHitung: ${fmt(t)} / (${fmt(LOS)} + ${fmt(TOI)}) = ${fmt(BTO)} kali`
          }
        ]
      };
    }
  },
  bto_los: {
    fields: [
      { id: 'x_bto', label: 'BTO (kali)', suffix: 'kl', val: 50 },
      { id: 'x_los', label: 'AvLOS (hari)', suffix: 'hr', val: 5.5 }
    ],
    solve: (t, v) => {
      const BTO = v.x_bto;
      const LOS = v.x_los;
      const BOR = t !== 0 ? ((BTO * LOS) / t) * 100 : 0;
      const TOI = BTO !== 0 ? (t / BTO) - LOS : 0;
      return {
        BOR, LOS, TOI, BTO,
        steps: [
          {
            title: '1. Cari BOR (dari BTO, AvLOS, t)',
            code: `Rumus : [ (BTO × AvLOS) / t ] × 100%\nHitung: [ (${fmt(BTO)} × ${fmt(LOS)}) / ${fmt(t)} ] × 100% = ${fmt(BOR)}%`
          },
          {
            title: '2. Cari TOI (dari BTO, AvLOS, t)',
            code: `Rumus : (t / BTO) − AvLOS\nHitung: (${fmt(t)} / ${fmt(BTO)}) − ${fmt(LOS)} = ${fmt(TOI)} hari`
          }
        ]
      };
    }
  },
  bto_toi: {
    fields: [
      { id: 'x_bto', label: 'BTO (kali)', suffix: 'kl', val: 50 },
      { id: 'x_toi', label: 'TOI (hari)', suffix: 'hr', val: 1.8 }
    ],
    solve: (t, v) => {
      const BTO = v.x_bto;
      const TOI = v.x_toi;
      const LOS = BTO !== 0 ? (t / BTO) - TOI : 0;
      const BOR = t !== 0 ? ((t - (BTO * TOI)) / t) * 100 : 0;
      return {
        BOR, LOS, TOI, BTO,
        steps: [
          {
            title: '1. Cari AvLOS (dari BTO, TOI, t)',
            code: `Rumus : (t / BTO) − TOI\nHitung: (${fmt(t)} / ${fmt(BTO)}) − ${fmt(TOI)} = ${fmt(LOS)} hari`
          },
          {
            title: '2. Cari BOR (dari BTO, TOI, t)',
            code: `Rumus : [ (t − (BTO × TOI)) / t ] × 100%\nHitung: [ (${fmt(t)} − ${fmt(BTO * TOI)}) / ${fmt(t)} ] × 100% = ${fmt(BOR)}%`
          }
        ]
      };
    }
  }
};

function renderCrossInputs() {
  const key = document.getElementById('crossPair').value;
  const cfg = CROSS_CONFIGS[key];
  if (!cfg) return;

  let html = '';
  cfg.fields.forEach(f => {
    html += `
      <div class="field-group">
        <label for="${f.id}">${f.label}</label>
        <div class="input-box">
          <input type="number" inputmode="decimal" id="${f.id}" value="${f.val}" step="any" oninput="calculateCross()" />
          <span class="unit-tag">${f.suffix}</span>
        </div>
      </div>
    `;
  });

  document.getElementById('crossDynamicInputs').innerHTML = html;
  calculateCross();
}

function calculateCross() {
  const key = document.getElementById('crossPair').value;
  const cfg = CROSS_CONFIGS[key];
  if (!cfg) return;

  const t = val('crossT');
  const vals = {};
  cfg.fields.forEach(f => {
    vals[f.id] = val(f.id);
  });

  const res = cfg.solve(t, vals);

  const extraType = document.getElementById('crossExtraType').value;
  const extraValGroup = document.getElementById('crossExtraValGroup');
  const extraLabel = document.getElementById('crossExtraLabel');
  let extraHTML = '';

  if (extraType === 'none') {
    extraValGroup.style.display = 'none';
  } else {
    extraValGroup.style.display = 'block';
    const extraVal = val('crossExtraVal');
    let A = 0, D = 0, HP = 0;

    if (extraType === 'A') {
      extraLabel.textContent = 'Jumlah Tempat Tidur (A)';
      A = extraVal;
      D = res.BTO * A;
      HP = (res.BOR * A * t) / 100;
    } else if (extraType === 'D') {
      extraLabel.textContent = 'Jumlah Pasien Keluar (D)';
      D = extraVal;
      A = res.BTO > 0 ? D / res.BTO : 0;
      HP = res.LOS * D;
    } else if (extraType === 'HP') {
      extraLabel.textContent = 'Hari Perawatan / Lama Dirawat (HP)';
      HP = extraVal;
      D = res.LOS > 0 ? HP / res.LOS : 0;
      A = (res.BOR * t) > 0 ? (HP * 100) / (res.BOR * t) : 0;
    }

    extraHTML = `
      <div class="sub-divider">Hasil Komponen Dasar (A, HP, D)</div>
      <div class="kpi-grid-mobile">
        <div class="kpi-tile">
          <div class="kpi-code">Tempat Tidur (A)</div>
          <div class="kpi-num">${fmt(A)} TT</div>
        </div>
        <div class="kpi-tile">
          <div class="kpi-code">Pasien Keluar (D)</div>
          <div class="kpi-num">${fmt(D)} psn</div>
        </div>
        <div class="kpi-tile" style="grid-column: span 2;">
          <div class="kpi-code">Hari Perawatan (HP = LD)</div>
          <div class="kpi-num">${fmt(HP)} hari</div>
        </div>
      </div>
    `;
  }

  const stepsBoxes = res.steps.map(s => `
    <div class="step-item">
      <div class="step-summary"><span>${s.title}</span></div>
      <div class="step-body">${s.code}</div>
    </div>
  `).join('');

  document.getElementById('crossResultContainer').innerHTML = `
    <div class="kpi-grid-mobile">
      <div class="kpi-tile">
        <div class="kpi-code">BOR</div>
        <div class="kpi-num">${fmtExact(res.BOR)}%</div>
        <div class="kpi-norm">Ideal: 60% – 85%</div>
      </div>
      <div class="kpi-tile">
        <div class="kpi-code">AvLOS</div>
        <div class="kpi-num">${fmtExact(res.LOS)} hr</div>
        <div class="kpi-norm">Ideal: 6 – 9 hr</div>
      </div>
      <div class="kpi-tile">
        <div class="kpi-code">TOI</div>
        <div class="kpi-num">${fmtExact(res.TOI)} hr</div>
        <div class="kpi-norm">Ideal: 1 – 3 hr</div>
      </div>
      <div class="kpi-tile">
        <div class="kpi-code">BTO</div>
        <div class="kpi-num">${fmtExact(res.BTO)} kl</div>
        <div class="kpi-norm">Periode: ${fmt(t)} hr</div>
      </div>
    </div>

    <div class="sub-divider">Cara Penyelesaian</div>
    <div class="steps-list">
      ${stepsBoxes}
    </div>
    ${extraHTML}
  `;
}

// Inisialisasi saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
  calculateAll();
  selectCompCat('bor');
  renderCrossInputs();
});
