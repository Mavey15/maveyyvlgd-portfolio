/**
 * StreamFlix Local Database (IndexedDB)
 * Stores uploaded video files, posters, and user watchlist.
 */

const DB_NAME = "StreamFlixDB";
const DB_VERSION = 1;
const STORE_VIDEOS = "uploaded_videos";
const STORE_MY_LIST = "my_list";

class StreamFlixDB {
  constructor() {
    this.db = null;
    this.initPromise = this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Store for uploaded videos
        if (!db.objectStoreNames.contains(STORE_VIDEOS)) {
          const videoStore = db.createObjectStore(STORE_VIDEOS, { keyPath: "id" });
          videoStore.createIndex("createdAt", "createdAt", { unique: false });
          videoStore.createIndex("category", "category", { unique: false });
        }

        // Store for bookmark / my list
        if (!db.objectStoreNames.contains(STORE_MY_LIST)) {
          db.createObjectStore(STORE_MY_LIST, { keyPath: "id" });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error("IndexedDB Error:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  async saveVideo(videoData) {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_VIDEOS], "readwrite");
      const store = transaction.objectStore(STORE_VIDEOS);

      const record = {
        id: videoData.id || "upload-" + Date.now(),
        title: videoData.title || "Video Tanpa Judul",
        tagline: videoData.tagline || "Video lokal yang diunggah pengguna.",
        synopsis: videoData.synopsis || "Tidak ada deskripsi yang tersedia.",
        duration: videoData.duration || "0m 00s",
        durationSeconds: videoData.durationSeconds || 0,
        year: videoData.year || new Date().getFullYear(),
        rating: videoData.rating || "13+",
        match: videoData.match || "100% Match",
        quality: videoData.quality || "Original HD",
        audio: "Stereo",
        category: videoData.category || "my-uploads",
        genres: videoData.genres || ["Upload Saya", "Koleksi Pribadi"],
        cast: ["Anda (Creator)"],
        director: "Anda",
        posterUrl: videoData.posterUrl, // Data URL from canvas or custom image
        bannerUrl: videoData.bannerUrl || videoData.posterUrl,
        videoBlob: videoData.videoBlob, // Raw Video Blob in IndexedDB
        fileSize: videoData.fileSize || 0,
        fileName: videoData.fileName || "video.mp4",
        createdAt: Date.now(),
        isUploaded: true
      };

      const request = store.put(record);

      request.onsuccess = () => resolve(record);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async getAllUploadedVideos() {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_VIDEOS], "readonly");
      const store = transaction.objectStore(STORE_VIDEOS);
      const request = store.getAll();

      request.onsuccess = () => {
        // Create object URLs for each blob
        const items = request.result.map((item) => {
          if (item.videoBlob) {
            item.videoUrl = URL.createObjectURL(item.videoBlob);
          }
          return item;
        });
        resolve(items);
      };
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async deleteVideo(id) {
    await this.initPromise;
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_VIDEOS], "readwrite");
      const store = transaction.objectStore(STORE_VIDEOS);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  // Watchlist methods
  async getMyListIds() {
    await this.initPromise;
    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_MY_LIST], "readonly");
      const store = transaction.objectStore(STORE_MY_LIST);
      const request = store.getAllKeys();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve([]);
    });
  }

  async toggleMyList(id) {
    await this.initPromise;
    const exists = await this.isInMyList(id);
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_MY_LIST], "readwrite");
      const store = transaction.objectStore(STORE_MY_LIST);

      if (exists) {
        store.delete(id);
        transaction.oncomplete = () => resolve(false);
      } else {
        store.put({ id, addedAt: Date.now() });
        transaction.oncomplete = () => resolve(true);
      }
      transaction.onerror = (e) => reject(e.target.error);
    });
  }

  async isInMyList(id) {
    await this.initPromise;
    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_MY_LIST], "readonly");
      const store = transaction.objectStore(STORE_MY_LIST);
      const request = store.get(id);
      request.onsuccess = () => resolve(!!request.result);
      request.onerror = () => resolve(false);
    });
  }
}

window.db = new StreamFlixDB();
