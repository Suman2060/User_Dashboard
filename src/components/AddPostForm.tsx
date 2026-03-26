"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/store/userStore";
import { Post } from "@/types";

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  body: z.string().min(10, "Post must be at least 10 characters"),
});

type PostFormData = z.infer<typeof postSchema>;

const AddPostForm = ({ userId }: { userId: number }) => {
  const { addPost } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    const newPost: Post = {
      id: Math.floor(Math.random() * 10000) + 100,
      userId: userId,
      title: data.title,
      body: data.body,
    };

    addPost(newPost);

    const existingPosts = JSON.parse(localStorage.getItem("localPosts") || "[]");
    localStorage.setItem("localPosts", JSON.stringify([newPost, ...existingPosts]));

    reset();
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 mb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 dark:bg-slate-700 rounded-lg text-blue-600 dark:text-blue-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Create New Post</h2>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Title</label>
          <input
            {...register("title")}
            className={`w-full p-4 bg-slate-50 dark:bg-slate-900/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all ${
              errors.title ? "border-red-300 focus:ring-red-500" : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
            placeholder="Give it a catchy title..."
          />
          {errors.title && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {errors.title.message}
          </p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Content</label>
          <textarea
            {...register("body")}
            rows={4}
            className={`w-full p-4 bg-slate-50 dark:bg-slate-900/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all resize-none ${
              errors.body ? "border-red-300 focus:ring-red-500" : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
            placeholder="What's on your mind?"
          />
          {errors.body && <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {errors.body.message}
          </p>}
        </div>
        
        <div className="pt-2 text-right">
            <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-md shadow-slate-900/10"
            >
            {isSubmitting ? (
                <>
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                Publishing...
                </>
            ) : (
                <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Publish Post
                </>
            )}
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
