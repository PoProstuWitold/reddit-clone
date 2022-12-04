import '../styles/globals.css'
import '../styles/icons.css'
import type { AppProps } from 'next/app'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { NavBar } from '../components/NavBar'
import { AuthProvider } from '../context/auth'
import { SWRConfig } from 'swr'

const fetcher = async (url: string) => {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (err: any) {
        throw err.response.data
    }
}

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {

    const { pathname } = useRouter()
    const authRoutes = ['/register', '/login']
    const authRoute = authRoutes.includes(pathname)

    return (
        <SWRConfig value={{
            fetcher,
            dedupingInterval: 5000
        }}>
        <AuthProvider>
            {!authRoute && <NavBar/>}
            <div className={authRoute ? '' : 'pt-12'}>
                <Component {...pageProps} />
            </div>
        </AuthProvider>
        </SWRConfig>
    )
}

export default MyApp