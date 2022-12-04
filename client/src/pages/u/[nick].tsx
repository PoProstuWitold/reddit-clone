import dayjs from 'dayjs'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { PostCard } from '../../components/PostCard'
import { Post, Comment } from '../../types'

const User = () => {
    const router = useRouter()
    const nick = router.query.nick

    const { data, error } = useSWR<any>(nick ? `/user/${nick}` : null)
    if (error) router.push('/')

    if (data) console.log(data)

    return (
        <>
        <Head>
            <title>{data?.user.nick || 'reddit: the front page of the internet'}</title>
        </Head>
        {data && (
            <div className="container flex pt-5">
            <div className="w-160">
                {data.submissions.map((submission: any) => {
                if (submission.type === 'Post') {
                    const post: Post = submission
                    return <PostCard post={post} key={post.identifier} />
                } else {
                    const comment: Comment = submission
                    return (
                    <div
                        key={comment.identifier}
                        className="flex my-4 bg-white rounded"
                    >
                        <div className="flex-shrink-0 w-10 py-4 text-center bg-gray-200 rounded-l">
                        <i className="text-gray-500 fas fa-comment-alt fa-xs"></i>
                        </div>
                        <div className="w-full p-2">
                        <p className="mb-2 text-xs text-gray-500">
                            {comment.user.nick}

                            <span> commented on </span>
                            <Link href={comment.post!.url} className="font-semibold cursor-pointer hover:underline">
                                {comment.post!.title}
                            </Link>
                            <span className="mx-1">•</span>
                            <Link href={`/r/${comment.post!.subName}`} className="text-black cursor-pointer hover:underline">
                                r/{comment.post!.subName}
                            </Link>
                        </p>
                        <hr />
                        <p>{comment.body}</p>
                        </div>
                    </div>
                    )
                }
                })}
            </div>
            <div className="ml-6 w-80">
                <div className="bg-white rounded">
                <div className="p-3 bg-blue-500 rounded-t">
                    <img
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    alt="user profile"
                    className="w-16 h-16 mx-auto border-2 border-white rounded-full"
                    />
                </div>
                <div className="p-3 text-center">
                    <h1 className="mb-3 text-xl">{data.user.username}</h1>
                    <hr />
                    <p className="mt-3">
                    Joined {dayjs(data.user.createdAt).format('DD MMM YYYY')}
                    </p>
                </div>
                </div>
            </div>
            </div>
        )}
        </>
    )
}

export default User