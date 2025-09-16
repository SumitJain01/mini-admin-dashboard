'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { postsApi } from '@/lib/api/posts';
import { usersApi } from '@/lib/api/users';
import { PostCard } from '@/components/features/posts/post-card';
import { PostModal } from '@/components/features/posts/post-modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Loader2, AlertCircle } from 'lucide-react';
import { debounce } from '@/lib/utils';
import { Post, User } from '@/types';
import { CustomHead } from '@/components/ui/head';

export default function PostsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage] = useState(9);
  
  const { data: posts = [], isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['posts'],
    queryFn: postsApi.getAll,
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: usersApi.getAll,
  });

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 300),
    []
  );

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedUserId) {
      filtered = filtered.filter(post => post.userId === selectedUserId);
    }

    return filtered;
  }, [posts, searchTerm, selectedUserId]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleUserFilter = (userId: number | null) => {
    setSelectedUserId(userId);
    setCurrentPage(1);
  };

  if (postsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading posts...</span>
        </div>
      </div>
    );
  }

  if (postsError) {
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
              Failed to load posts. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <CustomHead 
        title="Posts | Mini Admin Dashboard" 
        description="Browse and manage posts in the admin dashboard" 
      />
      <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
        <p className="text-gray-600">
          Browse and manage posts ({filteredPosts.length} posts)
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search posts by title or content..."
            onChange={(e) => debouncedSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={selectedUserId || ''}
            onChange={(e) => handleUserFilter(e.target.value ? parseInt(e.target.value) : null)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Users</option>
            {users.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedUserId && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filtered by:</span>
          <span className="text-sm font-medium">
            {users.find((user: User) => user.id === selectedUserId)?.name}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUserFilter(null)}
            className="text-red-600 hover:text-red-800"
          >
            Clear filter
          </Button>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <p className="text-gray-500">No posts found matching your criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onViewDetails={handlePostClick}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      <PostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      </div>
    </>
  );
}
