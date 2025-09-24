import React, { useState } from 'react';
import { Sidebar } from '../Layout/Sidebar';
import { SpreadsheetViewer } from '../SpreadsheetView/SpreadsheetViewer';
import { UserManagement } from '../Admin/UserManagement';
import { Settings } from '../Admin/Settings';
import { appConfig } from '../../config/appConfig';
import { useAuth } from '../../contexts/AuthContext';
import { Menu } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState(() => {
    if (user?.role === 'admin') return 'barang_jasa';
    return user?.role === 'user' ? 'bun' : 'barang_jasa';
  });
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    if (activeView === 'users') {
      return <UserManagement />;
    }
    
    if (activeView === 'settings') {
      return <Settings />;
    }
    
    const spreadsheet = appConfig.spreadsheets[activeView];
    if (spreadsheet) {
      return (
        <SpreadsheetViewer
          spreadsheet={{
            id: activeView,
            ...spreadsheet
          }}
        />
      );
    }
    
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Halaman tidak ditemukan
          </h2>
          <p className="text-gray-600">
            Pilih menu dari sidebar untuk memulai.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 overflow-hidden">
        <div className="p-4 flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
        <main className="px-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};