'use client';

import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Mini Admin Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user?.name || 'Admin'}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
     <LogOut className="h-4 w-4 text-gray-500 hover:text-red-500 transition-colors" />
              <span className='text-sm text-gray-600'>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
