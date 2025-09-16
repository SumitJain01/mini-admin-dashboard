import { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Building, Globe } from 'lucide-react';

interface UsersTableProps {
  users: User[];
  onUserClick?: (user: User) => void;
}

export function UsersTable({ users, onUserClick }: UsersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900">Name</th>
                <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 hidden sm:table-cell">Email</th>
                <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 hidden lg:table-cell">Phone</th>
                <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 hidden md:table-cell">Company</th>
                <th className="text-left py-3 px-2 lg:px-4 font-medium text-gray-900 hidden lg:table-cell">Website</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr 
                  key={user.id} 
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => onUserClick?.(user)}
                >
                  <td className="py-3 px-2 lg:px-4">
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">@{user.username}</div>
                      {/* Show email on mobile */}
                      <div className="sm:hidden flex items-center space-x-1 mt-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600 truncate">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 lg:px-4 hidden sm:table-cell">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 lg:px-4 hidden lg:table-cell">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 lg:px-4 hidden md:table-cell">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{user.company.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 lg:px-4 hidden lg:table-cell">
                    {user.website ? (
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <a 
                          href={`https://${user.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {user.website}
                        </a>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
