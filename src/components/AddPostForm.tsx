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
      id: Math.floor(Math.random() * 10000) + 100, // Mock id
      userId: userId,
      title: data.title,
      body: data.body,
    };

    // Update global state immediately
    addPost(newPost);

    // Save to Local Storage correctly
    const existingPosts = JSON.parse(localStorage.getItem("localPosts") || "[]");
    localStorage.setItem("localPosts", JSON.stringify([newPost, ...existingPosts]));

    // Reset form fields
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Create New Post</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            {...register("title")}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Post Title..."
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            {...register("body")}
            rows={4}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.body ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
            }`}
            placeholder="Write something cool..."
          />
          {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
