# Closest Pair of Points Visualizer

Aplikasi visualisasi interaktif untuk membandingkan algoritma pencarian pasangan titik terdekat (Closest Pair of Points).

## Anggota Kelompok 7 IF11

- **10124397** - Maulana Fadzril Sukmana
- **10124423** - Kayfa Asfa Ghifari
- **10124427** - Irfan Nur Rasyid
- **10124433** - Ade Muchlisidin

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

## Tech Stack

- React + Vite
- Tailwind CSS
