import { Post } from "@/types"
import { BASE_URL } from "./api"

export async function getPostsByUserId(userId: string): Promise<Post[]> {
    const res = await fetch(`${BASE_URL}/posts?userId=${userId}`)
    if (!res.ok) {
        throw new Error("Failed to fetch posts")
    }

    return res.json()
}