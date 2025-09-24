# Tutorial Hosting Gratis untuk Aplikasi Barang dan Jasa

## Persiapan Aplikasi untuk Hosting

Sebelum melakukan hosting, pastikan aplikasi sudah siap dengan mengikuti langkah-langkah berikut:

1. **Build Aplikasi untuk Production**
   ```bash
   npm run build
   ```
   Perintah ini akan menghasilkan folder `dist` yang berisi file statis aplikasi.

2. **Pastikan Konfigurasi Database**
   - Ubah konfigurasi database di `src/config/dbConfig.ts` untuk menggunakan variabel lingkungan
   - Tambahkan file `.env.example` sebagai contoh konfigurasi

## Opsi Hosting Gratis

### 1. Vercel (Frontend)

Vercel adalah platform hosting gratis yang sangat cocok untuk aplikasi React:

1. **Daftar Akun Vercel**
   - Kunjungi [vercel.com](https://vercel.com) dan daftar dengan GitHub/GitLab/BitBucket

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy Aplikasi**
   ```bash
   vercel login
   vercel
   ```

4. **Konfigurasi untuk Single Page Application**
   - Buat file `vercel.json` di root project:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

### 2. Railway (Backend + Database)

Railway menawarkan tier gratis untuk hosting backend dan database:

1. **Daftar Akun Railway**
   - Kunjungi [railway.app](https://railway.app) dan daftar dengan GitHub

2. **Deploy Database MySQL**
   - Buat project baru di Railway
   - Tambahkan MySQL database
   - Catat kredensial database yang diberikan

3. **Deploy Backend**
   - Hubungkan repository GitHub Anda
   - Atur variabel lingkungan untuk koneksi database
   - Tambahkan build command: `npm run build`
   - Tambahkan start command: `npm start`

### 3. Render (Full Stack)

Render menawarkan hosting gratis untuk aplikasi web dan database:

1. **Daftar Akun Render**
   - Kunjungi [render.com](https://render.com) dan daftar

2. **Deploy Web Service**
   - Buat Web Service baru
   - Hubungkan dengan repository GitHub
   - Atur build command: `npm install && npm run build`
   - Atur start command: `npm start`

3. **Deploy Database**
   - Buat PostgreSQL database (gratis)
   - Catat kredensial database
   - Perbarui konfigurasi aplikasi untuk menggunakan PostgreSQL

## Menghubungkan Frontend dan Backend

1. **Konfigurasi CORS**
   - Pastikan backend mengizinkan request dari domain frontend

2. **Konfigurasi API URL**
   - Gunakan variabel lingkungan untuk URL API di frontend
   - Contoh: `VITE_API_URL=https://api-url.railway.app`

## Migrasi Database

1. **Export Skema Database**
   ```bash
   mysqldump -u root -p --no-data app_barang_jasa > schema.sql
   ```

2. **Export Data**
   ```bash
   mysqldump -u root -p --no-create-info app_barang_jasa > data.sql
   ```

3. **Import ke Database Hosting**
   - Gunakan fitur import di platform hosting atau
   - Gunakan MySQL client untuk connect ke database hosting

## Tips Tambahan

1. **Gunakan Environment Variables**
   - Jangan hardcode kredensial database atau API keys
   - Gunakan `.env` file untuk development
   - Atur environment variables di platform hosting

2. **Aktifkan HTTPS**
   - Pastikan aplikasi menggunakan HTTPS untuk keamanan
   - Kebanyakan platform hosting menyediakan SSL gratis

3. **Setup Custom Domain (Opsional)**
   - Jika memiliki domain sendiri, hubungkan dengan aplikasi
   - Ikuti panduan platform hosting untuk setup DNS

4. **Monitoring**
   - Gunakan layanan gratis seperti UptimeRobot untuk memantau aplikasi

## Troubleshooting

1. **Masalah CORS**
   - Periksa konfigurasi CORS di backend
   - Pastikan domain frontend diizinkan

2. **Database Connection Issues**
   - Periksa string koneksi database
   - Pastikan IP address diizinkan di firewall database

3. **Build Errors**
   - Periksa log build di platform hosting
   - Pastikan semua dependencies terinstall

4. **Runtime Errors**
   - Periksa log aplikasi di platform hosting
   - Implementasikan error logging yang lebih baik

---

Dengan mengikuti panduan ini, aplikasi Barang dan Jasa dapat di-hosting secara gratis dan dapat diakses secara online. Pilih platform yang paling sesuai dengan kebutuhan Anda atau kombinasikan beberapa platform untuk mendapatkan hasil terbaik.