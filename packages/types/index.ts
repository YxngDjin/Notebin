export type Snippet = {
    id: number
    title: string
    content: string
    language: string
    password?: string
    slug: string
    expiresAt: string | null,
    createdAt: string
}