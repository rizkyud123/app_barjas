import { testConnection } from '../config/dbConfig';

// Fungsi untuk menguji koneksi database
export const testDbConnection = async (): Promise<boolean> => {
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      console.log('Koneksi database berhasil!');
    } else {
      console.error('Koneksi database gagal!');
    }
    return isConnected;
  } catch (error) {
    console.error('Error saat menguji koneksi database:', error);
    return false;
  }
};

// Jalankan tes koneksi
testDbConnection();