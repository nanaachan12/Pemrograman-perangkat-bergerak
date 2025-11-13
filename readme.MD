# 🌤️ Ionic Vue Weather App

Aplikasi cuaca interaktif yang dibangun menggunakan **Ionic Framework** dan **Vue.js 3 (Composition API + TypeScript)**.  
Aplikasi ini menampilkan informasi cuaca terkini serta prakiraan cuaca beberapa hari ke depan dengan tampilan yang sederhana, ringan, dan responsif.

---

## 👩‍💻 Identitas Mahasiswa

| Keterangan | Detail |
|-------------|--------|
| **Nama** | Nabila Naurotul Ummah |
| **Program Studi** | Sistem Informasi|
| **NIM** | 048656024 |

---

## 🚀 Fitur Utama Proyek

### 1. **Cuaca Terkini**
Menampilkan suhu, kondisi cuaca (cerah, hujan, berawan), dan kelembapan berdasarkan data real-time dari API.

### 2. **Prakiraan Per Jam (Hari Ini)**
- Menampilkan prakiraan suhu dan kondisi cuaca tiap jam dalam format horizontal.
- Memberikan informasi detail untuk membantu pengguna memantau perubahan cuaca dalam sehari.

### 3. **Prakiraan Hari Berikutnya**
- Menyediakan tab untuk **6 hari ke depan** (tidak termasuk hari ini).  
- Pengguna dapat memilih hari tertentu untuk melihat prakiraan cuaca per jam.

### 4. **Desain Responsif**
- Antarmuka menyesuaikan tampilan di **smartphone**, **tablet**, dan **desktop**.  
- Menggunakan *max-width layout* agar tampilan tetap proporsional.

### 5. **Manajemen State dan Error Handling**
- Menampilkan *loading spinner* saat data cuaca sedang diambil.  
- Memunculkan pesan error jika terjadi kegagalan koneksi atau API tidak tersedia.

### 6. **Modal Profil / Tentang Aplikasi**
- Menampilkan informasi tentang pengembang atau deskripsi aplikasi dalam bentuk pop-up (modal).

### 7. **Tema Kustom (THEME_LIGHT)**
- Menggunakan gradien lembut dan nuansa warna biru-ungu pastel.  
- Mengatur warna toolbar, kartu, dan footer agar terlihat harmonis dan modern.

---

## 🧱 Teknologi yang Digunakan

| Kategori | Teknologi | Deskripsi |
|-----------|------------|-----------|
| **Framework** | [Ionic 7+](https://ionicframework.com/) | Framework untuk membangun aplikasi hybrid berbasis web. |
| **Library UI** | [Vue.js 3](https://vuejs.org/) | Framework progresif untuk membangun antarmuka pengguna modern. |
| **Bahasa** | TypeScript | Superset dari JavaScript untuk kode yang lebih terstruktur dan aman. |
| **Komponen UI** | Ionic Components | Seperti `IonPage`, `IonContent`, `IonSpinner`, `IonTabs`, dan lainnya. |
| **Styling** | Scoped CSS + Font *Poppins* | Untuk tampilan rapi dan konsisten di seluruh aplikasi. |
| **API Cuaca** | [Open-Meteo API](https://open-meteo.com) | Sumber data cuaca yang digunakan untuk mendapatkan suhu, kode cuaca, dan kelembapan. |
| **Build Tools** | Vite / Ionic CLI | Untuk pengembangan cepat dengan *hot reload*. |

---



