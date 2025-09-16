'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { usersApi } from '@/lib/api/users';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Building, Globe, MapPin, User } from 'lucide-react';
import { Loader2, AlertCircle } from 'lucide-react';
import { CustomHead } from '@/components/ui/head';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = parseInt(params.id as string);

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => usersApi.getById(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading user details...</span>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <CardTitle className="text-red-600">Error</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Failed to load user details. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <CustomHead 
        title="User Details | Mini Admin Dashboard" 
        description="View detailed user profile information" 
      />
      <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className=' text-gray-600'>Back</span>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600">User Profile Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="text-lg">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Username</label>
              <p className="text-lg">@{user.username}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <a 
                  href={`mailto:${user.email}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {user.email}
                </a>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <a 
                  href={`tel:${user.phone}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {user.phone}
                </a>
              </div>
            </div>
            {user.website && (
              <div>
                <label className="text-sm font-medium text-gray-500">Website</label>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <a 
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Street</label>
              <p className="text-lg">{user.address.street}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Suite</label>
              <p className="text-lg">{user.address.suite}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">City</label>
              <p className="text-lg">{user.address.city}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Zip Code</label>
              <p className="text-lg">{user.address.zipcode}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Coordinates</label>
              <p className="text-sm text-gray-600">
                Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Company Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Company Name</label>
                <p className="text-lg font-semibold">{user.company.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Catch Phrase</label>
                <p className="text-lg italic">"{user.company.catchPhrase}"</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Business</label>
                <p className="text-lg">{user.company.bs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
}
