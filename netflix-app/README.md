# 🍿 StreamFlix — Platform Streaming Video Mandiri (Netflix Clone Opsi B)

Aplikasi web streaming video dengan antarmuka sinematik ala **Netflix**, lengkap dengan pemutar video kustom, manajemen katalog, watchlist, dan **fitur unggah video mandiri (Option B)** dengan teknologi penyimpanan lokal IndexedDB serta dukungan streaming HTTP Range.

---

## ✨ Fitur Utama

1. **Antarmuka Otentik Netflix:**
   - Desain gelap (*Deep Black* `#141414` & *Netflix Red* `#E50914`).
   - Sticky dynamic Navbar dengan efek transisi saat di-scroll.
   - **Hero Billboard Unggulan:** Judul, sinopsis, status kecocokan, tombol *Putar Sekarang* & *Info Selengkapnya*.
   - **Kategori Baris / Carousel:**
     - *Video Unggahan Anda (Koleksi Lokal)*
     - *Daftar Saya (My List)*
     - *Sedang Tren Sekarang*
     - *Fiksi Ilmiah & Petualangan*
     - *Semua Katalog*
   - Tombol geser baris halus (*horizontal scroll buttons*).
   - Efek kartu zoom & panel aksi instan (*Play*, *Add to List*, *Info*).

2. **Studio Unggah Video Mandiri (Opsi B):**
   - **Drag & Drop** file video (MP4, WebM, MKV).
   - **Auto Thumbnail Generator:** Mengambil cuplikan frame video secara otomatis menggunakan HTML5 Canvas tanpa perlu upload gambar manual.
   - Metadata lengkap: Judul, Genre, Rating Usia (SU, 13+, 16+, 18+), Tahun, Sinopsis.
   - **Penyimpanan Persisten (IndexedDB):** Video tersimpan langsung di browser Anda dan tetap ada meskipun halaman di-refresh.

3. **Pemutar Video Kustom Ala Netflix (Cinema Web Player):**
   - Layar penuh (*Fullscreen*) & *Picture-in-Picture* (PiP).
   - Kontrol Play / Pause, Mundur 10 detik, Maju 10 detik.
   - Pengatur kecepatan putar (0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x).
   - *Scrubber Timeline* dengan indikator buffer dan *hover timestamp tooltip*.
   - Kontrol otomatis tersembunyi (*auto-hide controls*) setelah 2.5 detik mouse tidak bergerak.
   - Pintasan Keyboard (*Keyboard Shortcuts*):
     - `Space` / `K`: Putar / Jeda
     - `←` / `J`: Mundur 10 detik
     - `→` / `L`: Maju 10 detik
     - `↑` / `↓`: Volume Naik / Turun
     - `M`: Mute / Unmute
     - `F`: Layar Penuh (Fullscreen)
     - `Esc`: Keluar dari pemutar video

4. **Pencarian Instan:**
   - Pencarian real-time berdasarkan judul film, sinopsis, atau genre.

---

## 🚀 Cara Menjalankan

### Cara 1: Langsung di Browser (Paling Mudah)
Cukup klik dua kali file:
```
netflix-app/index.html
```
atau buka file tersebut melalui browser Google Chrome, Microsoft Edge, atau Brave.

---

### Cara 2: Menjalankan via Local Streaming Server (Dianjurkan)
Tersedia skrip PowerShell bawaan yang mendukung **HTTP Range Requests (206 Partial Content)**, sehingga pemutaran video besar dan seeking timeline berjalan sangat lancar:

1. Buka PowerShell di folder `netflix-app`.
2. Jalankan:
```powershell
powershell -ExecutionPolicy Bypass -File .\start-server.ps1
```
3. Browser akan otomatis terbuka ke `http://localhost:5000/`.

---

## 📁 Struktur File Proyek

```
netflix-app/
├── index.html          # Halaman utama aplikasi (Navbar, Hero, Baris Film, Modals, Player)
├── css/
│   └── style.css       # Tema Netflix, animasi spinner, transisi kartu, scrollbar kustom
├── js/
│   ├── data.js         # Katalog film bawaan dengan streaming video berkualitas tinggi
│   ├── db.js           # Engine IndexedDB untuk menyimpan video & thumbnail hasil upload
│   ├── player.js       # Kontroler pemutar video kustom Netflix
│   └── app.js          # Logika aplikasi, pencarian, modal detail, dan studio upload
├── start-server.ps1    # Server HTTP lokal dengan dukungan 206 Partial Content (Streaming)
└── README.md           # Dokumentasi proyek
```

---

## 🛠️ Pengembangan Lanjutan ke Skala Produksi

Jika nantinya Anda ingin mempublikasikan platform ini ke server publik / cloud:
- **Transcoding HLS (HTTP Live Streaming):** Gunakan FFmpeg untuk mengonversi MP4 ke format `.m3u8` dengan variasi multi-bitrate (360p, 720p, 1080p).
- **Backend & Database:** Gunakan Node.js (Express/NestJS) atau Supabase untuk manajemen akun pengguna, subscription, dan metadata.
- **Storage & CDN:** Simpan file video di AWS S3, Cloudflare R2, atau Cloudflare Stream untuk streaming cepat tanpa buffering.
