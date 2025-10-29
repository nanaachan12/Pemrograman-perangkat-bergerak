# Program Logika NIM (Tugas 1 PBPM)

Program ini adalah aplikasi konsol (CLI) interaktif yang dibuat menggunakan Node.js dan TypeScript. Program ini dirancang untuk memenuhi Tugas 1 Mata Kuliah Pemrograman Berbasis Perangkat Bergerak, yang menguji logika pemrograman dengan mengolah Nomor Induk Mahasiswa (NIM).

## 🚀 Fitur Utama

Program ini memiliki menu interaktif untuk memilih 3 (tiga) soal logika yang berbeda:

### 1. Pola Segitiga
* **Input:** NIM
* **Logika:** Mengambil **digit terakhir** NIM untuk dijadikan `tinggi` segitiga.
* **Output:** Mencetak pola segitiga angka sesuai `tinggi` tersebut.
    * Contoh `tinggi = 4`:
        ```
        1
        1 2
        1 2 3
        1 2 3 4
        ```

### 2. Deret Aritmatika
* **Input:** NIM
* **Logika:**
    * **Angka Awal:** Diambil dari **2 digit terakhir** NIM.
    * **Beda:** Diambil dari **digit ke-3 dari belakang** NIM, dengan aturan khusus:
        * Jika digit tersebut `0`, maka beda menjadi `1`.
        * Jika digit tersebut bukan `0`, maka beda = `(digit tersebut) + 1`.
* **Output:** Mencetak 10 angka pertama dari deret aritmatika tersebut.

### 3. Bilangan Prima
* **Input:** NIM
* **Logika:**
    * **Batas Akhir:** Dihitung dari `(2 digit terakhir NIM) + 10`.
* **Output:** Mencetak semua bilangan prima dari 1 sampai `Batas Akhir` yang telah ditentukan.

## 🛠️ Teknologi yang Digunakan

* **Node.js**: Lingkungan eksekusi JavaScript.
* **TypeScript**: Superset JavaScript untuk type-safety.
* **`readline`**: Modul bawaan Node.js untuk input/output terminal.
* **`chalk`**: Library untuk memberi warna pada teks di terminal.
* **`tsx`**: Library untuk mengeksekusi file TypeScript secara langsung.

## ⚙️ Cara Menjalankan

1.  **Pastikan Node.js terinstal.**
2.  **Instal dependensi:**
    ```bash
    npm install
    ```
    *(Ini akan menginstal `chalk`, `tsx`, `typescript`, dll. yang ada di `package.json`)*

3.  **Jalankan program:**
    ```bash
    ts-node tugas1.ts
    ```
4.  Ikuti menu interaktif di terminal.

## 👩‍💻 Identitas Mahasiswa

| Keterangan | Data |
| :--- | :--- |
| **Nama** | Nabila Naurotul Ummah |
| **NIM** | 048656024 |
| **Program Studi** | Sistem Informasi |
| **Universitas** | Universitas Terbuka |