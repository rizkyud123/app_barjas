// apiService.ts - Service wrapper untuk API calls
// File ini berfungsi sebagai penghubung antara frontend dan backend
// Menghindari penggunaan langsung modul mysql di browser

interface User {
  id?: number;
  username: string;
  password?: string;
  full_name: string;
  email?: string;
  role: string;
  department?: string;
}

interface Setting {
  id?: number;
  setting_key: string;
  setting_value: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Mock data untuk development di browser
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    full_name: 'Administrator',
    email: 'admin@example.com',
    role: 'admin',
    department: 'IT',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    username: 'user',
    full_name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    department: 'Finance',
    createdAt: new Date().toISOString()
  }
];

const mockSettings = {
  spreadsheet_url: 'https://docs.google.com/spreadsheets/d/1KQ-yiIRVO1ry5LrPxGLuHxVwI8Lf8w7d_-nZolL3caM/edit?usp=drive_link'
};

// User Service API
export const userApi = {
  // Mendapatkan semua pengguna
  async getAllUsers(): Promise<User[]> {
    // Di browser, gunakan mock data
    if (typeof window !== 'undefined') {
      return Promise.resolve(mockUsers);
    }
    
    // Di server, gunakan database (kode ini tidak akan dijalankan di browser)
    try {
      // Kode ini hanya akan dijalankan di server
      const { pool } = await import('../config/dbConfig');
      const [rows] = await pool.query('SELECT id, username, full_name, email, role, department FROM users');
      return rows as User[];
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  },

  // Mendapatkan pengguna berdasarkan username
  async getUserByUsername(username: string): Promise<User | null> {
    // Di browser, gunakan mock data
    if (typeof window !== 'undefined') {
      const user = mockUsers.find(u => u.username === username);
      return Promise.resolve(user || null);
    }
    
    // Di server, gunakan database
    try {
      const { pool } = await import('../config/dbConfig');
      const [rows]: any = await pool.query(
        'SELECT id, username, password, full_name, email, role, department FROM users WHERE username = ?',
        [username]
      );
      
      return rows.length > 0 ? rows[0] as User : null;
    } catch (error) {
      console.error('Error getting user by username:', error);
      throw error;
    }
  },

  // Membuat pengguna baru
  async createUser(user: User): Promise<number> {
    // Di browser, simulasikan pembuatan user
    if (typeof window !== 'undefined') {
      console.log('Creating user (mock):', user);
      // Tambahkan user baru ke mockUsers untuk simulasi di browser
      const newId = mockUsers.length > 0 ? Math.max(...mockUsers.map(u => Number(u.id))) + 1 : 1;
      mockUsers.push({
        id: newId,
        username: user.username,
        full_name: user.full_name,
        email: user.email || '',
        role: user.role,
        department: user.department || '',
        createdAt: new Date().toISOString()
      });
      return Promise.resolve(newId);
    }
    
    // Di server, gunakan database
    try {
      const { pool } = await import('../config/dbConfig');
      const [result]: any = await pool.query(
        'INSERT INTO users (username, password, full_name, email, role, department) VALUES (?, ?, ?, ?, ?, ?)',
        [user.username, user.password, user.full_name, user.email, user.role, user.department]
      );
      
      return result.insertId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
};

// Settings Service API
export const settingsApi = {
  // Mendapatkan pengaturan berdasarkan key
  async getSettingByKey(key: string): Promise<Setting | null> {
    // Di browser, gunakan mock data
    if (typeof window !== 'undefined') {
      if (key === 'spreadsheet_url') {
        return Promise.resolve({
          id: 1,
          setting_key: key,
          setting_value: mockSettings.spreadsheet_url,
          description: 'URL spreadsheet default'
        });
      }
      return Promise.resolve(null);
    }
    
    // Di server, gunakan database
    try {
      const { pool } = await import('../config/dbConfig');
      const [rows] = await pool.query('SELECT * FROM settings WHERE setting_key = ?', [key]);
      const settings = rows as Setting[];
      return settings.length > 0 ? settings[0] : null;
    } catch (error) {
      console.error(`Error getting setting with key ${key}:`, error);
      throw error;
    }
  },

  // Mendapatkan URL spreadsheet
  async getSpreadsheetUrl(): Promise<string> {
    // Di browser, gunakan mock data
    if (typeof window !== 'undefined') {
      return Promise.resolve(mockSettings.spreadsheet_url);
    }
    
    // Di server, gunakan database
    try {
      const setting = await this.getSettingByKey('spreadsheet_url');
      return setting?.setting_value || '';
    } catch (error) {
      console.error('Error getting spreadsheet URL:', error);
      throw error;
    }
  },

  // Menyimpan atau memperbarui pengaturan
  async saveSetting(setting: Setting): Promise<Setting> {
    // Di browser, simulasikan penyimpanan
    if (typeof window !== 'undefined') {
      console.log('Saving setting (mock):', setting);
      if (setting.setting_key === 'spreadsheet_url') {
        mockSettings.spreadsheet_url = setting.setting_value;
      }
      return Promise.resolve({
        id: 1,
        ...setting
      });
    }
    
    // Di server, gunakan database
    try {
      const { pool } = await import('../config/dbConfig');
      const { setting_key, setting_value, description } = setting;
      
      // Cek apakah pengaturan sudah ada
      const existingSetting = await this.getSettingByKey(setting_key);
      
      if (existingSetting) {
        // Update pengaturan yang sudah ada
        await pool.query(
          'UPDATE settings SET setting_value = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE setting_key = ?',
          [setting_value, description, setting_key]
        );
      } else {
        // Tambah pengaturan baru
        await pool.query(
          'INSERT INTO settings (setting_key, setting_value, description) VALUES (?, ?, ?)',
          [setting_key, setting_value, description]
        );
      }
      
      // Ambil pengaturan yang baru disimpan
      const updatedSetting = await this.getSettingByKey(setting_key);
      return updatedSetting as Setting;
    } catch (error) {
      console.error('Error saving setting:', error);
      throw error;
    }
  }
};