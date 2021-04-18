import { Post } from './Post';

export interface Sub {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    title: string
    description: string
    imageUrn: string
    bannerUrn: string
    userId: number
    posts: Post[]
    user: {
        id: number
        createdAt: string
        updatedAt: string
        email: string
        firstName: string
        lastName: string
        nick: string
    }
    // Virtuals
    imageUrl: string
    bannerUrl: string
  }