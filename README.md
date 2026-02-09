# Closest Pair of Points Visualizer

Aplikasi visualisasi interaktif untuk membandingkan algoritma pencarian pasangan titik terdekat (Closest Pair of Points).

## Fitur

- **Dua Algoritma**: Brute Force (O(n²)) dan Divide & Conquer (O(n log n))
- **Animasi Step-by-Step**: Lihat proses algoritma secara visual
- **Kontrol Kecepatan**: Atur kecepatan animasi (0.25x - 1x)
- **Perbandingan Performa**: Bandingkan waktu eksekusi dan jumlah operasi
- **Generate Random Points**: Buat titik-titik acak dengan jumlah yang dapat disesuaikan

## Cara Menggunakan

1. **Generate Points**: Masukkan jumlah titik dan klik "Generate"
2. **Pilih Metode**: Pilih antara Brute Force atau Divide and Conquer
3. **Search Pairs**: Klik tombol "Search Pairs" untuk menjalankan algoritma
4. **Play Animation**:
   - Klik "Play" untuk memulai animasi step-by-step
   - Klik "Pause" untuk menghentikan sementara
   - Klik "Reset" untuk kembali ke awal
   - Pilih kecepatan (0.25x, 0.5x, 0.75x, 1x)
5. **Lihat Progress**: Progress bar menunjukkan berapa banyak langkah yang sudah dijalankan

## Visualisasi

- **Titik Abu-abu**: Semua titik yang di-generate
- **Garis Orange**: Pasangan titik yang sedang dibandingkan
- **Garis Hijau**: Pasangan terdekat baru ditemukan
- **Garis Biru**: Pasangan terdekat saat ini (saat animasi)
- **Titik Hijau Besar**: Pasangan terdekat final

## Development

```bash
npm install
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain jika sudah digunakan).

## Build untuk Production

```bash
npm run build
```

Output akan ada di folder `dist/`.

## Preview Production Build

```bash
npm run preview
```

## Deployment ke Vercel

### Cara 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Cara 2: Vercel Dashboard

1. Push kode ke GitHub/GitLab/Bitbucket
2. Import project di [vercel.com](https://vercel.com)
3. Vercel akan otomatis detect Vite dan deploy

### Cara 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

**Catatan:** Vercel akan otomatis menjalankan `npm run build` dan deploy folder `dist/`.

## Tech Stack

- React + Vite
- Canvas API untuk visualisasi
- Tailwind CSS untuk styling
