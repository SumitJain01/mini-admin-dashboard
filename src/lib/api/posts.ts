import { apiClient } from './client';
import { Post } from '@/types';

export const postsApi = {
  getAll: (): Promise<Post[]> => apiClient.get<Post[]>('/posts'),
  getById: (id: number): Promise<Post> => apiClient.get<Post>(`/posts/${id}`),
  getByUserId: (userId: number): Promise<Post[]> => apiClient.get<Post[]>(`/posts?userId=${userId}`),
};
