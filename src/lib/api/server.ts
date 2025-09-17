import { apiClient } from './client';
import { User, Post } from '@/types';

// Server-side data fetching functions for SSR/SSG
export async function getUsers(): Promise<User[]> {
  try {
    return await apiClient.get<User[]>('/users');
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    return await apiClient.get<Post[]>('/posts');
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    return await apiClient.get<User>(`/users/${id}`);
  } catch (error) {
    console.error(`Failed to fetch user ${id}:`, error);
    return null;
  }
}

export async function getPostById(id: number): Promise<Post | null> {
  try {
    return await apiClient.get<Post>(`/posts/${id}`);
  } catch (error) {
    console.error(`Failed to fetch post ${id}:`, error);
    return null;
  }
}

export async function getPostsByUserId(userId: number): Promise<Post[]> {
  try {
    return await apiClient.get<Post[]>(`/posts?userId=${userId}`);
  } catch (error) {
    console.error(`Failed to fetch posts for user ${userId}:`, error);
    return [];
  }
}

// Dashboard statistics
export async function getDashboardStats() {
  try {
    const [users, posts] = await Promise.all([
      getUsers(),
      getPosts()
    ]);

    return {
      totalUsers: users.length,
      totalPosts: posts.length,
      activeSessions: 1, // Mock data
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return {
      totalUsers: 0,
      totalPosts: 0,
      activeSessions: 0,
    };
  }
}
