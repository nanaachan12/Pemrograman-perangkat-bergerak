# Program Logika NIM (Tugas 1 PBPD)

Program ini adalah aplikasi konsol (CLI) interaktif yang dibuat menggunakan Node.js dan TypeScript. Program ini dirancang untuk memenuhi Tugas 1 Mata Kuliah Pemrograman Berbasis Perangkat Bergerak, yang menguji logika pemrograman dengan mengolah Nomor Induk Mahasiswa (NIM).

## 🚀 Fitur Utama

Program ini memiliki menu interaktif untuk memilih 3 (tiga) soal logika yang berbeda:

### 1. Pola Segitiga
* **Input:** 048656024
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
* **Input:** 048656024
* **Logika:**
    * **Angka Awal:** Diambil dari **2 digit terakhir** NIM.
    * **Beda:** Diambil dari **digit ke-3 dari belakang** NIM, dengan aturan khusus:
        * Jika digit tersebut `0`, maka beda menjadi `1`.
        * Jika digit tersebut bukan `0`, maka beda = `(digit tersebut) + 1`.
* **Output:**  24, 25, 26, 27, 28, 29, 30, 31, 32, 33

### 3. Bilangan Prima
* **Input:** 048656024
* **Logika:**
    * **Batas Akhir:** Dihitung dari `(2 digit terakhir NIM) + 10`.
* **Output:** 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31

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


| :--- | :--- |
| **Nama** | Nabila Naurotul Ummah |
| **NIM** | 048656024 |
| **Program Studi** | Sistem Informasi |
| **Universitas** | Universitas Terbuka |
