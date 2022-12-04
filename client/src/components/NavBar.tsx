import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthState, useAuthDispatch } from '../context/auth'
import { Sub } from '../types'
import { useRouter } from 'next/router'

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {

    const [name, setName] = useState('')
    const [subs, setSubs] = useState<Sub[]>([])
    const [timer, setTimer] = useState<any>(0)
    const { authenticated, loading } = useAuthState()
    const router = useRouter()

    useEffect(() => {
        if (name.trim() === '') {
            setSubs([])
            return
        }
        searchSubs()
    }, [name])
    
    const searchSubs = async () => {
        clearTimeout(timer)
        setTimer(
            setTimeout(async () => {
                try {
                    const { data } = await axios.get(`/sub/search/${name}`)
                    setSubs(data)
                    console.log(data)
                } catch (err) {
                    console.log(err)
                }
            }, 1000)
        )
    }
    
    const goToSub = (subName: string) => {
        router.push(`/r/${subName}`)
        setName('')
    }

    async function loadUser() {     
        try {
            const res = await axios.get('/auth/refresh')
            dispatch('REFRESH', res.data)
        } catch (err) {
            console.log(err)
        } finally {
            dispatch('STOP_LOADING')
        }
    }

    const INTERVAL_DELAY = 1000 * 275
    useEffect(() => {
        if(authenticated) {
        const interval = setInterval(() => {
            loadUser()
            }, INTERVAL_DELAY)
            return () => clearInterval(interval)
        }
    }, [])
    const dispatch = useAuthDispatch()
    const logout = () => {
        axios.post('/auth/logout')
        .then(() => {
            dispatch('LOGOUT')
            window.location.reload()
        })
        .catch((err) => console.log(err))
    }

    return (
        <>
            <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-5 bg-white">
                {/* Logo and title */}
                <div className="flex items-center">
                    <Link href="/">
                        logo
                    </Link>
                    <span className="hidden text-2xl font-semibold lg:block">
                        <Link href="/">reddit</Link>
                    </span>
                </div>
                {/* Serach Input */}
                <div className="max-w-full px-4 w-160">
                <div className="flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
                    <i className="pl-4 pr-3 text-gray-500 fas fa-search "></i>
                    <input
                        type="text"
                        className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none"
                        placeholder="Search"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div
                className="absolute left-0 right-0 bg-white"
                style={{ top: '100%' }}
                >
                {subs?.map((sub) => (
                    <div
                    className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200"
                    onClick={() => goToSub(sub.name)}
                    >
                    <img
                        src={`http://localhost:5000/public/images/${sub!.imageUrn}`}
                        className="rounded-full"
                        alt="Sub"
                        height={(8 * 16) / 4}
                        width={(8 * 16) / 4}
                    />
                    <div className="ml-4 text-sm">
                        <p className="font-medium">{sub.name}</p>
                        <p className="text-gray-600">{sub.title}</p>
                    </div>
                    </div>
                ))}
                </div>
                </div>
                </div>
                {/* Auth buttons */}
                <div className="flex">
                    {!loading &&
                    (authenticated ? (
                        // Show logout
                        <button
                        className="hidden w-20 py-1 mr-4 leading-5 sm:block lg:w-32 hollow blue button"
                        onClick={logout}
                        >
                        Logout
                        </button>
                    ) : (
                        <>
                            <Link href="/login" className="hidden w-20 py-1 mr-4 leading-5 sm:block lg:w-32 hollow blue button">
                                log in
                            </Link>
                            <Link href="/register" className="hidden w-20 py-1 leading-5 sm:block lg:w-32 blue button">
                                sign up
                            </Link>
                        </>
                    ))}
                
                </div>
            </div>
        </>
    )
    
}