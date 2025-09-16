import { apiClient } from './client';
import { User } from '@/types';

export const usersApi = {
  getAll: (): Promise<User[]> => apiClient.get<User[]>('/users'),
  getById: (id: number): Promise<User> => apiClient.get<User>(`/users/${id}`),
};
