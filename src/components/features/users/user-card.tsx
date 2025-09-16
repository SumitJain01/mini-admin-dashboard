import { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Building, Globe } from 'lucide-react';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-lg">{user.name}</CardTitle>
        <p className="text-sm text-gray-600">@{user.username}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="h-4 w-4" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Building className="h-4 w-4" />
          <span className="truncate">{user.company.name}</span>
        </div>
        {user.website && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            <a 
              href={`https://${user.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 truncate"
            >
              {user.website}
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
