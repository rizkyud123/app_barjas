import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { appConfig } from '../../config/appConfig';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img 
              src="/GKL12_lombok barat - Koleksilogo.com.jpg"
              alt="Logo Lombok Barat"
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold leading-tight">
                {appConfig.app_name}
              </h1>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-full">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.fullName}</span>
                <span className="text-xs bg-green-800 px-2 py-0.5 rounded-full">
                  {user.role.toUpperCase()}
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-1 hover:bg-green-600 px-3 py-2 rounded-md transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};