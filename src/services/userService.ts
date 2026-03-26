import { User } from "@/types";
import { BASE_URL } from "./api";


async function getUsers(): Promise<User[]> {
    const res = await fetch(`${BASE_URL}/users`)

    if (!res.ok) {
        throw new Error("Failed to Fetch data")
    }

    return await res.json()

}

export default getUsers