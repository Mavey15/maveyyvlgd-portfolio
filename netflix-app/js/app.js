/**
 * StreamFlix Main Application Controller
 */

class StreamFlixApp {
  constructor() {
    this.allMovies = [];
    this.myListIds = new Set();
    this.currentHero = null;
    this.selectedMovie = null;
    this.player = null;

    this.init();
  }

  async init() {
    // Initialize Player
    this.player = new NetflixPlayer();

    // Bind DOM events
    this.bindEvents();

    // Load Data
    await this.loadData();

    // Render Initial UI
    this.setupHero(this.allMovies[0]);
    this.renderAllRows();
  }

  async loadData() {
    // 1. Get default movies
    const defaults = window.DEFAULT_MOVIES || [];

    // 2. Get uploaded videos from IndexedDB
    let uploaded = [];
    try {
      uploaded = await window.db.getAllUploadedVideos();
    } catch (e) {
      console.warn("Could not load uploaded videos:", e);
    }

    // Combine: uploads first in catalogs
    this.allMovies = [...uploaded, ...defaults];

    // 3. Load user watchlist
    try {
      const listIds = await window.db.getMyListIds();
      this.myListIds = new Set(listIds);
      this.updateMyListCounter();
    } catch (e) {
      console.warn("Could not load watchlist:", e);
    }
  }

  bindEvents() {
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      const navbar = document.getElementById("navbar");
      if (window.scrollY > 40) {
        navbar.classList.add("bg-[#141414]", "shadow-2xl");
        navbar.classList.remove("bg-gradient-to-b");
      } else {
        navbar.classList.remove("bg-[#141414]", "shadow-2xl");
        navbar.classList.add("bg-gradient-to-b");
      }
    });

    // Search input
    const searchInput = document.getElementById("search-input");
    const searchToggle = document.getElementById("search-toggle-btn");
    const searchBox = document.getElementById("search-box");

    searchToggle.addEventListener("click", () => {
      searchBox.classList.toggle("w-0");
      searchBox.classList.toggle("opacity-0");
      searchBox.classList.toggle("w-64");
      searchBox.classList.toggle("opacity-100");
      if (searchBox.classList.contains("w-64")) {
        searchInput.focus();
      }
    });

    searchInput.addEventListener("input", (e) => this.handleSearch(e.target.value));

    // Upload Modal Triggers
    const openUploadBtns = document.querySelectorAll(".btn-open-upload");
    const uploadModal = document.getElementById("upload-modal");
    const closeUploadBtn = document.getElementById("close-upload-btn");

    openUploadBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        uploadModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    });

    closeUploadBtn.addEventListener("click", () => {
      uploadModal.classList.add("hidden");
      document.body.style.overflow = "auto";
      this.resetUploadForm();
    });

    // Detail Modal Close
    const detailModal = document.getElementById("detail-modal");
    const closeDetailBtn = document.getElementById("close-detail-btn");
    closeDetailBtn.addEventListener("click", () => {
      detailModal.classList.add("hidden");
      document.body.style.overflow = "auto";
    });

    // Click outside modals to close
    window.addEventListener("click", (e) => {
      if (e.target === detailModal) {
        detailModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }
      if (e.target === uploadModal) {
        uploadModal.classList.add("hidden");
        document.body.style.overflow = "auto";
        this.resetUploadForm();
      }
    });

    // Close open modals with Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!detailModal.classList.contains("hidden")) {
        detailModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }
      if (!uploadModal.classList.contains("hidden")) {
        uploadModal.classList.add("hidden");
        document.body.style.overflow = "auto";
        this.resetUploadForm();
      }
    });

    // Setup Video Upload Drag & Drop & Processing
    this.setupUploadHandlers();
  }

  setupHero(movie) {
    if (!movie) return;
    this.currentHero = movie;

    const heroTitle = document.getElementById("hero-title");
    const heroTagline = document.getElementById("hero-tagline");
    const heroSynopsis = document.getElementById("hero-synopsis");
    const heroBg = document.getElementById("hero-bg");
    const heroMatch = document.getElementById("hero-match");
    const heroRating = document.getElementById("hero-rating");
    const heroQuality = document.getElementById("hero-quality");
    const heroPlayBtn = document.getElementById("hero-play-btn");
    const heroInfoBtn = document.getElementById("hero-info-btn");

    heroTitle.textContent = movie.title;
    heroTagline.textContent = movie.tagline || movie.title;
    heroSynopsis.textContent = movie.synopsis;
    heroMatch.textContent = movie.match || "98% Match";
    heroRating.textContent = movie.rating || "13+";
    heroQuality.textContent = movie.quality || "Ultra HD";

    heroBg.style.backgroundImage = `linear-gradient(to top, #141414 10%, rgba(20,20,20,0.6) 50%, rgba(20,20,20,0.8) 100%), url('${movie.bannerUrl || movie.posterUrl}')`;

    // Remove old listeners by cloning
    const newPlayBtn = heroPlayBtn.cloneNode(true);
    heroPlayBtn.parentNode.replaceChild(newPlayBtn, heroPlayBtn);
    newPlayBtn.addEventListener("click", () => {
      this.player.open(movie);
    });

    const newInfoBtn = heroInfoBtn.cloneNode(true);
    heroInfoBtn.parentNode.replaceChild(newInfoBtn, heroInfoBtn);
    newInfoBtn.addEventListener("click", () => {
      this.openDetailModal(movie);
    });
  }

  renderAllRows() {
    const uploaded = this.allMovies.filter((m) => m.isUploaded);
    const trending = this.allMovies.filter((m) => m.isTrending || m.isFeatured);
    const scifi = this.allMovies.filter((m) => m.category === "sci-fi" || (m.genres && m.genres.includes("Sci-Fi")));
    const myListMovies = this.allMovies.filter((m) => this.myListIds.has(m.id));

    // Uploaded Row Container
    const uploadedSection = document.getElementById("row-my-uploads-section");
    if (uploaded.length > 0) {
      uploadedSection.classList.remove("hidden");
      this.renderRow("row-my-uploads", uploaded, true);
    } else {
      uploadedSection.classList.add("hidden");
    }

    // My List Row Container
    const myListSection = document.getElementById("row-my-list-section");
    if (myListMovies.length > 0) {
      myListSection.classList.remove("hidden");
      this.renderRow("row-my-list", myListMovies);
    } else {
      myListSection.classList.add("hidden");
    }

    // Trending & Categories
    this.renderRow("row-trending", trending.length > 0 ? trending : this.allMovies);
    this.renderRow("row-scifi", scifi.length > 0 ? scifi : this.allMovies.slice(0, 4));
    this.renderRow("row-all", this.allMovies);
  }

  renderRow(containerId, movies, isUploadedSection = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "flex-none w-56 md:w-64 lg:w-72 group relative cursor-pointer transition-all duration-300 hover:scale-105 z-10 hover:z-30";

      const isBookmarked = this.myListIds.has(movie.id);

      card.innerHTML = `
        <div class="relative aspect-[16/10] bg-[#222] rounded-md overflow-hidden shadow-lg border border-[#333]">
          <img 
            src="${movie.posterUrl || movie.bannerUrl}" 
            alt="${movie.title}" 
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80'"
          />
          ${
            movie.isUploaded
              ? `<span class="absolute top-2 left-2 bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">UPLOAD ANDA</span>`
              : ""
          }
          <div class="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-xs px-1.5 py-0.5 rounded font-mono">
            ${movie.duration || "Video"}
          </div>
        </div>

        <!-- Hover Quick Actions Panel -->
        <div class="mt-2.5 px-1">
          <div class="flex items-center justify-between mb-1.5">
            <h4 class="text-white font-semibold text-sm md:text-base truncate max-w-[170px]">${movie.title}</h4>
            <div class="flex items-center space-x-1.5">
              <button class="btn-card-play p-1.5 bg-white text-black rounded-full hover:bg-neutral-200 transition shadow" title="Putar">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <button class="btn-card-list p-1.5 bg-[#2a2a2a] text-white rounded-full hover:border hover:border-white transition shadow" title="Tambah ke Daftar">
                ${
                  isBookmarked
                    ? `<svg class="w-3.5 h-3.5 text-[#E50914]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>`
                    : `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>`
                }
              </button>
              <button class="btn-card-info p-1.5 bg-[#2a2a2a] text-white rounded-full hover:border hover:border-white transition shadow" title="Info Lengkap">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
            </div>
          </div>
          <div class="flex items-center space-x-2 text-[11px] text-[#46d369] font-semibold">
            <span>${movie.match || "98% Match"}</span>
            <span class="text-neutral-400 border border-neutral-600 px-1 rounded text-[10px]">${movie.rating || "13+"}</span>
            <span class="text-neutral-400">${movie.year || "2024"}</span>
            <span class="text-neutral-400 border border-neutral-600 px-1 rounded text-[9px] font-bold">${movie.quality || "HD"}</span>
          </div>
          <div class="text-[11px] text-neutral-400 mt-1 truncate">
            ${(movie.genres || []).join(" • ")}
          </div>
        </div>
      `;

      // Event Listeners for Card Buttons
      const playBtn = card.querySelector(".btn-card-play");
      const listBtn = card.querySelector(".btn-card-list");
      const infoBtn = card.querySelector(".btn-card-info");
      const cardImage = card.querySelector("img");

      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.player.open(movie);
      });

      cardImage.addEventListener("click", () => {
        this.openDetailModal(movie);
      });

      infoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openDetailModal(movie);
      });

      listBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const added = await window.db.toggleMyList(movie.id);
        if (added) {
          this.myListIds.add(movie.id);
        } else {
          this.myListIds.delete(movie.id);
        }
        this.updateMyListCounter();
        this.renderAllRows();
      });

      container.appendChild(card);
    });
  }

  openDetailModal(movie) {
    this.selectedMovie = movie;
    const modal = document.getElementById("detail-modal");

    document.getElementById("detail-title").textContent = movie.title;
    document.getElementById("detail-tagline").textContent = movie.tagline || "";
    document.getElementById("detail-synopsis").textContent = movie.synopsis;
    document.getElementById("detail-match").textContent = movie.match || "98% Match";
    document.getElementById("detail-year").textContent = movie.year || 2024;
    document.getElementById("detail-rating").textContent = movie.rating || "13+";
    document.getElementById("detail-duration").textContent = movie.duration || "1h 30m";
    document.getElementById("detail-quality").textContent = movie.quality || "4K Ultra HD";
    document.getElementById("detail-genres").textContent = (movie.genres || []).join(", ");
    document.getElementById("detail-cast").textContent = (movie.cast || ["Aktor / Kreator"]).join(", ");
    document.getElementById("detail-director").textContent = movie.director || "Sutradara Film";

    const detailBanner = document.getElementById("detail-banner");
    detailBanner.style.backgroundImage = `linear-gradient(to top, #181818 10%, rgba(24,24,24,0.4) 50%, rgba(24,24,24,0.8) 100%), url('${movie.bannerUrl || movie.posterUrl}')`;

    // Play CTA in Modal
    const playBtn = document.getElementById("detail-play-btn");
    const newPlayBtn = playBtn.cloneNode(true);
    playBtn.parentNode.replaceChild(newPlayBtn, playBtn);
    newPlayBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      this.player.open(movie);
    });

    // Delete Button (Only for uploaded videos)
    const deleteBtn = document.getElementById("detail-delete-btn");
    if (movie.isUploaded) {
      deleteBtn.classList.remove("hidden");
      const newDeleteBtn = deleteBtn.cloneNode(true);
      deleteBtn.parentNode.replaceChild(newDeleteBtn, deleteBtn);
      newDeleteBtn.addEventListener("click", async () => {
        if (confirm(`Apakah Anda yakin ingin menghapus "${movie.title}" dari koleksi Anda?`)) {
          await window.db.deleteVideo(movie.id);
          modal.classList.add("hidden");
          document.body.style.overflow = "auto";
          await this.loadData();
          this.renderAllRows();
        }
      });
    } else {
      deleteBtn.classList.add("hidden");
    }

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  setupUploadHandlers() {
    const dropzone = document.getElementById("upload-dropzone");
    const fileInput = document.getElementById("video-file-input");
    const previewContainer = document.getElementById("upload-preview-container");
    const previewVideo = document.getElementById("upload-preview-video");
    const thumbCanvas = document.getElementById("upload-thumb-canvas");
    const posterPreview = document.getElementById("upload-poster-preview");
    const form = document.getElementById("upload-form");
    const progressContainer = document.getElementById("upload-progress-container");
    const progressBar = document.getElementById("upload-progress-bar");
    const progressPercent = document.getElementById("upload-progress-percent");

    let uploadedBlob = null;
    let generatedThumbnail = null;
    let videoDurationSeconds = 0;
    let videoDurationFormatted = "0m 00s";

    // Click dropzone to open file picker
    dropzone.addEventListener("click", () => fileInput.click());

    // Drag and Drop
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("border-[#E50914]", "bg-red-500/10");
    });

    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("border-[#E50914]", "bg-red-500/10");
    });

    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("border-[#E50914]", "bg-red-500/10");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processSelectedFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        processSelectedFile(e.target.files[0]);
      }
    });

    const processSelectedFile = (file) => {
      if (!file.type.startsWith("video/")) {
        alert("Harap pilih file video (MP4, WebM, MKV).");
        return;
      }

      uploadedBlob = file;
      const objectUrl = URL.createObjectURL(file);
      previewVideo.src = objectUrl;
      previewContainer.classList.remove("hidden");
      dropzone.classList.add("hidden");

      // Auto fill title if empty
      const titleInput = document.getElementById("upload-title");
      if (!titleInput.value) {
        titleInput.value = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      }

      // Read video duration and capture thumbnail frame
      previewVideo.onloadedmetadata = () => {
        videoDurationSeconds = Math.round(previewVideo.duration);
        const m = Math.floor(videoDurationSeconds / 60);
        const s = videoDurationSeconds % 60;
        videoDurationFormatted = `${m}m ${s.toString().padStart(2, "0")}s`;

        // Seek 2 seconds in to grab nice thumbnail frame
        previewVideo.currentTime = Math.min(2.0, previewVideo.duration / 2);
      };

      previewVideo.onseeked = () => {
        // Draw frame to canvas
        const ctx = thumbCanvas.getContext("2d");
        thumbCanvas.width = 640;
        thumbCanvas.height = 360;
        ctx.drawImage(previewVideo, 0, 0, 640, 360);
        generatedThumbnail = thumbCanvas.toDataURL("image/jpeg", 0.85);
        posterPreview.src = generatedThumbnail;
        posterPreview.classList.remove("hidden");
      };
    };

    // Form submit: save into IndexedDB
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!uploadedBlob) {
        alert("Silakan pilih file video terlebih dahulu.");
        return;
      }

      const title = document.getElementById("upload-title").value.trim();
      const genre = document.getElementById("upload-genre").value;
      const rating = document.getElementById("upload-rating").value;
      const synopsis = document.getElementById("upload-synopsis").value.trim();

      progressContainer.classList.remove("hidden");
      form.querySelector('button[type="submit"]').disabled = true;

      // Simulate progressive saving into IndexedDB
      let progress = 10;
      const interval = setInterval(async () => {
        progress += 25;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          progressBar.style.width = "100%";
          progressPercent.textContent = "100% - Menyimpan...";

          try {
            await window.db.saveVideo({
              title: title,
              tagline: `Koleksi original unggahan: ${title}`,
              synopsis: synopsis || "Video berkualitas tinggi diunggah oleh pengguna ke platform StreamFlix.",
              duration: videoDurationFormatted,
              durationSeconds: videoDurationSeconds,
              rating: rating,
              category: genre,
              genres: [genre, "Upload Pribadi", "Original"],
              posterUrl: generatedThumbnail || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
              videoBlob: uploadedBlob,
              fileSize: uploadedBlob.size,
              fileName: uploadedBlob.name,
              year: new Date().getFullYear(),
              quality: "1080p Full HD"
            });

            // Reload and refresh view
            await this.loadData();
            this.renderAllRows();

            // Close upload modal
            setTimeout(() => {
              document.getElementById("upload-modal").classList.add("hidden");
              document.body.style.overflow = "auto";
              this.resetUploadForm();
              alert(`🎉 Video "${title}" berhasil diunggah dan siap di-stream!`);
            }, 600);
          } catch (err) {
            console.error("Save video error:", err);
            alert("Gagal menyimpan video ke IndexedDB: " + err.message);
          }
        } else {
          progressBar.style.width = `${progress}%`;
          progressPercent.textContent = `${progress}%`;
        }
      }, 150);
    });
  }

  resetUploadForm() {
    const form = document.getElementById("upload-form");
    if (form) form.reset();

    document.getElementById("upload-dropzone").classList.remove("hidden");
    document.getElementById("upload-preview-container").classList.add("hidden");
    document.getElementById("upload-poster-preview").classList.add("hidden");
    document.getElementById("upload-progress-container").classList.add("hidden");
    document.getElementById("upload-preview-video").src = "";
    document.getElementById("upload-form").querySelector('button[type="submit"]').disabled = false;
  }

  handleSearch(query) {
    const q = query.trim().toLowerCase();
    const searchSection = document.getElementById("search-results-section");

    if (!q) {
      searchSection.classList.add("hidden");
      return;
    }

    const matches = this.allMovies.filter((m) => {
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchSynopsis = (m.synopsis || "").toLowerCase().includes(q);
      const matchGenres = (m.genres || []).some((g) => g.toLowerCase().includes(q));
      return matchTitle || matchSynopsis || matchGenres;
    });

    searchSection.classList.remove("hidden");
    document.getElementById("search-query-label").textContent = `Hasil pencarian untuk "${query}" (${matches.length} film)`;
    this.renderRow("row-search-results", matches);
  }

  updateMyListCounter() {
    const badge = document.getElementById("nav-my-list-count");
    if (badge) {
      badge.textContent = this.myListIds.size;
    }
  }
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new StreamFlixApp();
});
