import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Link, Save, Loader2, AlertCircle } from 'lucide-react';
import { appConfig } from '../../config/appConfig';
import * as settingsService from '../../services/settingsService';

export const Settings: React.FC = () => {
  const [links, setLinks] = useState(appConfig.spreadsheets);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpreadsheetUrl = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = await settingsService.getSpreadsheetUrl();
        if (url) {
          // Update the first spreadsheet with the URL from database
          setLinks(prev => ({
            ...prev,
            barang_jasa: { ...prev.barang_jasa, url }
          }));
        }
      } catch (err) {
        console.error('Error fetching spreadsheet URL:', err);
        setError('Gagal memuat URL spreadsheet dari database');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpreadsheetUrl();
  }, []);

  const handleLinkChange = (id: string, url: string) => {
    setLinks(prev => ({
      ...prev,
      [id]: { ...prev[id], url }
    }));
    setHasChanges(true);
    setSuccess(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Simpan URL spreadsheet utama ke database
      const mainSpreadsheetUrl = links.barang_jasa.url;
      await settingsService.saveSpreadsheetUrl(mainSpreadsheetUrl);
      
      setHasChanges(false);
      setSuccess('Perubahan berhasil disimpan!');
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Gagal menyimpan pengaturan');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SettingsIcon className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        </div>
        
        {hasChanges && (
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        )}
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
          <Save className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Link className="h-6 w-6 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">Kelola Link Spreadsheet</h2>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
            <span className="ml-3 text-gray-600">Memuat pengaturan...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(links).map(([id, spreadsheet]) => (
              <div key={id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{spreadsheet.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      spreadsheet.embed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {spreadsheet.embed ? 'Embed' : 'Link Only'}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      spreadsheet.download ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {spreadsheet.download ? 'Download' : 'View Only'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    URL Spreadsheet {id === 'barang_jasa' && <span className="text-green-600 text-xs">(Disimpan di database)</span>}
                  </label>
                  <input
                    type="url"
                    value={spreadsheet.url}
                    onChange={(e) => handleLinkChange(id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Catatan: Hanya URL spreadsheet "Barang dan Jasa" yang disimpan ke database. URL lainnya hanya tersimpan sementara di sesi ini.</p>
      </div>
    </div>
  );
};