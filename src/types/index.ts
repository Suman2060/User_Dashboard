export type User = {
    id: number
    name: string
    email: string
    company: { name: string }
}

export type Post = {
    id: number
    userId: number
    title: string
    body: string
}