"use client";
import React, { useEffect } from "react";
import { Post } from "@/types";
import { useUserStore } from "@/store/userStore";

const PostList = ({ initialPosts, userId }: { initialPosts: Post[], userId: number }) => {
    const { posts, setPosts } = useUserStore();

    useEffect(() => {
        if (initialPosts) {
            const localPosts: Post[] = JSON.parse(localStorage.getItem("localPosts") || "[]");
            const thisUserAddedPosts = localPosts.filter(post => post.userId === userId);
            setPosts([...thisUserAddedPosts, ...initialPosts]);
        }
    }, [initialPosts, setPosts, userId]);

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
            {posts.map((post) => (
                <article 
                    key={post.id} 
                    className="p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md transition-shadow group relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-2 h-full bg-slate-100 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors"></div>
                    <div className="pl-4">
                        <h2 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white capitalize leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                            {post.body}
                        </p>
                    </div>
                </article>
            ))}
            
            {posts.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-600">
                    <p className="text-slate-400 font-medium text-lg">No posts available.</p>
                </div>
            )}
        </div>
    );
};

export default PostList;
