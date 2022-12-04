import { FormEvent, useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import classNames from 'classnames'
import { Post, Comment } from '../../../../types'
import { Sidebar } from '../../../../components/SideBar'
import axios from 'axios'
import { useAuthState } from '../../../../context/auth'
import { ActionButton } from '../../../../components/ActionButton'

dayjs.extend(relativeTime)

const PostPage = () => {
    // local state
    const [newComment, setNewComment] = useState('')
    const [description, setDescription] = useState('')

    // global state
    const { authenticated, user } = useAuthState()

    // Utils
    const router = useRouter()
    const { identifier, sub, slug } = router.query

    const { data: post, error } = useSWR<Post>(
        identifier && slug ? `/post/${identifier}/${slug}` : null
    )
    const { data: comments } = useSWR<Comment[]>(
        identifier && slug ? `/comment/${identifier}/${slug}/` : null
      )
    
    if (error) router.push('/')
    
    useEffect(() => {
      if (!post) return
      let desc = post.body || post.title
      desc = desc.substring(0, 158).concat('..') // Hello world..
      setDescription(desc)
    }, [post])

    const vote = async (value: number, comment?: Comment) => {
        // if not logged in go to login
        if (!authenticated) router.push('/login')

        // if vote is the same reset vote
        if (
            (!comment && value === post!.userVote) ||
            (comment && comment.userVote === value)
        ) value = 0

        try {
            const res = await axios.post('/vote', {
                postIdentifier: identifier,
                commentIdentifier: comment?.identifier,
                slug,
                value,
            })
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const submitComment = async (event: FormEvent) => {
        event.preventDefault()
        if (newComment.trim() === '') return
    
        try {
            await axios.post(`/comment/${post!.identifier}/${post!.slug}/`, {
                body: newComment,
            })
        
            setNewComment('')
        
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <>
        <Head>
            <title>{post?.title}</title>
            <meta name="description" content={description}></meta>
            <meta property="og:description" content={description} />
            <meta property="og:title" content={post?.title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:title" content={post?.title} />
        </Head>
        <Link href={`/r/${sub}`}>
            <div className="flex items-center w-full h-20 p-8 bg-blue-500">
                <div className="container flex">
                {post && (
                    <div >
                    <img
                      src={`http://localhost:5000/public/images/${post.sub!.imageUrn}`}
                      className="w-8 h-8 mr-2 rounded-full"
                        alt="image"
                    />
                    </div>
                )}
                <p className="text-xl font-semibold text-white">r/{sub}</p>
                </div>
            </div>
        </Link>
        <div className="container flex pt-5">
            {/* Post */}
            <div className="w-160">
            <div className="bg-white rounded">
                {post && (
                <div className="flex">
                    {/* Vote section */}
                    <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
                    {/* Upvote */}
                    <div
                        className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                        onClick={() => vote(1)}
                    >
                        <i
                        className={classNames('icon-arrow-up', {
                            'text-red-500': post.userVote === 1,
                        })}
                        ></i>
                    </div>
                    <p className="text-xs font-bold">{post.voteScore}</p>
                    {/* Downvote */}
                    <div
                        className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
                        onClick={() => vote(-1)}
                    >
                        <i
                        className={classNames('icon-arrow-down', {
                            'text-blue-600': post.userVote === -1,
                        })}
                        ></i>
                    </div>
                    </div>
                    <div className="py-2 pr-2">
                    <div className="flex items-center">
                        <p className="text-xs text-gray-500">
                        Posted by
                        <Link href={`/u/${post.user.nick}`} className="mx-1 hover:underline">
                            /u/{post.user.nick}
                        </Link>
                        <Link href={post.url} className="mx-1 hover:underline">
                          {dayjs(post.createdAt).fromNow()}
                        </Link>
                        </p>
                    </div>
                    {/* Post title */}
                    <h1 className="my-1 text-xl font-medium">{post.title}</h1>
                    {/* Post body */}
                    <p className="my-3 text-sm">{post.body}</p>
                    {/* Actions */}
                    <div className="flex">
                        <Link href={post.url}>
                            <ActionButton>
                            <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                            <span className="font-bold">
                                {post.commentCount} Comments
                            </span>
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
                )}
                {/* Comment input area */}
                <div className="pl-10 pr-6 mb-4">
                  {authenticated ? (
                    <div>
                      <p className="mb-1 text-xs">
                        Comment as{' '}
                        <Link href={`/u/${user!.nick}`} className="font-semibold text-blue-500">
                          {user!.nick}
                        </Link>
                      </p>
                      <form onSubmit={submitComment}>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
                          onChange={(e) => setNewComment(e.target.value)}
                          value={newComment}
                        ></textarea>
                        <div className="flex justify-end">
                          <button
                            className="px-3 py-1 blue button"
                            disabled={newComment.trim() === ''}
                          >
                            Comment
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between px-2 py-4 border border-gray-200 rounded">
                      <p className="font-semibold text-gray-400">
                        Log in or sign up to leave a comment
                      </p>
                      <div>
                        <Link href="/login" className="px-4 py-1 mr-4 hollow blue button">
                          Login
                        </Link>
                        <Link href="/register" className="px-4 py-1 blue button">
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <hr />
                {/* Comments feed */}
                {comments?.map((comment) => (
                  <div className="flex" key={comment.identifier}>
                    {/* Vote section */}
                    <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
                      {/* Upvote */}
                      <div
                        className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                        onClick={() => vote(1, comment)}
                      >
                        <i
                          className={classNames('icon-arrow-up', {
                            'text-red-500': comment.userVote === 1,
                          })}
                        ></i>
                      </div>
                      <p className="text-xs font-bold">{comment.voteScore}</p>
                      {/* Downvote */}
                      <div
                        className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
                        onClick={() => vote(-1, comment)}
                      >
                        <i
                          className={classNames('icon-arrow-down', {
                            'text-blue-600': comment.userVote === -1,
                          })}
                        ></i>
                      </div>
                    </div>
                    <div className="py-2 pr-2">
                      <p className="mb-1 text-xs leading-none">
                        <Link href={`/u/${comment.user.nick}`} className="mr-1 font-bold hover:underline">
                          {comment.user.nick}
                        </Link>
                        <span className="text-gray-600">
                          {`
                            ${comment.voteScore}
                            points •
                            ${dayjs(comment.createdAt).fromNow()}
                          `}
                        </span>
                      </p>
                      <p>{comment.body}</p>
                    </div>
                  </div>
                ))}
            </div>
            </div>
            {/* Sidebar */}
            {post && post.sub && <Sidebar sub={post.sub} />}
        </div>
    </>
  )
}

export default PostPage