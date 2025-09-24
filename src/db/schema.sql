-- Membuat database jika belum ada
CREATE DATABASE IF NOT EXISTS app_barang_jasa;

USE app_barang_jasa;

-- Tabel pengguna
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  role ENUM('admin', 'user', 'viewer') NOT NULL DEFAULT 'user',
  department VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Menambahkan pengguna admin default
INSERT INTO users (username, password, full_name, email, role)
VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrator', 'admin@example.com', 'admin')
ON DUPLICATE KEY UPDATE username = username;
-- Catatan: Password default adalah 'password' (sudah di-hash)

-- Tabel pengaturan untuk menyimpan konfigurasi aplikasi
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(50) NOT NULL UNIQUE,
  setting_value TEXT,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Menambahkan pengaturan default untuk spreadsheet
INSERT INTO settings (setting_key, setting_value, description)
VALUES ('spreadsheet_url', 'https://docs.google.com/spreadsheets/d/1example/edit', 'URL spreadsheet default')
ON DUPLICATE KEY UPDATE setting_key = setting_key;