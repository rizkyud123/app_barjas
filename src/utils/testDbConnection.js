const mysql = require('mysql2/promise');

// Konfigurasi koneksi database MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app_barang_jasa',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306
};

// Pool koneksi
const pool = mysql.createPool(dbConfig);

// Fungsi untuk menguji koneksi database
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('Koneksi database berhasil!');
    return true;
  } catch (error) {
    console.error('Koneksi database gagal:', error);
    return false;
  }
}

// Jalankan tes koneksi
(async () => {
  await testConnection();
})();