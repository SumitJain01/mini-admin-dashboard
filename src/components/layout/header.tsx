'use client';

import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { LogOut, User, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="text-gray-900 lg:hidden p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <h1 className="text-lg lg:text-2xl font-bold text-gray-900 truncate">
              Mini Admin Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span className="truncate max-w-32">{user?.name || 'Admin'}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-1 lg:space-x-2"
            >
              <LogOut className="h-4 w-4 text-gray-500 hover:text-red-500 transition-colors" />
              <span className='text-sm text-gray-600 hidden sm:inline'>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
