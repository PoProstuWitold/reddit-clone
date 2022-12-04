import { 
    useEffect, useState 
} from 'react'
import { Sub, Post } from '../types'
import Link from 'next/link'
//import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// import { GetServerSideProps } from 'next'
import { PostCard } from '../components/PostCard'
import Head from 'next/head'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { useAuthState } from '../context/auth'
dayjs.extend(relativeTime)

interface indexProps {

}

const Index: React.FC<indexProps> = ({}) => {
    const [observedPost, setObservedPost] = useState<any>('')
    const isBrowser = () => typeof window !== "undefined"
    console.log(isBrowser())
    
    const { authenticated } = useAuthState()
    // const { data: posts, revalidate: revalidatePosts } = useSWR('/post/posts')
    const { data: topSubs } = useSWR('/sub/subs/top')

    const {
      data,
      error,
      size: page,
      setSize: setPage,
      isValidating,
    } = useSWRInfinite<Post[]>((index) => `/post/posts?page=${index}`, { revalidateAll: true })
    const isInitialLoading = !data && !error

    const posts: Post[] = data ? [].concat(...data as any) : []
    const description =
      "Reddit is a network of communities based on people's interests. Find communities you're interested in, and become part of an online community!"
    const title = 'readit: the front page of the internet'
  useEffect(() => {
    if (!posts || posts.length === 0) return

    const id = posts[posts.length - 1].identifier

    if (id !== observedPost) {
      setObservedPost(id)
      //@ts-ignore
      observeElement(document.getElementById(id))
    }
  }, [posts])

  const observeElement = (element: HTMLElement) => {
    if (!element) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log('Reached end of posts')
          setPage(page + 1)
          observer.unobserve(element)
        }
      },
      { threshold: 1 }
    )
    observer.observe(element)
  }

    // const [posts, setPosts] = useState<Post[]>([])
    // useEffect(() => {
    //     axios.get('/post/posts')
    //         .then((res) => {
    //             setPosts(res.data)
    //             console.log(res.data)
    //         })
    //         .catch((err) => console.log(err))
    // }, [])
    
    return (
        <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}></meta>
            <meta property="og:description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:title" content={title} />
            <title>reddit: the front page of the internet</title>
        </Head>
        <div className="container flex pt-4">
            {/* Posts feed */}
            <div className="w-full px-4 md:w-160 md:p-0">
            {isInitialLoading && <p className="text-lg text-center">Loading..</p>}
            {posts?.map((post: Post) => (
                <PostCard post={post} key={post.identifier} />
            ))}
            {isValidating && posts.length > 0 && (
              <p className="text-lg text-center">Loading More</p>
            )}
            </div>
            {/* Sidebar */}
            <div className="hidden ml-6 md:block w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub: Sub) => (
                <div
                  key={sub.name}
                  className="flex items-center px-4 py-2 text-xs border-b"
                >
                  <div className="mr-2">
                    <Link href={`/r/${sub.name}`}>
                      <img

                        src={`http://localhost:5000/public/images/${sub.imageUrl.split('/')[3]}`}
                        alt="Sub"
                        className="w-8 h-8 mr-2 bg-cover rounded-full cursor-pointer"
                      />
                    </Link>
                  </div>
                  <Link href={`/r/${sub.name}`} className="font-bold hover:cursor-pointer">
                      r/{sub.name}
                  </Link>
                  <p className="ml-auto font-med">{sub.postCount}</p>
                </div>
              ))}
            </div>
            {authenticated && (
              <div className="p-4 border-t-2">
                <Link href="/subs/create" className="w-full px-2 py-1 blue button">
                    Create Community
                </Link>
              </div>
            )}
          </div>
        </div>
        </div>
        </>
    )

}

export default Index