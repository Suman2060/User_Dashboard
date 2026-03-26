import { getPostsByUserId } from "@/services/postServices";
import PostList from "@/components/PostList";
import Link from "next/link";

export default async function UserPostsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const initialPosts = await getPostsByUserId(id);

    return (
        <main className="container mx-auto p-6 max-w-4xl">
            <header className="mb-8">
                <Link 
                    href="/users" 
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4 transition-colors font-medium"
                >
                    ← Back to User List
                </Link>
                <h1 className="text-3xl font-extrabold text-gray-900 capitalize">
                    User {id}'s Posts
                </h1>
                <p className="text-gray-500 mt-2">
                    Viewing all posts for this specific user.
                </p>
            </header>

            <PostList initialPosts={initialPosts} />
        </main>
    );
}