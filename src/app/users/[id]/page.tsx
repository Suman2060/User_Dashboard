import { getPostsByUserId } from "@/services/postServices";
import PostList from "@/components/PostList";
import Link from "next/link";
import AddPostForm from "@/components/AddPostForm";

export default async function UserPostsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const initialPosts = await getPostsByUserId(id);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 transition-colors duration-500">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link
                    href="/users"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 font-medium transition-all mb-8 shadow-sm group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Directory
                </Link>

                <header className="mb-10 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="w-20 h-20 shrink-0 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-inner flex items-center justify-center text-white font-black text-3xl">
                            U{id}
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white capitalize tracking-tight mb-2">
                                Activity Feed
                            </h1>
                            <p className="text-slate-500 font-medium text-lg">
                                Viewing all the incredible things User {id} has been posting recently.
                            </p>
                        </div>
                    </div>
                </header>

                <AddPostForm userId={Number(id)} />

                <div className="mt-12 mb-6 flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex-1">Published Posts</h2>
                    <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1 ml-4 hidden sm:block"></div>
                </div>

                <PostList initialPosts={initialPosts} userId={Number(id)} />
            </div>
        </main>
    );
}