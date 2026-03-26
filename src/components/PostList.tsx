"use client";
import React, { useEffect } from "react";
import { Post } from "@/types";
import { useUserStore } from "@/store/userStore";

const PostList = ({ initialPosts }: { initialPosts: Post[] }) => {
    const { posts, setPosts } = useUserStore();

    useEffect(() => {
        if (initialPosts) {
            setPosts(initialPosts);
        }
    }, [initialPosts, setPosts]);

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
