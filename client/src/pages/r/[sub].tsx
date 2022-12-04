import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, ChangeEvent, createRef, useEffect, useState } from 'react'
import useSWR from 'swr'
import classNames from 'classnames'
import { PostCard } from '../../components/PostCard'
import { Post, Sub } from '../../types'
import { useAuthState } from '../../context/auth'
import { Sidebar } from '../../components/SideBar'
import axios from 'axios'


const SubPage = () => {

    // local state
    const [ownSub, setOwnSub] = useState(false)

    // global state
    const { authenticated, user } = useAuthState()

    // utils
    const fileInputRef = createRef<HTMLInputElement>()
    const router = useRouter()

    const subName = router.query.sub

    const { data: sub, error } = useSWR<Sub>(subName ? `/sub/${subName}` : null)

    useEffect(() => {
        if (!sub) return
        setOwnSub(authenticated && user!.id === sub.userId)
    }, [sub])

    const openFileInput = (type: string) => {
        if (!ownSub) return
        fileInputRef.current!.name = type
        fileInputRef.current!.click()
    }
    const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0]
        
        const formData = new FormData()
        formData.append('file', file)
        //@ts-ignore
        formData.append('type', fileInputRef.current.name)
    
        try {
            await axios.post<Sub>(`/sub/${sub!.name}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
        } catch (err) {
            console.log(err)
        }
    }

    if (error) router.push('/')

    let postsMarkup
    if (!sub) {
        postsMarkup = <p className="text-lg text-center">Loading..</p>
    } else if (sub.posts.length === 0) {
        postsMarkup = <p className="text-lg text-center">No posts submitted yet</p>
    } else {
        postsMarkup = sub.posts.map((post: Post) => (
        <PostCard key={post.identifier} post={post} />
        ))
    }

    return (
        <>
            <Head>
                <title>{sub ? sub.name : 'reddit: the front page of the internet'}</title>
            </Head>
            {sub && (
                <Fragment>
                <input
                    type="file"
                    hidden={true}
                    ref={fileInputRef}
                    onChange={uploadImage}
                />
                {/* Sub info and images */}
                <div>
                    {/* Banner image */}
                    <div
                    className={classNames('bg-blue-500', {
                        'cursor-pointer': ownSub,
                    })}
                    onClick={() => openFileInput('banner')}
                    >
                    {sub.bannerUrl ? (
                        <div
                        className="h-56 bg-blue-500"
                        style={{
                            backgroundImage: `url(http://localhost:5000/public/images/${sub.bannerUrn})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        ></div>
                    ) : (
                        <div className="h-20 bg-blue-500"></div>
                    )}
                    </div>
                    {/* Sub meta data */}
                    <div className="h-20 bg-white">
                    <div className="container relative flex">
                        <div className="absolute" style={{ top: -15 }}>
                        <img
                            src={`http://localhost:5000/public/images/${sub!.imageUrn}`}
                            alt="Sub"
                            className={classNames('rounded-full', {
                            'cursor-pointer w-16 h-16 mr-2 rounded-full': ownSub,
                            })}
                            onClick={() => openFileInput('image')}
                        />
                        </div>
                        <div className="pt-1 pl-24">
                        <div className="flex items-center">
                            <h1 className="mb-1 text-3xl font-bold">{sub.title}</h1>
                        </div>
                        <p className="text-sm font-bold text-gray-500">
                            r/{sub.name}
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Posts & Sidebar */}
                <div className="container flex pt-5">
                    <div className="w-160">{postsMarkup}</div>
                    <Sidebar sub={sub} />
                </div>
                </Fragment>
            )}
        </>
    )
}

export default SubPage