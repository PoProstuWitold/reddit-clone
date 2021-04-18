import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Post } from '../types'
// import { GetServerSideProps } from 'next'
import PostCard from '../components/PostCard'
import Head from 'next/head'
dayjs.extend(relativeTime)

interface indexProps {

}

const index: React.FC<indexProps> = ({}) => {

    const [posts, setPosts] = useState<Post[]>([])
    useEffect(() => {
        axios.get('/post/posts')
            .then((res) => {
                setPosts(res.data)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="pt-12">
        <Head>
            <title>readit: the front page of the internet</title>
        </Head>
        <div className="container flex pt-4">
            {/* Posts feed */}
            <div className="w-160">
            {posts.map((post) => (
                <PostCard post={post} key={post.identifier} />
            ))}
            </div>
            {/* Sidebar */}
        </div>
    </div>
    )

}

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const res = await axios.get('/post/posts')

//     return { props: { posts: res.data } }
//   } catch (err) {
//     return { props: { error: 'Something went wrong' } }
//   }
// }

export default index