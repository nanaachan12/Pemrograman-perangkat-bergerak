// Import modul readline untuk input dari terminal
import * as readline from 'node:readline';
// Import chalk untuk memberikan warna pada teks di terminal
import chalk from 'chalk';

// =================== BAGIAN FUNGSI ===================

// Soal 1: Menampilkan pola segitiga dari digit terakhir NIM
function buatPolaSegitiga(nim: string): void {
  const tinggi = parseInt(nim.slice(-1)); // tinggi segitiga = digit terakhir NIM
  console.log(chalk.blue(`Tinggi segitiga berdasarkan NIM ${nim} adalah: ${tinggi}`));

  for (let i = 1; i <= tinggi; i++) {
    let baris = '';
    for (let j = 1; j <= i; j++) {
      baris += j + ' ';
    }
    console.log(chalk.green(baris.trim()));
  }

  console.log(chalk.gray('(Digit terakhir NIM = tinggi segitiga)'));
}

// Soal 2: Membuat deret aritmatika dari NIM
function buatDeretAritmatika(nim: string): void {
  const angkaAwal = parseInt(nim.slice(-2));   // dua digit terakhir = angka awal
  let beda = parseInt(nim.slice(-3, -2));      // digit ke-3 dari belakang = beda

  // Aturan tambahan untuk nilai beda
  if (beda === 0) beda = 1;
  else beda += 1;

  console.log(chalk.blue(`Deret Aritmatika dari NIM ${nim}:`));
  console.log(chalk.yellow(`- Angka Awal: ${angkaAwal}`));
  console.log(chalk.yellow(`- Beda (Step): ${beda}`));

  // Proses membuat deret sebanyak 10 angka
  let angkaSekarang = angkaAwal;
  const deret: number[] = [];
  for (let i = 0; i < 10; i++) {
    deret.push(angkaSekarang);
    angkaSekarang += beda;
  }

  console.log(chalk.green('Output: ' + deret.join(', ')));
  console.log(chalk.gray('(2 digit terakhir NIM = angka awal, digit ke-3 dari belakang + aturan 0/1 = beda)'));
}

// Fungsi bantu untuk cek apakah angka adalah bilangan prima
function isPrima(angka: number): boolean {
  if (angka <= 1) return false;
  for (let i = 2; i <= Math.sqrt(angka); i++) {
    if (angka % i === 0) return false;
  }
  return true;
}

// Soal 3: Menampilkan bilangan prima sampai (2 digit terakhir NIM + 10)
function buatBilanganPrima(nim: string): void {
  const batasAkhir = parseInt(nim.slice(-2)) + 10;

  console.log(chalk.blue(`Pencarian Bilangan Prima dari NIM ${nim}:`));
  console.log(chalk.yellow(`- Batas Akhir Pencarian: ${batasAkhir}`));

  const bilanganPrima: number[] = [];
  for (let i = 1; i <= batasAkhir; i++) {
    if (isPrima(i)) bilanganPrima.push(i);
  }

  console.log(chalk.green('Output: ' + bilanganPrima.join(', ')));
  console.log(chalk.gray('(Cari bilangan prima sampai 2 digit terakhir NIM + 10)'));
}

// =================== BAGIAN INTERAKTIF ===================

// Inisialisasi interface input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const soalList = ['Pola Segitiga', 'Deret Aritmatika', 'Bilangan Prima'];

// Menjalankan fungsi sesuai soal yang dipilih
function jalankanSoal(index: number, nim: string) {
  switch (index) {
    case 0:
      console.log(chalk.blue("\n================ SOAL 1 ================"));
      buatPolaSegitiga(nim);
      break;
    case 1:
      console.log(chalk.blue("\n================ SOAL 2 ================"));
      buatDeretAritmatika(nim);
      break;
    case 2:
      console.log(chalk.blue("\n================ SOAL 3 ================"));
      buatBilanganPrima(nim);
      break;
  }
}

// Menampilkan menu utama
function menu() {
  console.log(chalk.cyan('\n=== PILIH SOAL ==='));
  soalList.forEach((soal, i) => {
    console.log(chalk.magenta(`${i + 1}. ${soal}`));
  });
  console.log(chalk.red('4. Keluar'));

  rl.question(chalk.cyan('Masukkan pilihan (1-4): '), (pilihan) => {
    if (pilihan === '4') {
      console.log(chalk.white.bgGreen.bold('════════════════════════════════════════'));
      console.log(chalk.white.bgGreen.bold(' TERIMA KASIH! PROGRAM SELESAI! '));
      console.log(chalk.white.bgGreen.bold('════════════════════════════════════════'));
      rl.close();
      return;
    }

    const indexSoal = parseInt(pilihan) - 1;
    if (indexSoal < 0 || indexSoal > 2) {
      console.log(chalk.red('Pilihan tidak valid!'));
      return menu();
    }

    // Input NIM dengan validasi minimal 3 digit
    rl.question(chalk.cyan('Masukkan NIM (minimal 3 digit): '), (nim) => {
      if (nim.length < 3 || !/^\d+$/.test(nim)) {
        console.log(chalk.white.bgRed.bold(' !!! ERROR: NIM harus berupa angka dan minimal 3 digit !!! '));
        return menu();
      }

      jalankanSoal(indexSoal, nim);

      // Tanya apakah ingin lanjut atau keluar
      rl.question(chalk.yellow('\nLanjut soal berikutnya? (y/n): '), (jawab) => {
        if (jawab.toLowerCase() === 'y') {
          menu();
        } else {
          console.log(chalk.white.bgGreen.bold('════════════════════════════════════════'));
          console.log(chalk.white.bgGreen.bold(' TERIMA KASIH! PROGRAM SELESAI! '));
          console.log(chalk.white.bgGreen.bold('════════════════════════════════════════'));
          rl.close();
        }
      });
    });
  });
}

// Jalankan program
menu();
