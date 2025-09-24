import React from 'react';
import { FileSpreadsheet, Users, Settings, BarChart3, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { appConfig } from '../../config/appConfig';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, toggleSidebar }) => {
  const { user } = useAuth();
  const userAccess = user ? appConfig.roles[user.role].access : [];

  const menuItems = [
    { id: 'barang_jasa', label: 'Barang dan Jasa', icon: FileSpreadsheet },
    { id: 'perubahan', label: 'Perubahan', icon: FileSpreadsheet },
    { id: 'psp', label: 'PSP', icon: FileSpreadsheet },
    { id: 'tph', label: 'TPH', icon: FileSpreadsheet },
    { id: 'nak', label: 'NAK', icon: FileSpreadsheet },
    { id: 'bun', label: 'BUN', icon: FileSpreadsheet },
    { id: 'analisa', label: 'Analisa', icon: BarChart3 },
  ];

  const adminMenuItems = [
    { id: 'users', label: 'Kelola Pengguna', icon: Users },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} transform transition-transform duration-300 ease-in-out fixed md:relative z-30 h-screen bg-white shadow-lg border-r border-gray-200 w-64`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          Menu
        </h2>
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      <nav className="mt-2">
        <div className="px-4 mb-4">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Spreadsheet
          </h2>
        </div>
        
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasAccess = userAccess.includes(item.id);
            
            if (!hasAccess) return null;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left transition-all ${
                  activeView === item.id
                    ? 'bg-green-50 text-green-700 border-r-4 border-green-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {user?.role === 'admin' && (
          <>
            <div className="px-4 mt-8 mb-4">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Administrasi
              </h2>
            </div>
            
            <div className="space-y-1">
              {adminMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-left transition-all ${
                      activeView === item.id
                        ? 'bg-green-50 text-green-700 border-r-4 border-green-500'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </nav>
    </aside>
  );
};