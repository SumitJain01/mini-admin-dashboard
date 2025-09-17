import { getPosts, getUsers } from '@/lib/api/server';
import { Metadata } from 'next';
import { PostsClient } from './posts-client';

export const metadata: Metadata = {
  title: 'Posts | Mini Admin Dashboard',
  description: 'Browse and manage posts in the admin dashboard',
};

// Enable ISR (Incremental Static Regeneration) - revalidate every 60 seconds
export const revalidate = 60;

// This function runs at build time for SSG
export default async function PostsPage() {
  const [posts, users] = await Promise.all([
    getPosts(),
    getUsers()
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Posts</h1>
        <p className="text-gray-600">
          Browse and manage posts ({posts.length} posts)
        </p>
      </div>

      <PostsClient initialPosts={posts} initialUsers={users} />
    </div>
  );
}
