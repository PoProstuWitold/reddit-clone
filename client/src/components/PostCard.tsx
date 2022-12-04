import React from 'react'
import axios from 'axios'
import { Post } from '../types'
import classNames from 'classnames'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ActionButton } from './ActionButton'
import { useAuthState } from '../context/auth'
import { useRouter } from 'next/router'
dayjs.extend(relativeTime)
interface PostCardProps {
    post: Post
    revalidate?: Function
}

export const PostCard: React.FC<PostCardProps> = ({
    post: {
        identifier,
        slug,
        title,
        body,
        subName,
        createdAt,
        voteScore,
        userVote,
        commentCount,
        url,
        sub,
        user: {
            nick
        }
    },
    revalidate
}: PostCardProps) => {
    const { authenticated } = useAuthState()

    const router = useRouter()
    const isInSubPage = router.pathname === '/r/[sub]'

    const vote = async (value: number) => {
        if (!authenticated) router.push('/login')
        // if vote is the same reset vote
        if (value === userVote) value = 0

        try {
            const res = await axios.post('/vote', {
                postIdentifier: identifier,
                slug,
                value,
            })
            if (revalidate) revalidate()
            console.log(res.data)
            console.log(sub)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div key={identifier} className="flex mb-4 bg-white rounded" id={identifier}>
                {/* Vote section */}
                <div className="w-10 py-3 text-center bg-gray-200 rounded-l">
                    {/* Upvote */}
                    <div
                        className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                        onClick={() => vote(1)}
                    >
                    <i
                        className={classNames('icon-arrow-up', {
                        'text-red-500': userVote === 1,
                        })}
                    ></i>
                    </div>
                    <p className="text-xs font-bold">{voteScore}</p>
                    {/* Downvote */}
                    <div
                        className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
                        onClick={() => vote(-1)}
                    >
                    <i
                        className={classNames('icon-arrow-down', {
                        'text-blue-600': userVote === -1,
                        })}
                    ></i>
                    </div>
                </div>
                {/* Post data section */}
                <div className="w-full p-2">
                    <div className="flex items-center">
                    {!isInSubPage && (
                    <>
                    <Link href={`/r/${subName}`}>
                        <img
                            src={`http://localhost:5000/public/images/${sub!.imageUrn}`}
                            className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                        />
                    </Link>
                    <Link href={`/r/${subName}`} className="text-xs font-bold cursor-pointer hover:underline">
                        r/{subName}
                    </Link>
                    <span className="mx-1">•</span>
                    </>
                    )}
                    <p className="text-xs text-gray-500">
                        Posted by
                        <Link href={`/u/${nick}`} className="mx-1 hover:underline">
                            u/{nick}
                        </Link>
                        <Link href={url} className="mx-1 hover:underline">
                            {dayjs(createdAt).fromNow()}
                        </Link>
                    </p>
                    </div>
                    <Link href={url} className="my-1 text-lg font-medium">
                        {title}
                    </Link>
                    {body && <p className="my-1 text-sm">{body}</p>}

                    <div className="flex">
                    <Link href={url}>
                        <ActionButton>
                            <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                            <span className="font-bold">{commentCount} Comments</span>
                        </ActionButton>
                    </Link>
                    <ActionButton>
                        <i className="mr-1 fas fa-share fa-xs"></i>
                        <span className="font-bold">Share</span>
                    </ActionButton>
                    <ActionButton>
                        <i className="mr-1 fas fa-bookmark fa-xs"></i>
                        <span className="font-bold">Save</span>
                    </ActionButton>
                    </div>
                </div>
            </div>
        </>
    )
}