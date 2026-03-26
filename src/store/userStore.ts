import { create } from 'zustand';
import { Post, User } from '@/types';

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  searchTerm: string; 
  setSearchTerm: (term: string) => void;
  apiIsLoading: boolean;
  setLoading: (loading: boolean) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (newPost: Post) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users, apiIsLoading: false }),
  searchTerm: "",
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  apiIsLoading: false,
  setLoading: (apiIsLoading) => set({ apiIsLoading }),
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (newPost) => set((state) => ({
    posts: [newPost, ...state.posts]
  }))
}));
