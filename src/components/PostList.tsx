"use client";
import React, { useEffect, useState } from "react";
import { Post } from "@/types";
import { useUserStore } from "@/store/userStore";

const PostList = ({ initialPosts, userId }: { initialPosts: Post[], userId: number }) => {
    const { posts, setPosts } = useUserStore();


    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        if (initialPosts) {
            const localPosts: Post[] = JSON.parse(localStorage.getItem("localPosts") || "[]");
            const thisUserAddedPosts = localPosts.filter(post => post.userId === userId);
            setPosts([...thisUserAddedPosts, ...initialPosts]);
        }
    }, [initialPosts, setPosts, userId]);


    useEffect(() => {
        setCurrentPage(1);
    }, [posts.length]);


    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, Math.min(indexOfLastPost, posts.length));
    const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
            {currentPosts.map((post) => (
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


            {posts.length > postsPerPage && (
                <div className="flex items-center justify-between pt-8 pb-4">
                    <p className="text-sm text-slate-500 font-medium">
                        Showing <span className="font-bold text-slate-700 dark:text-slate-300">{indexOfFirstPost + 1}</span> to <span className="font-bold text-slate-700 dark:text-slate-300">{Math.min(indexOfLastPost, posts.length)}</span> of <span className="font-bold text-slate-700 dark:text-slate-300">{posts.length}</span> Results
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                        >
                            Previous
                        </button>

                        <div className="flex items-center gap-1 font-medium text-slate-600 dark:text-slate-400 mx-2">
                            Page {currentPage} of {totalPages}
                        </div>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostList;
