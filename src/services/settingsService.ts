import { settingsApi } from './apiService';

export interface Setting {
  id?: number;
  setting_key: string;
  setting_value: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Mendapatkan semua pengaturan
export const getAllSettings = async (): Promise<Setting[]> => {
  // Implementasi sederhana untuk browser
  const spreadsheetUrl = await getSpreadsheetUrl();
  return [
    {
      id: 1,
      setting_key: 'spreadsheet_url',
      setting_value: spreadsheetUrl,
      description: 'URL spreadsheet default'
    }
  ];
};

// Mendapatkan pengaturan berdasarkan key
export const getSettingByKey = async (key: string): Promise<Setting | null> => {
  return settingsApi.getSettingByKey(key);
};

// Mendapatkan URL spreadsheet
export const getSpreadsheetUrl = async (): Promise<string> => {
  try {
    const setting = await settingsApi.getSettingByKey('spreadsheet_url');
    return setting ? setting.setting_value : '';
  } catch (error) {
    console.error('Error getting spreadsheet URL:', error);
    return '';
  }
};

// Menyimpan atau memperbarui pengaturan
export const saveSetting = async (setting: Setting): Promise<Setting> => {
  return settingsApi.saveSetting(setting);
};

// Menghapus pengaturan
export const deleteSetting = async (key: string): Promise<boolean> => {
  // Implementasi sederhana untuk browser
  console.log('Delete setting:', key);
  return true;
};

// Menyimpan URL spreadsheet ke pengaturan
export const saveSpreadsheetUrl = async (url: string): Promise<boolean> => {
  try {
    await saveSetting({
      setting_key: 'spreadsheet_url',
      setting_value: url,
      description: 'URL spreadsheet default'
    });
    return true;
  } catch (error) {
    console.error('Error saving spreadsheet URL:', error);
    return false;
  }
};