"use client";
import React, { useEffect } from "react";
import { Post } from "@/types";
import { useUserStore } from "@/store/userStore";

const PostList = ({ initialPosts, userId }: { initialPosts: Post[], userId: number }) => {
    const { posts, setPosts } = useUserStore();

    useEffect(() => {
        if (initialPosts) {
            // Retrieve previously added posts from local storage
            const localPosts: Post[] = JSON.parse(localStorage.getItem("localPosts") || "[]");
            // Filter to only include posts added by THIS user
            const thisUserAddedPosts = localPosts.filter(post => post.userId === userId);
            
            // Set store to both local posts + API posts
            setPosts([...thisUserAddedPosts, ...initialPosts]);
        }
    }, [initialPosts, setPosts, userId]);

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <article key={post.id} className="p-6 bg-white rounded-xl shadow-sm border">
                    <h2 className="text-xl font-bold mb-3 capitalize">{post.title}</h2>
                    <p className="text-gray-600">{post.body}</p>
                </article>
            ))}
        </div>
    );
};

export default PostList;

