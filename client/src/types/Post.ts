import { Sub } from "./Sub";

export interface Post {
    identifier: string
    title: string
    body?: string
    slug: string
    subName: string
    user: {
        id: number
        createdAt: string
        updatedAt: string
        email: string
        firstName: string
        lastName: string
        nick: string
    }
    createdAt: string
    updatedAt: string
    sub?: Sub
    // Virtual fields
    url: string
    voteScore?: number
    commentCount?: number
    userVote?: number
}