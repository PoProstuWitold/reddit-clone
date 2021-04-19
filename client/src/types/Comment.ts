import { Post } from './Post';

export interface Comment {
    id: number
    createdAt: string
    updatedAt: string
    identifier: string
    body: string
    userId: number
    post?: Post
    user: {
        id: number
        createdAt: string
        updatedAt: string
        nick: string
    }
    // Virtuals
    userVote: number
    voteScore: number
}