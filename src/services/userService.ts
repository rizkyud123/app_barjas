import { userApi } from './apiService';

export interface User {
  id?: number;
  username: string;
  password?: string;
  full_name: string;
  email?: string;
  role: string;
  department?: string;
}

export const userService = {
  // Mendapatkan semua pengguna
  async getAllUsers(): Promise<User[]> {
    return userApi.getAllUsers();
  },

  // Mendapatkan pengguna berdasarkan username
  async getUserByUsername(username: string): Promise<User | null> {
    return userApi.getUserByUsername(username);
  },

  // Membuat pengguna baru
  async createUser(user: User): Promise<number> {
    return userApi.createUser(user);
  },

  // Memperbarui pengguna
  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    // Implementasi akan ditambahkan nanti
    console.log('Update user:', id, user);
    return true;
  },

  // Menghapus pengguna
  async deleteUser(id: number): Promise<boolean> {
    // Implementasi akan ditambahkan nanti
    console.log('Delete user:', id);
    return true;
  },

  // Mengubah password pengguna
  async changePassword(id: number): Promise<boolean> {
    // Implementasi akan ditambahkan nanti
    console.log('Change password for user:', id);
    return true;
  }
};