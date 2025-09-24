import mysql from 'mysql2/promise';

// Konfigurasi koneksi database MySQL
export const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app_barang_jasa',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306
};

// Pool koneksi untuk digunakan di seluruh aplikasi
export const pool = mysql.createPool(dbConfig);

// Fungsi untuk menguji koneksi database
export const testConnection = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};